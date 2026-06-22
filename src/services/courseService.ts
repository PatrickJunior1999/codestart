import { supabase } from '../lib/supabase';
import { COURSE_MODULES } from '../data/modules';
import type {
  Activity,
  CertificateValidationResult,
  CertificateIssueResult,
  CertificationStatus,
  CourseModule,
  FinalAssessmentQuestion,
  FinalAssessmentResult,
  Lesson,
  ModuleCompletionState,
  ProgressStatus,
  QuizAnswerPayload,
  QuizAttemptResult,
  QuizQuestion,
  StudentProgressReport,
  AdminDashboardReport,
} from '../types';

function applyProgressStatus(modules: CourseModule[], completedIds: Set<string>, inProgressIds: Set<string>): CourseModule[] {
  return modules
    .sort((a, b) => a.order_index - b.order_index)
    .map((module, index, sortedModules) => {
      let status: ProgressStatus = 'locked';

      if (completedIds.has(module.id)) {
        status = 'completed';
      } else if (index === 0 || completedIds.has(sortedModules[index - 1].id)) {
        status = inProgressIds.has(module.id) ? 'in_progress' : 'available';
      }

      return { ...module, status };
    });
}

export async function getModulesForUser(userId: string, isDemo: boolean): Promise<CourseModule[]> {
  if (!supabase || isDemo) {
    return COURSE_MODULES;
  }

  const [{ data: modulesData, error: modulesError }, { data: progressData, error: progressError }] = await Promise.all([
    supabase
      .from('modules')
      .select('id, title, description, order_index, estimated_minutes, xp_reward')
      .eq('is_active', true)
      .order('order_index', { ascending: true }),
    supabase
      .from('progress')
      .select('module_id, status')
      .eq('user_id', userId),
  ]);

  if (modulesError) {
    throw new Error(`Erro ao carregar módulos: ${modulesError.message}`);
  }

  if (progressError) {
    throw new Error(`Erro ao carregar progresso: ${progressError.message}`);
  }

  const modules = (modulesData ?? []) as CourseModule[];
  const completedIds = new Set<string>();
  const inProgressIds = new Set<string>();

  for (const item of progressData ?? []) {
    if (item.status === 'completed') completedIds.add(item.module_id);
    if (item.status === 'in_progress') inProgressIds.add(item.module_id);
  }

  return applyProgressStatus(modules, completedIds, inProgressIds);
}

export async function getLessonsByModule(moduleId: string, isDemo: boolean): Promise<Lesson[]> {
  if (!supabase || isDemo) {
    return [
      {
        id: 'demo-lesson',
        module_id: moduleId,
        title: 'Conteúdo do módulo',
        content:
          'Esta área será preenchida com o conteúdo pedagógico completo do módulo. Na versão conectada ao Supabase, as lições serão carregadas da tabela lessons.',
        logic_message:
          'Dica do LOGIC: leia o conteúdo com calma e depois avance para a atividade prática.',
        order_index: 1,
      },
    ];
  }

  const { data, error } = await supabase
    .from('lessons')
    .select('id, module_id, title, content, logic_message, order_index')
    .eq('module_id', moduleId)
    .order('order_index', { ascending: true });

  if (error) {
    throw new Error(`Erro ao carregar lições: ${error.message}`);
  }

  return (data ?? []) as Lesson[];
}

export async function getActivitiesByModule(moduleId: string, isDemo: boolean): Promise<Activity[]> {
  if (!supabase || isDemo) {
    return [
      {
        id: 'demo-activity',
        module_id: moduleId,
        activity_type: 'ordering',
        title: 'Missão prática de demonstração',
        statement: 'Organize os passos em uma sequência lógica.',
        activity_data: {
          items: ['Executar a ação', 'Entender o problema', 'Criar a solução'],
          correct_order: ['Entender o problema', 'Criar a solução', 'Executar a ação'],
        },
        success_feedback: 'Muito bem! A sequência faz sentido.',
        error_feedback: 'Revise a ordem dos passos.',
        order_index: 1,
      },
    ];
  }

  const { data, error } = await supabase
    .from('activities')
    .select('id, module_id, activity_type, title, statement, activity_data, success_feedback, error_feedback, order_index')
    .eq('module_id', moduleId)
    .order('order_index', { ascending: true });

  if (error) {
    throw new Error(`Erro ao carregar atividades: ${error.message}`);
  }

  return (data ?? []) as Activity[];
}

export async function getCompletedActivityIdsByModule(userId: string, moduleId: string, isDemo: boolean): Promise<Set<string>> {
  if (!supabase || isDemo) {
    return new Set();
  }

  const { data, error } = await supabase
    .from('activity_attempts')
    .select('activity_id, activities!inner(module_id)')
    .eq('user_id', userId)
    .eq('is_correct', true)
    .eq('activities.module_id', moduleId);

  if (error) {
    throw new Error(`Erro ao carregar atividades concluídas: ${error.message}`);
  }

  return new Set((data ?? []).map((item: { activity_id: string }) => item.activity_id));
}

export async function getModuleCompletionState(
  userId: string,
  moduleId: string,
  isDemo: boolean,
): Promise<ModuleCompletionState> {
  if (!supabase || isDemo) {
    return {
      total_activities: 1,
      completed_activities: 1,
      activity_completed: true,
      best_quiz_score: 0,
      quiz_passed: false,
      module_completed: false,
    };
  }

  const { data, error } = await supabase.rpc('get_module_completion_state', {
    p_module_id: moduleId,
  });

  if (error) {
    throw new Error(`Erro ao verificar requisitos do módulo: ${error.message}`);
  }

  const result = Array.isArray(data) ? data[0] : data;

  return {
    total_activities: Number(result?.total_activities ?? 0),
    completed_activities: Number(result?.completed_activities ?? 0),
    activity_completed: Boolean(result?.activity_completed),
    best_quiz_score: Number(result?.best_quiz_score ?? 0),
    quiz_passed: Boolean(result?.quiz_passed),
    module_completed: Boolean(result?.module_completed),
  };
}

export async function saveActivityAttempt(
  userId: string,
  activityId: string,
  submittedData: unknown,
  isCorrect: boolean,
  isDemo: boolean,
): Promise<void> {
  if (!supabase || isDemo) {
    return;
  }

  const { error } = await supabase
    .from('activity_attempts')
    .upsert(
      {
        user_id: userId,
        activity_id: activityId,
        submitted_data: submittedData,
        is_correct: isCorrect,
        completed_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,activity_id' },
    );

  if (error) {
    throw new Error(`Erro ao salvar atividade: ${error.message}`);
  }
}

export async function saveFinalProject(
  userId: string,
  projectCode: string,
  isDemo: boolean,
): Promise<void> {
  if (!supabase || isDemo) {
    return;
  }

  const { error } = await supabase
    .from('final_projects')
    .upsert(
      {
        user_id: userId,
        project_title: 'Minha Criação CodeStart',
        project_code: projectCode,
        project_preview: projectCode,
        status: 'submitted',
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' },
    );

  if (error) {
    throw new Error(`Erro ao salvar projeto final: ${error.message}`);
  }
}

export async function getQuizQuestionsByModule(moduleId: string, isDemo: boolean): Promise<QuizQuestion[]> {
  if (!supabase || isDemo) {
    return [
      {
        id: 'demo-question-1',
        module_id: moduleId,
        question: 'Um algoritmo tenta mostrar o resultado antes de realizar o cálculo. Qual é o problema?',
        option_a: 'Erro de sequência lógica.',
        option_b: 'Uso correto de repetição.',
        option_c: 'Abstração bem aplicada.',
        option_d: 'Condição obrigatória.',
        order_index: 1,
      },
    ];
  }

  const { data, error } = await supabase
    .from('quiz_questions')
    .select('id, module_id, question, option_a, option_b, option_c, option_d, order_index')
    .eq('module_id', moduleId)
    .order('order_index', { ascending: true });

  if (error) {
    throw new Error(`Erro ao carregar perguntas: ${error.message}`);
  }

  return (data ?? []) as QuizQuestion[];
}

export async function submitQuizAttempt(
  moduleId: string,
  answers: QuizAnswerPayload[],
  isDemo: boolean,
): Promise<QuizAttemptResult> {
  if (!supabase || isDemo) {
    const passed = answers.length > 0;
    return {
      score: passed ? 100 : 0,
      total_questions: Math.max(answers.length, 1),
      correct_answers: answers.length,
      passed,
      module_completed: passed,
      completion_message: passed ? 'Módulo concluído em modo demonstração.' : 'Revise o conteúdo.',
    };
  }

  const { data, error } = await supabase.rpc('submit_quiz_attempt', {
    p_module_id: moduleId,
    p_answers: answers,
  });

  if (error) {
    throw new Error(`Erro ao corrigir quiz: ${error.message}`);
  }

  const result = Array.isArray(data) ? data[0] : data;

  if (!result) {
    throw new Error('A correção do quiz não retornou resultado.');
  }

  return {
    score: Number(result.score),
    total_questions: Number(result.total_questions),
    correct_answers: Number(result.correct_answers),
    passed: Boolean(result.passed),
    module_completed: Boolean(result.module_completed ?? result.passed),
    completion_message: String(result.completion_message ?? ''),
  };
}

export async function getFinalAssessmentQuestions(isDemo: boolean): Promise<FinalAssessmentQuestion[]> {
  if (!supabase || isDemo) {
    return [
      {
        id: 'demo-final-1',
        question: 'Qual prática melhor representa pensamento computacional?',
        option_a: 'Dividir um problema em partes menores.',
        option_b: 'Decorar comandos sem entender.',
        option_c: 'Ignorar padrões.',
        option_d: 'Executar ações sem sequência.',
        order_index: 1,
      },
    ];
  }

  const { data, error } = await supabase
    .from('final_assessment_questions')
    .select('id, question, option_a, option_b, option_c, option_d, order_index')
    .eq('is_active', true)
    .order('order_index', { ascending: true });

  if (error) {
    throw new Error(`Erro ao carregar avaliação final: ${error.message}`);
  }

  return (data ?? []) as FinalAssessmentQuestion[];
}

export async function submitFinalAssessment(
  answers: QuizAnswerPayload[],
  isDemo: boolean,
): Promise<FinalAssessmentResult> {
  if (!supabase || isDemo) {
    const passed = answers.length > 0;
    return {
      score: passed ? 100 : 0,
      total_questions: Math.max(answers.length, 1),
      correct_answers: answers.length,
      passed,
    };
  }

  const { data, error } = await supabase.rpc('submit_final_assessment', {
    p_answers: answers,
  });

  if (error) {
    throw new Error(`Erro ao corrigir avaliação final: ${error.message}`);
  }

  const result = Array.isArray(data) ? data[0] : data;

  if (!result) {
    throw new Error('A avaliação final não retornou resultado.');
  }

  return {
    score: Number(result.score),
    total_questions: Number(result.total_questions),
    correct_answers: Number(result.correct_answers),
    passed: Boolean(result.passed),
  };
}

export async function getCertificationStatus(userId: string, isDemo: boolean): Promise<CertificationStatus> {
  if (!supabase || isDemo) {
    return {
      total_modules: 8,
      completed_modules: 8,
      has_final_project: true,
      best_final_score: 100,
      final_assessment_passed: true,
      has_certificate: false,
      can_issue_certificate: true,
    };
  }

  const [{ data: modulesData, error: modulesError }, { data: progressData, error: progressError }, { data: projectData, error: projectError }, { data: assessmentData, error: assessmentError }, { data: certificateData, error: certificateError }] = await Promise.all([
    supabase.from('modules').select('id').eq('is_active', true),
    supabase.from('progress').select('module_id').eq('user_id', userId).eq('status', 'completed'),
    supabase.from('final_projects').select('id').eq('user_id', userId).eq('status', 'submitted').maybeSingle(),
    supabase.from('final_assessment_attempts').select('score').eq('user_id', userId).order('score', { ascending: false }).limit(1),
    supabase.from('certificates').select('certificate_code, issued_at, workload_hours').eq('user_id', userId).eq('status', 'valid').maybeSingle(),
  ]);

  if (modulesError) throw new Error(`Erro ao verificar módulos: ${modulesError.message}`);
  if (progressError) throw new Error(`Erro ao verificar progresso: ${progressError.message}`);
  if (projectError) throw new Error(`Erro ao verificar projeto final: ${projectError.message}`);
  if (assessmentError) throw new Error(`Erro ao verificar avaliação final: ${assessmentError.message}`);
  if (certificateError) throw new Error(`Erro ao verificar certificado: ${certificateError.message}`);

  const totalModules = modulesData?.length ?? 0;
  const completedModules = progressData?.length ?? 0;
  const bestFinalScore = Number(assessmentData?.[0]?.score ?? 0);
  const finalAssessmentPassed = bestFinalScore >= 70;
  const hasFinalProject = Boolean(projectData?.id);
  const hasCertificate = Boolean(certificateData?.certificate_code);

  return {
    total_modules: totalModules,
    completed_modules: completedModules,
    has_final_project: hasFinalProject,
    best_final_score: bestFinalScore,
    final_assessment_passed: finalAssessmentPassed,
    has_certificate: hasCertificate,
    certificate_code: certificateData?.certificate_code ?? null,
    issued_at: certificateData?.issued_at ?? null,
    workload_hours: certificateData?.workload_hours ?? null,
    can_issue_certificate: completedModules === totalModules && totalModules > 0 && hasFinalProject && finalAssessmentPassed,
  };
}

export async function issueCertificate(isDemo: boolean): Promise<CertificateIssueResult> {
  if (!supabase || isDemo) {
    return {
      certificate_code: 'CS-DEMO-0001',
      course_name: 'CodeStart: Explorando o Mundo da Programação',
      workload_hours: 4,
      issued_at: new Date().toISOString(),
      validation_hash: 'demo',
    };
  }

  const { data, error } = await supabase.rpc('issue_certificate');

  if (error) {
    throw new Error(`Erro ao emitir certificado: ${error.message}`);
  }

  const result = Array.isArray(data) ? data[0] : data;

  if (!result) {
    throw new Error('A emissão do certificado não retornou resultado.');
  }

  return {
    certificate_code: result.certificate_code,
    course_name: result.course_name,
    workload_hours: Number(result.workload_hours),
    issued_at: result.issued_at,
    validation_hash: result.validation_hash,
  };
}

export async function validateCertificateCode(certificateCode: string): Promise<CertificateValidationResult | null> {
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.rpc('validate_certificate', {
    p_certificate_code: certificateCode,
  });

  if (error) {
    throw new Error(`Erro ao validar certificado: ${error.message}`);
  }

  const result = Array.isArray(data) ? data[0] : data;

  if (!result) return null;

  return {
    is_valid: Boolean(result.is_valid),
    student_name: result.student_name ?? null,
    course_name: result.course_name ?? null,
    workload_hours: Number(result.workload_hours ?? 0),
    issued_at: result.issued_at ?? null,
    certificate_code: result.certificate_code ?? null,
    status: result.status ?? null,
  };
}

export async function getStudentProgressReport(userId: string, isDemo: boolean): Promise<StudentProgressReport> {
  if (!supabase || isDemo) {
    const modules = COURSE_MODULES.map((module) => ({
      module_id: module.id,
      title: module.title,
      order_index: module.order_index,
      xp_reward: module.xp_reward,
      status: 'completed' as const,
      completed_activities: 1,
      total_activities: 1,
      best_quiz_score: 100,
      quiz_attempts: 1,
      xp_earned: module.xp_reward,
      completed_at: new Date().toISOString(),
    }));

    return {
      student_name: 'Aluno Demonstração',
      student_email: 'demo@codestart.local',
      total_modules: modules.length,
      completed_modules: modules.length,
      total_xp: modules.reduce((sum, module) => sum + module.xp_earned, 0),
      modules,
      final_project: {
        project_title: 'Minha Criação CodeStart',
        status: 'submitted',
        submitted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      final_assessment: {
        score: 100,
        correct_answers: 10,
        total_questions: 10,
        completed_at: new Date().toISOString(),
      },
      certificate: null,
    };
  }

  const [
    profileResult,
    modulesResult,
    progressResult,
    activitiesResult,
    activityAttemptsResult,
    quizAttemptsResult,
    finalProjectResult,
    finalAssessmentResult,
    certificateResult,
  ] = await Promise.all([
    supabase
      .from('profiles')
      .select('full_name, email')
      .eq('id', userId)
      .single(),
    supabase
      .from('modules')
      .select('id, title, order_index, xp_reward')
      .eq('is_active', true)
      .order('order_index', { ascending: true }),
    supabase
      .from('progress')
      .select('module_id, status, score, xp_earned, completed_at')
      .eq('user_id', userId),
    supabase
      .from('activities')
      .select('id, module_id'),
    supabase
      .from('activity_attempts')
      .select('activity_id, is_correct, completed_at')
      .eq('user_id', userId),
    supabase
      .from('quiz_attempts')
      .select('module_id, score, completed_at')
      .eq('user_id', userId),
    supabase
      .from('final_projects')
      .select('project_title, status, submitted_at, updated_at')
      .eq('user_id', userId)
      .eq('status', 'submitted')
      .maybeSingle(),
    supabase
      .from('final_assessment_attempts')
      .select('score, correct_answers, total_questions, completed_at')
      .eq('user_id', userId)
      .order('score', { ascending: false })
      .limit(1),
    supabase
      .from('certificates')
      .select('certificate_code, issued_at, status')
      .eq('user_id', userId)
      .eq('status', 'valid')
      .maybeSingle(),
  ]);

  if (profileResult.error) throw new Error(`Erro ao carregar perfil: ${profileResult.error.message}`);
  if (modulesResult.error) throw new Error(`Erro ao carregar módulos do relatório: ${modulesResult.error.message}`);
  if (progressResult.error) throw new Error(`Erro ao carregar progresso do relatório: ${progressResult.error.message}`);
  if (activitiesResult.error) throw new Error(`Erro ao carregar atividades do relatório: ${activitiesResult.error.message}`);
  if (activityAttemptsResult.error) throw new Error(`Erro ao carregar tentativas de atividade: ${activityAttemptsResult.error.message}`);
  if (quizAttemptsResult.error) throw new Error(`Erro ao carregar tentativas de quiz: ${quizAttemptsResult.error.message}`);
  if (finalProjectResult.error) throw new Error(`Erro ao carregar projeto final: ${finalProjectResult.error.message}`);
  if (finalAssessmentResult.error) throw new Error(`Erro ao carregar avaliação final: ${finalAssessmentResult.error.message}`);
  if (certificateResult.error) throw new Error(`Erro ao carregar certificado: ${certificateResult.error.message}`);

  const profile = profileResult.data as { full_name: string | null; email: string | null };
  const modulesData = (modulesResult.data ?? []) as Array<{ id: string; title: string; order_index: number; xp_reward: number }>;
  const progressData = (progressResult.data ?? []) as Array<{ module_id: string; status: ProgressStatus; score: number | null; xp_earned: number | null; completed_at: string | null }>;
  const activitiesData = (activitiesResult.data ?? []) as Array<{ id: string; module_id: string }>;
  const activityAttemptsData = (activityAttemptsResult.data ?? []) as Array<{ activity_id: string; is_correct: boolean; completed_at: string | null }>;
  const quizAttemptsData = (quizAttemptsResult.data ?? []) as Array<{ module_id: string; score: number | null; completed_at: string | null }>;

  const progressByModule = new Map(progressData.map((item) => [item.module_id, item]));
  const activitiesByModule = new Map<string, string[]>();
  for (const activity of activitiesData) {
    const list = activitiesByModule.get(activity.module_id) ?? [];
    list.push(activity.id);
    activitiesByModule.set(activity.module_id, list);
  }

  const completedActivityIds = new Set(activityAttemptsData.filter((item) => item.is_correct).map((item) => item.activity_id));
  const quizAttemptsByModule = new Map<string, number[]>();
  for (const attempt of quizAttemptsData) {
    const list = quizAttemptsByModule.get(attempt.module_id) ?? [];
    list.push(Number(attempt.score ?? 0));
    quizAttemptsByModule.set(attempt.module_id, list);
  }

  const modules = modulesData.map((module) => {
    const progress = progressByModule.get(module.id);
    const moduleActivities = activitiesByModule.get(module.id) ?? [];
    const completedActivities = moduleActivities.filter((activityId) => completedActivityIds.has(activityId)).length;
    const moduleQuizScores = quizAttemptsByModule.get(module.id) ?? [];
    const bestQuizScore = moduleQuizScores.length > 0 ? Math.max(...moduleQuizScores) : null;

    return {
      module_id: module.id,
      title: module.title,
      order_index: module.order_index,
      xp_reward: module.xp_reward,
      status: (progress?.status ?? 'not_started') as ProgressStatus | 'not_started',
      completed_activities: completedActivities,
      total_activities: moduleActivities.length,
      best_quiz_score: bestQuizScore,
      quiz_attempts: moduleQuizScores.length,
      xp_earned: Number(progress?.xp_earned ?? 0),
      completed_at: progress?.completed_at ?? null,
    };
  });

  const completedModules = modules.filter((module) => module.status === 'completed').length;
  const totalXp = modules.reduce((sum, module) => sum + module.xp_earned, 0);
  const bestFinalAssessment = finalAssessmentResult.data?.[0] as {
    score: number;
    correct_answers: number;
    total_questions: number;
    completed_at: string;
  } | undefined;

  return {
    student_name: profile.full_name ?? 'Aluno CodeStart',
    student_email: profile.email ?? '',
    total_modules: modules.length,
    completed_modules: completedModules,
    total_xp: totalXp,
    modules,
    final_project: finalProjectResult.data
      ? {
          project_title: finalProjectResult.data.project_title,
          status: finalProjectResult.data.status,
          submitted_at: finalProjectResult.data.submitted_at,
          updated_at: finalProjectResult.data.updated_at,
        }
      : null,
    final_assessment: bestFinalAssessment
      ? {
          score: Number(bestFinalAssessment.score),
          correct_answers: Number(bestFinalAssessment.correct_answers),
          total_questions: Number(bestFinalAssessment.total_questions),
          completed_at: bestFinalAssessment.completed_at,
        }
      : null,
    certificate: certificateResult.data
      ? {
          certificate_code: certificateResult.data.certificate_code,
          issued_at: certificateResult.data.issued_at,
          status: certificateResult.data.status,
        }
      : null,
  };
}


export async function getAdminDashboardReport(isDemo: boolean): Promise<AdminDashboardReport> {
  if (!supabase || isDemo) {
    return {
      total_students: 3,
      total_modules: 8,
      students_completed_course: 1,
      certificates_issued: 1,
      average_progress_percent: 67,
      students: [
        {
          student_id: 'demo-1',
          full_name: 'Aluno Demonstração 1',
          email: 'aluno1@codestart.demo',
          school: 'Escola Demonstrativa',
          class_group: '1º ano',
          completed_modules: 8,
          total_xp: 1100,
          progress_percent: 100,
          has_final_project: true,
          best_final_score: 90,
          has_certificate: true,
          created_at: new Date().toISOString(),
        },
        {
          student_id: 'demo-2',
          full_name: 'Aluno Demonstração 2',
          email: 'aluno2@codestart.demo',
          school: 'Escola Demonstrativa',
          class_group: '2º ano',
          completed_modules: 5,
          total_xp: 575,
          progress_percent: 63,
          has_final_project: false,
          best_final_score: 0,
          has_certificate: false,
          created_at: new Date().toISOString(),
        },
        {
          student_id: 'demo-3',
          full_name: 'Aluno Demonstração 3',
          email: 'aluno3@codestart.demo',
          school: 'Escola Demonstrativa',
          class_group: '9º ano',
          completed_modules: 3,
          total_xp: 325,
          progress_percent: 38,
          has_final_project: false,
          best_final_score: 0,
          has_certificate: false,
          created_at: new Date().toISOString(),
        },
      ],
    };
  }

  const { data, error } = await supabase.rpc('get_admin_dashboard_report');

  if (error) {
    throw new Error(`Erro ao carregar painel administrativo: ${error.message}`);
  }

  const payload = data as AdminDashboardReport | null;

  if (!payload) {
    throw new Error('O painel administrativo não retornou dados.');
  }

  return {
    total_students: Number(payload.total_students ?? 0),
    total_modules: Number(payload.total_modules ?? 0),
    students_completed_course: Number(payload.students_completed_course ?? 0),
    certificates_issued: Number(payload.certificates_issued ?? 0),
    average_progress_percent: Number(payload.average_progress_percent ?? 0),
    students: Array.isArray(payload.students)
      ? payload.students.map((student) => ({
          student_id: String(student.student_id),
          full_name: String(student.full_name ?? 'Aluno CodeStart'),
          email: String(student.email ?? ''),
          school: student.school ?? null,
          class_group: student.class_group ?? null,
          completed_modules: Number(student.completed_modules ?? 0),
          total_xp: Number(student.total_xp ?? 0),
          progress_percent: Number(student.progress_percent ?? 0),
          has_final_project: Boolean(student.has_final_project),
          best_final_score: Number(student.best_final_score ?? 0),
          has_certificate: Boolean(student.has_certificate),
          created_at: String(student.created_at ?? ''),
        }))
      : [],
  };
}
