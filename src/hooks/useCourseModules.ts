import { useEffect, useMemo, useState } from 'react';
import { getModulesForUser } from '../services/courseService';
import { useAuth } from '../contexts/AuthContext';
import type { CourseModule } from '../types';

export function useCourseModules() {
  const { user, isDemoMode } = useAuth();
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      if (!user) {
        setModules([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await getModulesForUser(user.id, isDemoMode);
        if (isMounted) setModules(result);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro ao carregar módulos.';
        if (isMounted) setError(message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void load();

    return () => {
      isMounted = false;
    };
  }, [user, isDemoMode]);

  const stats = useMemo(() => {
    const completedModules = modules.filter((module) => module.status === 'completed').length;
    const totalModules = modules.length;
    const totalXp = modules
      .filter((module) => module.status === 'completed')
      .reduce((sum, module) => sum + module.xp_reward, 0);
    const progress = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
    const nextModule = modules.find((module) => module.status === 'in_progress' || module.status === 'available') ?? null;

    return { completedModules, totalModules, totalXp, progress, nextModule };
  }, [modules]);

  return { modules, ...stats, isLoading, error };
}
