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
