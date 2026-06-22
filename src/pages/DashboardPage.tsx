import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { LevelBadge } from '../components/LevelBadge';
import { LogicSpeechBubble } from '../components/LogicSpeechBubble';
import { ModuleCard } from '../components/ModuleCard';
import { ProgressBar } from '../components/ProgressBar';
import { useAuth } from '../contexts/AuthContext';
import { getCurrentLevel, getNextLevel } from '../config/levels';
import { useCourseModules } from '../hooks/useCourseModules';

export function DashboardPage() {
  const { user, profile, isDemoMode, isSupabaseReady } = useAuth();
  const { modules, completedModules, totalModules, totalXp, progress, nextModule, isLoading, error } = useCourseModules();
  const currentLevel = getCurrentLevel(totalXp);
  const nextLevel = getNextLevel(totalXp);
  const hasAdminAccess = isDemoMode || profile?.role === 'admin';

  return (
    <div className="dashboard-page">
      <section className="page-header">
        <div>
          <span className="eyebrow">Painel do aluno</span>
          <h1>Olá, {user?.fullName ?? 'aluno'}!</h1>
          <p>Continue sua jornada pelo mundo da programação.</p>
        </div>
        <LevelBadge title={currentLevel.title} />
      </section>

      {!isSupabaseReady && (
        <div className="alert alert-warning">
          Supabase ainda não configurado. A plataforma está rodando em modo demonstração local.
        </div>
      )}

      {isDemoMode && isSupabaseReady && (
        <div className="alert alert-info">
          Você está usando o modo demonstração. Para salvar progresso real entre dispositivos, entre com uma conta Supabase.
        </div>
      )}

      <LogicSpeechBubble message="Comece pela primeira missão. A cada módulo concluído, você ganha XP e desbloqueia novos desafios." />

      <section className="dashboard-grid">
        <Card>
          <h2>Seu progresso</h2>
          {isLoading ? (
            <p className="muted">Carregando progresso...</p>
          ) : (
            <>
              <ProgressBar value={progress} label={`${completedModules} de ${totalModules} missões concluídas`} />
              <p className="muted">XP atual: <strong>{totalXp}</strong></p>
              {nextLevel ? (
                <p className="muted">Próximo nível: <strong>{nextLevel.title}</strong> em {nextLevel.minXp} XP.</p>
              ) : (
                <p className="muted">Você chegou ao maior nível da trilha.</p>
              )}
              <Link className="btn btn-secondary" to="/meu-progresso">Ver relatório completo</Link>
            </>
          )}
        </Card>

        <Card>
          <h2>Continuar jornada</h2>
          {nextModule ? (
            <>
              <p>Próxima missão: <strong>{nextModule.title}</strong></p>
              <Link className="btn btn-primary" to={`/modulo/${nextModule.id}`}>Continuar missão</Link>
            </>
          ) : (
            <>
              <p>Conclua o projeto final, faça a avaliação final e emita seu certificado de 4 horas.</p>
              <div className="button-row">
                <Link className="btn btn-primary" to="/projeto-final">Fazer projeto final</Link>
                <Link className="btn btn-secondary" to="/avaliacao-final">Avaliação final</Link>
                <Link className="btn btn-secondary" to="/certificado">Ver status</Link>
              </div>
            </>
          )}
        </Card>
      </section>

      <section className="dashboard-grid dashboard-grid-compact">
        <Card>
          <h2>Meu progresso</h2>
          <p>Veja um relatório completo com módulos, quizzes, atividades, projeto final e certificado.</p>
          <Link className="btn btn-primary" to="/meu-progresso">Abrir relatório</Link>
        </Card>

        <Card>
          <h2>Projeto final</h2>
          <p>Crie sua composição visual com comandos seguros e salve sua entrega no Supabase.</p>
          <Link className="btn btn-primary" to="/projeto-final">Abrir projeto final</Link>
        </Card>

        <Card>
          <h2>Avaliação final</h2>
          <p>Depois de concluir os módulos e o projeto final, faça a avaliação integradora da trilha.</p>
          <Link className="btn btn-primary" to="/avaliacao-final">Abrir avaliação final</Link>
        </Card>

        <Card>
          <h2>Certificado</h2>
          <p>Confira os requisitos e emita seu certificado verificável quando tudo estiver concluído.</p>
          <Link className="btn btn-secondary" to="/certificado">Ver certificado</Link>
        </Card>

        {hasAdminAccess && (
          <Card>
            <h2>Painel administrativo</h2>
            <p>Acompanhe alunos, progresso, avaliação final, projeto e certificados emitidos.</p>
            <Link className="btn btn-primary" to="/admin">Abrir painel</Link>
          </Card>
        )}
      </section>

      <section>
        <div className="section-heading">
          <h2>Centro de Missões</h2>
          <p>Trilha progressiva do CodeStart.</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {isLoading ? (
          <Card><p className="muted">Carregando módulos...</p></Card>
        ) : (
          <div className="modules-grid">
            {modules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
