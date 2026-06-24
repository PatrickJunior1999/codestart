import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { LogicSpeechBubble } from '../components/LogicSpeechBubble';
import { ProgressBar } from '../components/ProgressBar';
import { useAuth } from '../contexts/AuthContext';
import { getAdminDashboardReport } from '../services/courseService';
import type { AdminDashboardReport, AdminStudentSummary } from '../types';

function formatDate(value?: string | null): string {
  if (!value) return '—';
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(value));
}

function statusLabel(student: AdminStudentSummary, totalModules: number): string {
  if (student.has_certificate) return 'Certificado emitido';
  if (student.completed_modules >= totalModules && student.has_final_project && student.best_final_score >= 70) return 'Pronto para certificar';
  if (student.completed_modules >= totalModules) return 'Módulos concluídos';
  if (student.completed_modules > 0) return 'Em andamento';
  return 'Não iniciado';
}

function statusClass(student: AdminStudentSummary, totalModules: number): string {
  if (student.has_certificate) return 'mini-status mini-status-ok';
  if (student.completed_modules >= totalModules && student.has_final_project && student.best_final_score >= 70) return 'mini-status mini-status-ok';
  if (student.completed_modules > 0) return 'mini-status mini-status-wait';
  return 'mini-status mini-status-muted';
}

function clampPercent(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

interface AdminChartBar {
  label: string;
  value: number;
  percent: number;
}

interface AdminAnalytics {
  startedStudents: number;
  inactiveStudents: number;
  modulesCompletedStudents: number;
  projectDeliveredStudents: number;
  finalApprovedStudents: number;
  certifiedStudents: number;
  completionRate: number;
  certificateRate: number;
  averageFinalScore: number;
  riskStudents: number;
  funnel: AdminChartBar[];
  moduleCompletion: AdminChartBar[];
  stageDistribution: AdminChartBar[];
  finalScoreDistribution: AdminChartBar[];
  mainBottleneck: string;
  insightSummary: string;
}

function buildAdminAnalytics(report: AdminDashboardReport): AdminAnalytics {
  const totalStudents = report.total_students;
  const totalModules = Math.max(report.total_modules, 1);
  const students = report.students;

  const startedStudents = students.filter((student) => student.completed_modules > 0).length;
  const inactiveStudents = students.filter((student) => student.completed_modules === 0).length;
  const modulesCompletedStudents = students.filter((student) => student.completed_modules >= totalModules).length;
  const projectDeliveredStudents = students.filter((student) => student.has_final_project).length;
  const finalApprovedStudents = students.filter((student) => student.best_final_score >= 70).length;
  const certifiedStudents = students.filter((student) => student.has_certificate).length;
  const riskStudents = students.filter((student) => student.completed_modules > 0 && student.completed_modules < Math.ceil(totalModules / 2)).length;

  const finalScores = students
    .map((student) => student.best_final_score)
    .filter((score) => score > 0);
  const averageFinalScore = finalScores.length > 0
    ? Math.round(finalScores.reduce((sum, score) => sum + score, 0) / finalScores.length)
    : 0;

  const funnel = [
    { label: 'Cadastrados', value: totalStudents, percent: 100 },
    { label: 'Iniciaram', value: startedStudents, percent: totalStudents ? (startedStudents / totalStudents) * 100 : 0 },
    { label: '8 módulos', value: modulesCompletedStudents, percent: totalStudents ? (modulesCompletedStudents / totalStudents) * 100 : 0 },
    { label: 'Projeto final', value: projectDeliveredStudents, percent: totalStudents ? (projectDeliveredStudents / totalStudents) * 100 : 0 },
    { label: 'Avaliação ≥ 70%', value: finalApprovedStudents, percent: totalStudents ? (finalApprovedStudents / totalStudents) * 100 : 0 },
    { label: 'Certificados', value: certifiedStudents, percent: totalStudents ? (certifiedStudents / totalStudents) * 100 : 0 },
  ];

  const moduleCompletion = Array.from({ length: totalModules }, (_, index) => {
    const moduleNumber = index + 1;
    const value = students.filter((student) => student.completed_modules >= moduleNumber).length;
    return {
      label: `M${moduleNumber}`,
      value,
      percent: totalStudents ? (value / totalStudents) * 100 : 0,
    };
  });

  const stageDistribution = [
    {
      label: 'Não iniciaram',
      value: inactiveStudents,
      percent: totalStudents ? (inactiveStudents / totalStudents) * 100 : 0,
    },
    {
      label: 'Início: 1–2 módulos',
      value: students.filter((student) => student.completed_modules >= 1 && student.completed_modules <= 2).length,
      percent: totalStudents ? (students.filter((student) => student.completed_modules >= 1 && student.completed_modules <= 2).length / totalStudents) * 100 : 0,
    },
    {
      label: 'Meio: 3–5 módulos',
      value: students.filter((student) => student.completed_modules >= 3 && student.completed_modules <= 5).length,
      percent: totalStudents ? (students.filter((student) => student.completed_modules >= 3 && student.completed_modules <= 5).length / totalStudents) * 100 : 0,
    },
    {
      label: 'Final: 6–7 módulos',
      value: students.filter((student) => student.completed_modules >= 6 && student.completed_modules <= 7).length,
      percent: totalStudents ? (students.filter((student) => student.completed_modules >= 6 && student.completed_modules <= 7).length / totalStudents) * 100 : 0,
    },
    {
      label: 'Concluíram',
      value: modulesCompletedStudents,
      percent: totalStudents ? (modulesCompletedStudents / totalStudents) * 100 : 0,
    },
  ];

  const finalScoreDistribution = [
    {
      label: 'Sem avaliação',
      value: students.filter((student) => student.best_final_score <= 0).length,
      percent: totalStudents ? (students.filter((student) => student.best_final_score <= 0).length / totalStudents) * 100 : 0,
    },
    {
      label: '0–69%',
      value: students.filter((student) => student.best_final_score > 0 && student.best_final_score < 70).length,
      percent: totalStudents ? (students.filter((student) => student.best_final_score > 0 && student.best_final_score < 70).length / totalStudents) * 100 : 0,
    },
    {
      label: '70–79%',
      value: students.filter((student) => student.best_final_score >= 70 && student.best_final_score < 80).length,
      percent: totalStudents ? (students.filter((student) => student.best_final_score >= 70 && student.best_final_score < 80).length / totalStudents) * 100 : 0,
    },
    {
      label: '80–89%',
      value: students.filter((student) => student.best_final_score >= 80 && student.best_final_score < 90).length,
      percent: totalStudents ? (students.filter((student) => student.best_final_score >= 80 && student.best_final_score < 90).length / totalStudents) * 100 : 0,
    },
    {
      label: '90–100%',
      value: students.filter((student) => student.best_final_score >= 90).length,
      percent: totalStudents ? (students.filter((student) => student.best_final_score >= 90).length / totalStudents) * 100 : 0,
    },
  ];

  let mainBottleneck = 'Ainda não há dados suficientes para identificar gargalos.';
  if (funnel.length > 1 && totalStudents > 0) {
    let biggestDrop = 0;
    let dropLabel = '';

    for (let index = 1; index < funnel.length; index += 1) {
      const previous = funnel[index - 1];
      const current = funnel[index];
      const drop = previous.value - current.value;
      if (drop > biggestDrop) {
        biggestDrop = drop;
        dropLabel = `${previous.label} → ${current.label}`;
      }
    }

    if (biggestDrop > 0) {
      mainBottleneck = `Maior queda no funil: ${dropLabel}, com ${biggestDrop} aluno(s) a menos.`;
    } else {
      mainBottleneck = 'O funil não mostra perda relevante entre as etapas principais.';
    }
  }

  const completionRate = totalStudents ? Math.round((modulesCompletedStudents / totalStudents) * 100) : 0;
  const certificateRate = totalStudents ? Math.round((certifiedStudents / totalStudents) * 100) : 0;
  const insightSummary = completionRate >= 50
    ? `Boa adesão: ${completionRate}% dos alunos concluíram os módulos.`
    : `Atenção: apenas ${completionRate}% dos alunos concluíram os módulos.`;

  return {
    startedStudents,
    inactiveStudents,
    modulesCompletedStudents,
    projectDeliveredStudents,
    finalApprovedStudents,
    certifiedStudents,
    completionRate,
    certificateRate,
    averageFinalScore,
    riskStudents,
    funnel,
    moduleCompletion,
    stageDistribution,
    finalScoreDistribution,
    mainBottleneck,
    insightSummary,
  };
}

function AdminHorizontalBarChart({ title, description, data }: { title: string; description: string; data: AdminChartBar[] }) {
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <Card className="admin-chart-card">
      <div className="admin-chart-header">
        <h3>{title}</h3>
        <p className="muted">{description}</p>
      </div>
      <div className="admin-chart-bars">
        {data.map((item) => (
          <div className="admin-chart-row" key={item.label}>
            <div className="admin-chart-row-label">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
            <div className="admin-chart-track" aria-label={`${item.label}: ${item.value}`}>
              <div
                className="admin-chart-fill"
                style={{ width: `${Math.max(4, (item.value / maxValue) * 100)}%` }}
              />
            </div>
            <span className="admin-chart-percent">{clampPercent(item.percent)}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function AdminModuleCompletionChart({ data }: { data: AdminChartBar[] }) {
  return (
    <Card className="admin-chart-card">
      <div className="admin-chart-header">
        <h3>Conclusão por módulo</h3>
        <p className="muted">Mostra quantos alunos chegaram até cada missão da trilha.</p>
      </div>
      <div className="admin-module-bars">
        {data.map((item) => (
          <div className="admin-module-bar" key={item.label}>
            <div className="admin-module-bar-visual">
              <span style={{ height: `${Math.max(6, clampPercent(item.percent))}%` }} />
            </div>
            <strong>{item.label}</strong>
            <small>{item.value}</small>
          </div>
        ))}
      </div>
    </Card>
  );
}

function AdminInsights({ analytics }: { analytics: AdminAnalytics }) {
  return (
    <section className="admin-insights-grid">
      <Card className="admin-insight-card admin-insight-highlight">
        <span className="eyebrow">Insight principal</span>
        <h3>{analytics.insightSummary}</h3>
        <p>{analytics.mainBottleneck}</p>
      </Card>
      <Card className="admin-insight-card">
        <span className="admin-metric-label">Taxa de certificação</span>
        <strong className="admin-metric-value">{analytics.certificateRate}%</strong>
        <p className="muted">{analytics.certifiedStudents} de {analytics.funnel[0]?.value ?? 0} alunos receberam certificado.</p>
      </Card>
      <Card className="admin-insight-card">
        <span className="admin-metric-label">Média da avaliação final</span>
        <strong className="admin-metric-value">{analytics.averageFinalScore}%</strong>
        <p className="muted">Considera apenas alunos que fizeram a avaliação final.</p>
      </Card>
      <Card className="admin-insight-card">
        <span className="admin-metric-label">Alunos em atenção</span>
        <strong className="admin-metric-value">{analytics.riskStudents}</strong>
        <p className="muted">Iniciaram o curso, mas ainda estão antes da metade da trilha.</p>
      </Card>
    </section>
  );
}

export function AdminDashboardPage() {
  const { profile, isDemoMode } = useAuth();
  const [report, setReport] = useState<AdminDashboardReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const hasAdminAccess = isDemoMode || profile?.role === 'admin';

  useEffect(() => {
    let isMounted = true;

    async function loadReport() {
      if (!hasAdminAccess) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await getAdminDashboardReport(isDemoMode);
        if (isMounted) setReport(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro ao carregar painel administrativo.';
        if (isMounted) setError(message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void loadReport();

    return () => {
      isMounted = false;
    };
  }, [hasAdminAccess, isDemoMode]);

  const filteredStudents = useMemo(() => {
    if (!report) return [];
    const normalizedSearch = search.trim().toLowerCase();
    if (!normalizedSearch) return report.students;

    return report.students.filter((student) => {
      return [student.full_name, student.email, student.school ?? '', student.class_group ?? '']
        .join(' ')
        .toLowerCase()
        .includes(normalizedSearch);
    });
  }, [report, search]);

  const analytics = useMemo(() => {
    if (!report) return null;
    return buildAdminAnalytics(report);
  }, [report]);


  function handlePrintReport() {
    document.body.classList.add('printing-admin-report');

    window.setTimeout(() => {
      window.print();
      window.setTimeout(() => {
        document.body.classList.remove('printing-admin-report');
      }, 700);
    }, 120);
  }

  if (!hasAdminAccess) {
    return (
      <Card>
        <span className="eyebrow">Acesso restrito</span>
        <h1>Painel administrativo</h1>
        <p className="muted">
          Esta área é reservada para perfis com papel de administrador.
        </p>
        <Link className="btn btn-primary" to="/dashboard">Voltar aos módulos</Link>
      </Card>
    );
  }

  if (isLoading) {
    return <Card><p className="muted">Carregando painel administrativo...</p></Card>;
  }

  if (error) {
    return (
      <Card>
        <div className="alert alert-error">{error}</div>
        <p className="muted">
          Confirme se a migration 008 foi executada e se seu perfil está como <strong>admin</strong>.
        </p>
        <Link className="btn btn-primary" to="/dashboard">Voltar aos módulos</Link>
      </Card>
    );
  }

  if (!report) {
    return (
      <Card>
        <h1>Painel indisponível</h1>
        <p className="muted">Não foi possível montar o relatório dos alunos.</p>
        <Link className="btn btn-primary" to="/dashboard">Voltar aos módulos</Link>
      </Card>
    );
  }

  return (
    <div className="admin-dashboard-page admin-report-print">
      <section className="page-header no-print">
        <div>
          <span className="eyebrow">Gestão do projeto</span>
          <h1>Painel administrativo</h1>
          <p>Acompanhe o desempenho dos alunos, certificados e pendências da trilha CodeStart.</p>
        </div>
        <div className="button-row">
          <Link className="btn btn-secondary" to="/admin/status">Status do sistema</Link>
          <button className="btn btn-secondary" type="button" onClick={handlePrintReport}>Imprimir relatório</button>
          <Link className="btn btn-primary" to="/dashboard">Voltar aos módulos</Link>
        </div>
      </section>

      <LogicSpeechBubble message="Use este painel como evidência de acompanhamento da ação extensionista: ele mostra participação, progresso, avaliação final e emissão de certificados sem transformar o CodeStart em uma plataforma de turmas." />

      <section className="admin-summary-grid">
        <Card>
          <span className="admin-metric-label">Alunos cadastrados</span>
          <strong className="admin-metric-value">{report.total_students}</strong>
        </Card>
        <Card>
          <span className="admin-metric-label">Progresso médio</span>
          <strong className="admin-metric-value">{Math.round(report.average_progress_percent)}%</strong>
        </Card>
        <Card>
          <span className="admin-metric-label">Prontos/concluídos</span>
          <strong className="admin-metric-value">{report.students_completed_course}</strong>
        </Card>
        <Card>
          <span className="admin-metric-label">Certificados emitidos</span>
          <strong className="admin-metric-value">{report.certificates_issued}</strong>
        </Card>
      </section>

      {analytics && (
        <>
          <section className="admin-analytics-section">
            <div className="admin-section-heading">
              <span className="eyebrow">Dashboard visual</span>
              <h2>Indicadores e insights do curso</h2>
              <p className="muted">Visualize o funil de aprendizagem, gargalos e distribuição de desempenho dos alunos.</p>
            </div>
            <AdminInsights analytics={analytics} />
            <div className="admin-charts-grid">
              <AdminHorizontalBarChart
                title="Funil de conclusão"
                description="Acompanha a passagem dos alunos pelas etapas críticas do curso."
                data={analytics.funnel}
              />
              <AdminModuleCompletionChart data={analytics.moduleCompletion} />
              <AdminHorizontalBarChart
                title="Distribuição por estágio"
                description="Ajuda a identificar onde os alunos estão concentrados na trilha."
                data={analytics.stageDistribution}
              />
              <AdminHorizontalBarChart
                title="Desempenho na avaliação final"
                description="Agrupa os alunos por faixa de nota na avaliação final."
                data={analytics.finalScoreDistribution}
              />
            </div>
          </section>
        </>
      )}

      <section className="admin-tools no-print">
        <div>
          <h2>Alunos</h2>
          <p className="muted">Filtre por nome, e-mail, escola ou turma informada no cadastro.</p>
        </div>
        <input
          className="input admin-search"
          type="search"
          placeholder="Buscar aluno..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </section>

      <section className="admin-student-list">
        {filteredStudents.length === 0 ? (
          <Card>
            <p className="muted">Nenhum aluno encontrado para o filtro atual.</p>
          </Card>
        ) : (
          filteredStudents.map((student) => (
            <Card key={student.student_id} className="admin-student-card">
              <div className="admin-student-main">
                <div>
                  <span className="eyebrow">{student.school || 'Escola não informada'} · {student.class_group || 'Turma não informada'}</span>
                  <h3>{student.full_name}</h3>
                  <p className="muted">{student.email}</p>
                </div>
                <span className={statusClass(student, report.total_modules)}>
                  {statusLabel(student, report.total_modules)}
                </span>
              </div>

              <div className="admin-student-progress">
                <ProgressBar
                  value={student.progress_percent}
                  label={`${student.completed_modules} de ${report.total_modules} módulos concluídos`}
                />
              </div>

              <div className="admin-student-facts">
                <span><strong>{student.total_xp}</strong> XP</span>
                <span>Projeto: <strong>{student.has_final_project ? 'entregue' : 'pendente'}</strong></span>
                <span>Avaliação final: <strong>{student.best_final_score ? `${Math.round(student.best_final_score)}%` : 'pendente'}</strong></span>
                <span>Cadastro: <strong>{formatDate(student.created_at)}</strong></span>
              </div>
            </Card>
          ))
        )}
      </section>
    </div>
  );
}
