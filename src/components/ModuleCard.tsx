import { Lock, CheckCircle2, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { CourseModule } from '../types';
import { XpBadge } from './XpBadge';

interface ModuleCardProps {
  module: CourseModule;
}

export function ModuleCard({ module }: ModuleCardProps) {
  const status = module.status ?? 'locked';
  const isLocked = status === 'locked';

  const statusLabel = {
    locked: 'Bloqueado',
    available: 'Disponível',
    in_progress: 'Em andamento',
    completed: 'Concluído',
  }[status];

  const icon = status === 'completed' ? <CheckCircle2 size={20} /> : isLocked ? <Lock size={20} /> : <PlayCircle size={20} />;

  return (
    <article className={`module-card module-${status}`}>
      <div className="module-card-header">
        <span className="module-number">Missão {module.order_index}</span>
        <span className="module-status">{icon} {statusLabel}</span>
      </div>
      <h3>{module.title}</h3>
      <p>{module.description}</p>
      <div className="module-card-footer">
        <XpBadge xp={module.xp_reward} />
        {isLocked ? (
          <button className="btn btn-disabled" disabled>Bloqueado</button>
        ) : (
          <Link className="btn btn-primary" to={`/modulo/${module.id}`}>
            {status === 'completed' ? 'Revisar' : 'Iniciar'}
          </Link>
        )}
      </div>
    </article>
  );
}
