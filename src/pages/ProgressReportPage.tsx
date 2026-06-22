import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { LogicSpeechBubble } from '../components/LogicSpeechBubble';
import { ProgressBar } from '../components/ProgressBar';
import { useAuth } from '../contexts/AuthContext';
import { getCurrentLevel, getNextLevel } from '../config/levels';
import { getStudentProgressReport } from '../services/courseService';
import type { StudentProgressReport } from '../types';

function formatDate(value?: string | null): string {
  if (!value) return 'Ainda não registrado';
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function formatPercent(value: number | null | undefined): string {
  if (value === null || value === undefined) return '—';
  return `${Math.round(value)}%`;
}

export function ProgressReportPage() {
  const { user, isDemoMode } = useAuth();
  const [report, setReport] = useState<StudentProgressReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadReport() {
      if (!user) return;
      setIsLoading(true);
      setError(null);

      try {
        const data = await getStudentProgressReport(user.id, isDemoMode);
        if (isMounted) setReport(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro ao carregar relatório de progresso.';
        if (isMounted) setError(message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void loadReport();

    return () => {
      isMounted = false;
    };
  }, [user, isDemoMode]);

  const progressPercent = useMemo(() => {
    if (!report || report.total_modules === 0) return 0;
    return Math.round((report.completed_modules / report.total_modules) * 100);
  }, [report]);

  if (isLoading) {
    return <Card><p className="muted">Carregando relatório de progresso...</p></Card>;
  }

  if (error) {
    return (
      <Card>
        <div className="alert alert-error">{error}</div>
        <Link className="btn btn-primary" to="/dashboard">Voltar ao painel</Link>
      </Card>
    );
  }

  if (!report) {
    return (
      <Card>
        <h1>Relatório indisponível</h1>
        <p className="muted">Não foi possível montar o relatório deste aluno.</p>
        <Link className="btn btn-primary" to="/dashboard">Voltar ao painel</Link>
      </Card>
    );
  }

  const level = getCurrentLevel(report.total_xp);
  const nextLevel = getNextLevel(report.total_xp);
  const finalScore = report.final_assessment?.score ?? 0;
  const finalPassed = finalScore >= 70;

  return (
    <div className="progress-report-page progress-report-print">
      <section className="page-header no-print">
        <div>
          <span className="eyebrow">Relatório do aluno</span>
          <h1>Meu progresso CodeStart</h1>
          <p>Acompanhe módulos, atividades, avaliação final, projeto e certificado em um único lugar.</p>
        </div>
        <div className="button-row">
          <button className="btn btn-secondary" type="button" onClick={() => window.print()}>Imprimir relatório</button>
          <Link className="btn btn-primary" to="/dashboard">Voltar aos módulos</Link>
        </div>
      </section>

      <section className="report-document">
        <div className="report-header">
          <div>
            <span className="eyebrow">CodeStart</span>
            <h2>Relatório de acompanhamento</h2>
            <p>Curso: <strong>CodeStart: Explorando o Mundo da Programação</strong></p>
          </div>
          <div className="report-stamp">CS</div>
        </div>

        <div className="report-student-box">
          <div>
            <span>Aluno</span>
            <strong>{report.student_name}</strong>
          </div>
          <div>
            <span>E-mail</span>
            <strong>{report.student_email}</strong>
          </div>
          <div>
            <span>Nível atual</span>
            <strong>{level.title}</strong>
          </div>
          <div>
            <span>XP total</span>
            <strong>{report.total_xp} XP</strong>
          </div>
        </div>

        <LogicSpeechBubble message="Este relatório serve como evidência de acompanhamento: mostra o avanço nos módulos, as tentativas avaliativas, o projeto final e a situação do certificado." />

        <section className="report-summary-grid">
          <Card>
            <h3>Conclusão dos módulos</h3>
            <ProgressBar value={progressPercent} label={`${report.completed_modules} de ${report.total_modules} módulos concluídos`} />
          </Card>
          <Card>
            <h3>Avaliação final</h3>
            <p className={finalPassed ? 'report-success' : 'report-pending'}>
              {report.final_assessment ? `${formatPercent(finalScore)} — ${finalPassed ? 'aprovado' : 'pendente'}` : 'Ainda não realizada'}
            </p>
          </Card>
          <Card>
            <h3>Projeto final</h3>
            <p className={report.final_project ? 'report-success' : 'report-pending'}>
              {report.final_project ? `Entregue em ${formatDate(report.final_project.submitted_at ?? report.final_project.updated_at)}` : 'Ainda não entregue'}
            </p>
          </Card>
          <Card>
            <h3>Certificado</h3>
            <p className={report.certificate ? 'report-success' : 'report-pending'}>
              {report.certificate ? `Emitido: ${report.certificate.certificate_code}` : 'Ainda não emitido'}
            </p>
          </Card>
        </section>

        <section className="report-actions no-print">
          <Link className="btn btn-secondary" to="/projeto-final">Projeto final</Link>
          <Link className="btn btn-secondary" to="/avaliacao-final">Avaliação final</Link>
          <Link className="btn btn-secondary" to="/certificado">Certificado</Link>
        </section>

        <section className="report-section">
          <div className="section-heading">
            <h2>Detalhamento por módulo</h2>
            <p>Resumo das atividades, quizzes e progresso registrado no banco de dados.</p>
          </div>

          <div className="report-table-wrap">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Módulo</th>
                  <th>Status</th>
                  <th>Atividades</th>
                  <th>Melhor quiz</th>
                  <th>XP</th>
                  <th>Conclusão</th>
                </tr>
              </thead>
              <tbody>
                {report.modules.map((module) => {
                  const completed = module.status === 'completed';
                  return (
                    <tr key={module.module_id}>
                      <td>
                        <strong>{module.order_index}. {module.title}</strong>
                      </td>
                      <td><span className={`mini-status ${completed ? 'mini-status-ok' : 'mini-status-wait'}`}>{completed ? 'Concluído' : 'Pendente'}</span></td>
                      <td>{module.completed_activities}/{module.total_activities}</td>
                      <td>{formatPercent(module.best_quiz_score)}</td>
                      <td>{module.xp_earned}</td>
                      <td>{formatDate(module.completed_at)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="report-section report-footer-note">
          <p>
            {nextLevel
              ? `Próximo nível: ${nextLevel.title}, liberado ao atingir ${nextLevel.minXp} XP.`
              : 'O aluno atingiu o maior nível da trilha CodeStart.'}
          </p>
          <p>Relatório gerado em {formatDate(new Date().toISOString())}.</p>
        </section>
      </section>
    </div>
  );
}
