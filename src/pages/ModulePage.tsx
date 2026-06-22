import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card } from '../components/Card';
import { LogicSpeechBubble } from '../components/LogicSpeechBubble';
import { useAuth } from '../contexts/AuthContext';
import { useCourseModules } from '../hooks/useCourseModules';
import { getLessonsByModule, getModuleCompletionState } from '../services/courseService';
import type { Lesson, ModuleCompletionState } from '../types';

function LessonStage({ lesson, index }: { lesson: Lesson; index: number }) {
  const paragraphs = useMemo(
    () => lesson.content.split('\n').map((item) => item.trim()).filter(Boolean),
    [lesson.content],
  );

  return (
    <article className="lesson-stage-card">
      <div className="lesson-stage-index">Etapa {index + 1}</div>
      <h3>{lesson.title}</h3>
      {lesson.logic_message && <LogicSpeechBubble message={lesson.logic_message} />}
      <div className="lesson-content-rich">
        {paragraphs.map((paragraph) => {
          if (paragraph.startsWith('Exemplo:')) {
            return <div className="lesson-callout example-callout" key={paragraph}><strong>Exemplo guiado</strong><p>{paragraph.replace('Exemplo:', '').trim()}</p></div>;
          }
          if (paragraph.startsWith('Miniatividade:')) {
            return <div className="lesson-callout activity-callout" key={paragraph}><strong>Fixação rápida</strong><p>{paragraph.replace('Miniatividade:', '').trim()}</p></div>;
          }
          if (paragraph.startsWith('Atenção:')) {
            return <div className="lesson-callout warning-callout" key={paragraph}><strong>Atenção</strong><p>{paragraph.replace('Atenção:', '').trim()}</p></div>;
          }
          return <p key={paragraph}>{paragraph}</p>;
        })}
      </div>
    </article>
  );
}

export function ModulePage() {
  const { moduleId } = useParams();
  const { isDemoMode, user } = useAuth();
  const { modules, isLoading: modulesLoading } = useCourseModules();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [completionState, setCompletionState] = useState<ModuleCompletionState | null>(null);
  const [isLoadingLessons, setIsLoadingLessons] = useState(true);
  const [lessonError, setLessonError] = useState<string | null>(null);

  const module = modules.find((item) => item.id === moduleId);
  const previousModule = modules.find((item) => module && item.order_index === module.order_index - 1);
  const isFinalModule = module?.order_index === 8 || module?.title?.toLowerCase().includes('projeto final');
  const isLocked = module?.status === 'locked';

  useEffect(() => {
    let isMounted = true;

    async function loadModuleData() {
      if (!moduleId || !user || isLocked) return;
      setIsLoadingLessons(true);
      setLessonError(null);

      try {
        const [lessonResult, stateResult] = await Promise.all([
          getLessonsByModule(moduleId, isDemoMode),
          getModuleCompletionState(user.id, moduleId, isDemoMode),
        ]);
        if (isMounted) {
          setLessons(lessonResult);
          setCompletionState(stateResult);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro ao carregar conteúdo.';
        if (isMounted) setLessonError(message);
      } finally {
        if (isMounted) setIsLoadingLessons(false);
      }
    }

    void loadModuleData();

    return () => {
      isMounted = false;
    };
  }, [moduleId, isDemoMode, user, isLocked]);

  if (modulesLoading) {
    return <Card><p className="muted">Carregando missão...</p></Card>;
  }

  if (!module) {
    return (
      <Card>
        <h1>Módulo não encontrado</h1>
        <p className="muted">Não encontramos esta missão na trilha CodeStart.</p>
        <Link className="btn btn-primary" to="/dashboard">Voltar ao painel</Link>
      </Card>
    );
  }

  if (isLocked) {
    return (
      <Card>
        <span className="eyebrow">Missão bloqueada</span>
        <h1>{module.title}</h1>
        <p className="muted">
          Esta missão será liberada após a conclusão da missão anterior.
          {previousModule ? ` Primeiro conclua: ${previousModule.title}.` : ''}
        </p>
        <Link className="btn btn-primary" to="/dashboard">Voltar ao painel</Link>
      </Card>
    );
  }

  const activityCompleted = completionState?.activity_completed ?? false;
  const quizPassed = completionState?.quiz_passed ?? false;
  const moduleCompleted = module.status === 'completed' || completionState?.module_completed;

  return (
    <div className="module-page mission-detail-page">
      <section className="page-header mission-hero-panel">
        <div>
          <span className="eyebrow">Missão {module.order_index}</span>
          <h1>{module.title}</h1>
          <p>{module.description}</p>
        </div>
        <div className="mission-xp-panel">
          <span className="badge badge-xp">⭐ +{module.xp_reward} XP</span>
          <small>{module.estimated_minutes} min de estudo</small>
        </div>
      </section>

      <LogicSpeechBubble
        message={
          isFinalModule
            ? 'Última missão de estudo. Leia as etapas, faça as atividades, responda ao quiz e depois construa uma cena programada no Projeto Final.'
            : 'Agora o conteúdo está dividido em etapas menores. Leia uma parte, faça a fixação mental e avance para a prática quando se sentir seguro.'
        }
      />

      <Card className="mission-requirements-card">
        <h2>Requisitos da missão</h2>
        <ul className="checklist status-checklist compact-status-list">
          <li className={activityCompleted ? 'checked' : ''}>{activityCompleted ? '☑' : '□'} Atividade prática concluída</li>
          <li className={quizPassed ? 'checked' : ''}>{quizPassed ? '☑' : '□'} Quiz aprovado com 70% ou mais</li>
          <li className={moduleCompleted ? 'checked' : ''}>{moduleCompleted ? '☑' : '□'} Módulo concluído no progresso</li>
        </ul>
      </Card>

      <Card className="study-path-card">
        <div className="section-heading mission-section-heading">
          <div>
            <span className="eyebrow">Trilha de estudo</span>
            <h2>Conteúdo em etapas</h2>
          </div>
          <span className="badge badge-level">{lessons.length} etapas</span>
        </div>
        {isLoadingLessons && <p className="muted">Carregando conteúdo...</p>}
        {lessonError && <div className="alert alert-error">{lessonError}</div>}
        {!isLoadingLessons && lessons.length === 0 && (
          <p className="muted">Nenhuma lição cadastrada para este módulo ainda.</p>
        )}
        <div className="lesson-stage-list">
          {lessons.map((lesson, index) => (
            <LessonStage key={lesson.id} lesson={lesson} index={index} />
          ))}
        </div>
        <div className="button-row mission-actions">
          <Link className="btn btn-secondary" to="/dashboard">Voltar ao Centro de Missões</Link>
          <Link className="btn btn-primary" to={`/modulo/${module.id}/atividade`}>Ir para atividades práticas</Link>
          {activityCompleted ? (
            <Link className="btn btn-secondary" to={`/modulo/${module.id}/quiz`}>Ir para o quiz</Link>
          ) : (
            <button className="btn btn-disabled" disabled type="button">Quiz bloqueado até concluir as atividades</button>
          )}
          {isFinalModule && (
            <Link className="btn btn-primary" to="/projeto-final">Abrir projeto final</Link>
          )}
        </div>
      </Card>
    </div>
  );
}
