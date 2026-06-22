import type { Level } from '../types';

export const LEVELS: Level[] = [
  { id: 1, title: 'Explorador da Lógica', minXp: 0 },
  { id: 2, title: 'Aprendiz de Algoritmos', minXp: 200 },
  { id: 3, title: 'Construtor de Soluções', minXp: 400 },
  { id: 4, title: 'Programador Iniciante', minXp: 700 },
  { id: 5, title: 'Mestre da Lógica', minXp: 1000 },
];

export function getCurrentLevel(xp: number): Level {
  return [...LEVELS].reverse().find((level) => xp >= level.minXp) ?? LEVELS[0];
}

export function getNextLevel(xp: number): Level | null {
  return LEVELS.find((level) => level.minXp > xp) ?? null;
}
