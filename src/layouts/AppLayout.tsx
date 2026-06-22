import { Link, Outlet } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function AppLayout() {
  const { logout, user, profile, isDemoMode } = useAuth();
  const hasAdminAccess = isDemoMode || profile?.role === 'admin';

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand" to="/dashboard" aria-label="Ir para o painel CodeStart">
          <span className="brand-mark">CS</span>
          <span>CodeStart</span>
        </Link>
        <div className="topbar-actions">
          <Link className="topbar-link" to="/sobre">Sobre</Link>
          <Link className="topbar-link" to="/meu-progresso">Meu progresso</Link>
          {hasAdminAccess && <Link className="topbar-link" to="/admin">Administração</Link>}
          {hasAdminAccess && <Link className="topbar-link" to="/admin/status">Status</Link>}
          <span className="user-chip">{user?.fullName ?? 'Aluno'}</span>
          <button className="icon-button" onClick={() => void logout()} aria-label="Sair da conta">
            <LogOut size={18} />
          </button>
        </div>
      </header>
      <main className="page-container">
        <Outlet />
      </main>
    </div>
  );
}
