import { type DragEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card } from '../components/Card';
import { LogicSpeechBubble } from '../components/LogicSpeechBubble';
import { VisualCodeEditor } from '../components/VisualCodeEditor';
import { useAuth } from '../contexts/AuthContext';
import { useCourseModules } from '../hooks/useCourseModules';
import { getActivitiesByModule, getCompletedActivityIdsByModule, saveActivityAttempt } from '../services/courseService';
import type { Activity } from '../types';

function sameArray(a: string[], b: string[]) {
  return a.length === b.length && a.every((item, index) => item === b[index]);
}

function OrderingActivity({ activity, onComplete }: { activity: Activity; onComplete: (data: unknown, isCorrect: boolean) => Promise<void> }) {
  const initialItems = useMemo(() => (activity.activity_data.items ?? []) as string[], [activity.activity_data]);
  const correctOrder = useMemo(() => (activity.activity_data.correct_order ?? []) as string[], [activity.activity_data]);
  const [items, setItems] = useState<string[]>(initialItems);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const updated = [...items];
    [updated[index], updated[target]] = [updated[target], updated[index]];
    setItems(updated);
    setFeedback(null);
    setIsCorrect(false);
  }

  async function verify() {
    const correct = sameArray(items, correctOrder);
    setIsCorrect(correct);
    setFeedback(correct ? activity.success_feedback : activity.error_feedback);
    setIsSaving(true);
    try {
      await onComplete({ order: items }, correct);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="activity-body">
      <ol className="ordering-list">
        {items.map((item, index) => (
          <li key={item}>
            <span>{item}</span>
            <div className="order-actions">
              <button className="btn btn-secondary" onClick={() => move(index, -1)} type="button">↑</button>
              <button className="btn btn-secondary" onClick={() => move(index, 1)} type="button">↓</button>
            </div>
          </li>
        ))}
      </ol>
      <button className="btn btn-primary" disabled={isSaving} onClick={verify} type="button">
        {isSaving ? 'Salvando...' : 'Verificar sequência'}
      </button>
      {feedback && <div className={isCorrect ? 'alert alert-success' : 'alert alert-warning'}>{feedback}</div>}
    </div>
  );
}

function MatchingActivity({ activity, onComplete }: { activity: Activity; onComplete: (data: unknown, isCorrect: boolean) => Promise<void> }) {
  const pairs = useMemo(() => (activity.activity_data.pairs ?? []) as Array<{ left: string; right: string }>, [activity.activity_data]);
  const options = useMemo(() => pairs.map((pair) => pair.right).sort((a, b) => a.localeCompare(b)), [pairs]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  async function verify() {
    const correct = pairs.every((pair) => answers[pair.left] === pair.right);
    setIsCorrect(correct);
    setFeedback(correct ? activity.success_feedback : activity.error_feedback);
    setIsSaving(true);
    try {
      await onComplete({ matches: answers }, correct);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="activity-body">
      <div className="matching-list">
        {pairs.map((pair) => (
          <label key={pair.left}>
            {pair.left}
            <select
              onChange={(event) => setAnswers((current) => ({ ...current, [pair.left]: event.target.value }))}
              value={answers[pair.left] ?? ''}
            >
              <option value="">Selecione uma consequência</option>
              {options.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </label>
        ))}
      </div>
      <button className="btn btn-primary" disabled={isSaving || Object.keys(answers).length < pairs.length} onClick={verify} type="button">
        {isSaving ? 'Salvando...' : 'Verificar associações'}
      </button>
      {feedback && <div className={isCorrect ? 'alert alert-success' : 'alert alert-warning'}>{feedback}</div>}
    </div>
  );
}

type Direction = 'east' | 'south' | 'west' | 'north';

type MazeConfig = {
  rows: number;
  cols: number;
  start: [number, number];
  goal: [number, number];
  obstacles?: Array<[number, number]>;
  direction?: Direction;
};

const DIRECTION_SYMBOL: Record<Direction, string> = {
  east: '→',
  south: '↓',
  west: '←',
  north: '↑',
};

function turnRight(direction: Direction): Direction {
  return direction === 'east' ? 'south' : direction === 'south' ? 'west' : direction === 'west' ? 'north' : 'east';
}

function turnLeft(direction: Direction): Direction {
  return direction === 'east' ? 'north' : direction === 'north' ? 'west' : direction === 'west' ? 'south' : 'east';
}

function nextPosition(row: number, col: number, direction: Direction): [number, number] {
  if (direction === 'east') return [row, col + 1];
  if (direction === 'south') return [row + 1, col];
  if (direction === 'west') return [row, col - 1];
  return [row - 1, col];
}

function buildPath(program: string[], maze: MazeConfig) {
  let [row, col] = maze.start;
  let direction = maze.direction ?? 'east';
  const path: Array<{ row: number; col: number; direction: Direction; blocked?: boolean }> = [{ row, col, direction }];
  const obstacleSet = new Set((maze.obstacles ?? []).map(([r, c]) => `${r}:${c}`));

  for (const block of program) {
    if (block === 'virar direita') {
      direction = turnRight(direction);
      path.push({ row, col, direction });
      continue;
    }
    if (block === 'virar esquerda') {
      direction = turnLeft(direction);
      path.push({ row, col, direction });
      continue;
    }
    if (block === 'andar') {
      const [nextRow, nextCol] = nextPosition(row, col, direction);
      const blocked = nextRow < 0 || nextCol < 0 || nextRow >= maze.rows || nextCol >= maze.cols || obstacleSet.has(`${nextRow}:${nextCol}`);
      if (blocked) {
        path.push({ row, col, direction, blocked: true });
      } else {
        row = nextRow;
        col = nextCol;
        path.push({ row, col, direction });
      }
    }
  }

  return path;
}

function BlockProgrammingActivity({ activity, onComplete }: { activity: Activity; onComplete: (data: unknown, isCorrect: boolean) => Promise<void> }) {
  const availableBlocks = useMemo(() => (activity.activity_data.available_blocks ?? []) as string[], [activity.activity_data]);
  const expected = useMemo(() => (activity.activity_data.expected ?? []) as string[], [activity.activity_data]);
  const maxMoves = typeof activity.activity_data.max_moves === 'number' ? Number(activity.activity_data.max_moves) : null;
  const requireGoal = Boolean(activity.activity_data.require_goal) || maxMoves !== null;
  const maze = useMemo(() => {
    const data = activity.activity_data.maze as Partial<MazeConfig> | undefined;
    return {
      rows: Number(data?.rows ?? 3),
      cols: Number(data?.cols ?? 4),
      start: (data?.start ?? [0, 0]) as [number, number],
      goal: (data?.goal ?? [0, 3]) as [number, number],
      obstacles: (data?.obstacles ?? []) as Array<[number, number]>,
      direction: (data?.direction ?? 'east') as Direction,
    } satisfies MazeConfig;
  }, [activity.activity_data]);
  const [program, setProgram] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDraggingOverProgram, setIsDraggingOverProgram] = useState(false);
  const boardRef = useRef<HTMLDivElement | null>(null);

  const path = useMemo(() => buildPath(program, maze), [program, maze]);
  const activePosition = path[Math.min(activeStep, path.length - 1)] ?? path[0];
  const obstacleSet = new Set((maze.obstacles ?? []).map(([r, c]) => `${r}:${c}`));
  const goalKey = `${maze.goal[0]}:${maze.goal[1]}`;

  function resetBlockFeedback() {
    setFeedback(null);
    setIsCorrect(false);
    setActiveStep(0);
  }

  function appendBlock(block: string) {
    setProgram((current) => [...current, block]);
    resetBlockFeedback();
  }

  function insertBlock(block: string, targetIndex?: number) {
    setProgram((current) => {
      const updated = [...current];
      updated.splice(targetIndex ?? updated.length, 0, block);
      return updated;
    });
    resetBlockFeedback();
  }

  function moveProgramBlock(fromIndex: number, targetIndex?: number) {
    setProgram((current) => {
      const updated = [...current];
      if (fromIndex < 0 || fromIndex >= updated.length) return current;
      const [item] = updated.splice(fromIndex, 1);
      const rawTarget = targetIndex ?? updated.length;
      const safeTarget = Math.max(0, Math.min(rawTarget, updated.length));
      updated.splice(safeTarget, 0, item);
      return updated;
    });
    resetBlockFeedback();
  }

  function removeProgramBlock(index: number) {
    setProgram((current) => current.filter((_, itemIndex) => itemIndex !== index));
    resetBlockFeedback();
  }

  function handlePaletteDragStart(event: DragEvent<HTMLButtonElement>, block: string) {
    event.dataTransfer.setData('application/x-codestart-block', block);
    event.dataTransfer.effectAllowed = 'copy';
  }

  function handleProgramDragStart(event: DragEvent<HTMLButtonElement>, index: number) {
    event.dataTransfer.setData('application/x-codestart-program-index', String(index));
    event.dataTransfer.effectAllowed = 'move';
  }

  function handleDragOver(event: DragEvent<HTMLElement>) {
    event.preventDefault();
    event.dataTransfer.dropEffect = event.dataTransfer.types.includes('application/x-codestart-program-index') ? 'move' : 'copy';
  }

  function handleProgramDrop(event: DragEvent<HTMLElement>, targetIndex?: number) {
    event.preventDefault();
    event.stopPropagation();
    setIsDraggingOverProgram(false);

    const draggedBlock = event.dataTransfer.getData('application/x-codestart-block');
    const draggedIndex = event.dataTransfer.getData('application/x-codestart-program-index');

    if (draggedIndex !== '') {
      const fromIndex = Number(draggedIndex);
      moveProgramBlock(fromIndex, targetIndex);
      return;
    }

    if (draggedBlock) {
      insertBlock(draggedBlock, targetIndex);
    }
  }

  async function verify() {
    const executedPath = buildPath(program, maze);
    const finalPosition = executedPath[executedPath.length - 1] ?? executedPath[0];
    const reachedGoal = finalPosition.row === maze.goal[0] && finalPosition.col === maze.goal[1];
    const hitObstacle = executedPath.some((step) => step.blocked);
    const moveCount = program.filter((block) => block === 'andar').length;
    const correct = requireGoal
      ? reachedGoal && !hitObstacle && (maxMoves === null || moveCount <= maxMoves)
      : sameArray(program, expected);

    setIsCorrect(correct);
    if (correct) {
      setFeedback(activity.success_feedback);
    } else if (maxMoves !== null && reachedGoal && !hitObstacle && moveCount > maxMoves) {
      setFeedback(`Você chegou à estrela, mas usou ${moveCount} movimentos. Tente resolver com no máximo ${maxMoves} movimentos de andar.`);
    } else {
      setFeedback(activity.error_feedback);
    }
    setActiveStep(executedPath.length - 1);
    setIsSaving(true);
    try {
      await onComplete({ program, path: executedPath, reachedGoal, hitObstacle, moveCount, maxMoves }, correct);
    } finally {
      setIsSaving(false);
    }
  }

  function runPreview() {
    boardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    boardRef.current?.focus({ preventScroll: true });
    setIsAnimating(true);
    setActiveStep(0);
    path.forEach((_, index) => {
      window.setTimeout(() => setActiveStep(index), index * 380);
    });
    window.setTimeout(() => setIsAnimating(false), Math.max(path.length * 380, 700));
  }

  return (
    <div className="activity-body block-activity block-activity-lab">
      <div className="block-lab-grid">
        <div className={`block-board ${isAnimating ? 'block-board-focus' : ''}`} ref={boardRef} tabIndex={-1} style={{ gridTemplateColumns: `repeat(${maze.cols}, minmax(48px, 1fr))` }}>
          {Array.from({ length: maze.rows * maze.cols }).map((_, index) => {
            const row = Math.floor(index / maze.cols);
            const col = index % maze.cols;
            const key = `${row}:${col}`;
            const hasLogic = activePosition?.row === row && activePosition?.col === col;
            return (
              <div className={`maze-cell ${obstacleSet.has(key) ? 'maze-obstacle' : ''} ${goalKey === key ? 'maze-goal' : ''}`} key={key}>
                {hasLogic && <span className={activePosition.blocked ? 'logic-marker logic-hit' : 'logic-marker'}>🐱<small>{DIRECTION_SYMBOL[activePosition.direction]}</small></span>}
                {!hasLogic && goalKey === key && <span className="maze-star">⭐</span>}
                {!hasLogic && obstacleSet.has(key) && <span>🧱</span>}
              </div>
            );
          })}
        </div>

        <div className="block-panel">
          <h3>Blocos disponíveis</h3>
          <div className="block-palette block-stack-palette" aria-label="Paleta de blocos disponíveis">
            {availableBlocks.map((block) => (
              <button
                className="block-chip block-snap block-draggable"
                draggable
                key={block}
                onClick={() => appendBlock(block)}
                onDragStart={(event) => handlePaletteDragStart(event, block)}
                type="button"
              >
                {block}
              </button>
            ))}
          </div>
          <p className="muted">Arraste os blocos para a área do programa ou clique para encaixar. Arraste blocos já encaixados para reorganizar.</p>
          {maxMoves !== null && <p className="muted"><strong>Meta:</strong> chegar à estrela usando no máximo {maxMoves} movimentos de andar.</p>}
        </div>
      </div>

      <div>
        <h3>Seu programa encaixado</h3>
        <div
          className={`program-list program-stack program-drop-zone ${program.length === 0 ? 'program-empty' : ''} ${isDraggingOverProgram ? 'program-drop-zone-active' : ''}`}
          onDragEnter={() => setIsDraggingOverProgram(true)}
          onDragLeave={() => setIsDraggingOverProgram(false)}
          onDragOver={handleDragOver}
          onDrop={(event) => handleProgramDrop(event)}
        >
          {program.length === 0 ? (
            <p className="program-empty-message">Arraste um bloco para cá e monte a sequência do LOGIC.</p>
          ) : program.map((block, index) => (
            <button
              aria-label={`Bloco ${index + 1}: ${block}. Clique para remover ou arraste para reorganizar.`}
              className="program-step program-block-step program-draggable-step"
              draggable
              key={`${block}-${index}`}
              onClick={() => removeProgramBlock(index)}
              onDragOver={handleDragOver}
              onDragStart={(event) => handleProgramDragStart(event, index)}
              onDrop={(event) => handleProgramDrop(event, index)}
              type="button"
            >
              <span>{index + 1}</span> {block} ✕
            </button>
          ))}
        </div>
        <p className="muted block-interaction-tip">Dica: no computador, use arrastar e soltar. No celular, toque nos blocos para adicionar e toque nos blocos encaixados para remover.</p>
      </div>
      <div className="button-row">
        <button className="btn btn-secondary" onClick={() => { setProgram([]); setActiveStep(0); resetBlockFeedback(); }} type="button">Limpar</button>
        <button className="btn btn-secondary" disabled={program.length === 0} onClick={runPreview} type="button">Animar LOGIC</button>
        <button className="btn btn-primary" disabled={isSaving || program.length === 0} onClick={verify} type="button">
          {isSaving ? 'Salvando...' : 'Executar e verificar'}
        </button>
      </div>
      {feedback && <div className={isCorrect ? 'alert alert-success' : 'alert alert-warning'}>{feedback}</div>}
    </div>
  );
}

function PredictOutputActivity({ activity, onComplete }: { activity: Activity; onComplete: (data: unknown, isCorrect: boolean) => Promise<void> }) {
  const pseudocode = useMemo(() => (activity.activity_data.pseudocode ?? []) as string[], [activity.activity_data]);
  const options = useMemo(() => (activity.activity_data.options ?? []) as string[], [activity.activity_data]);
  const correctAnswer = String(activity.activity_data.correct_answer ?? '');
  const explanation = String(activity.activity_data.explanation ?? '');
  const [selected, setSelected] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  async function verify() {
    const correct = selected === correctAnswer;
    setIsCorrect(correct);
    setFeedback(correct ? `${activity.success_feedback} ${explanation}` : `${activity.error_feedback} ${explanation}`);
    setIsSaving(true);
    try {
      await onComplete({ selected, correct_answer: correctAnswer }, correct);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="activity-body pseudo-activity">
      <div className="pseudo-code-card" aria-label="Pseudocódigo da atividade">
        {pseudocode.map((line, index) => <code key={`${line}-${index}`}>{line}</code>)}
      </div>
      <div className="option-grid option-grid-tech">
        {options.map((option) => (
          <button
            className={selected === option ? 'option-card option-selected' : 'option-card'}
            key={option}
            onClick={() => { setSelected(option); setFeedback(null); setIsCorrect(false); }}
            type="button"
          >
            {option}
          </button>
        ))}
      </div>
      <button className="btn btn-primary" disabled={isSaving || !selected} onClick={verify} type="button">
        {isSaving ? 'Salvando...' : 'Verificar resposta'}
      </button>
      {feedback && <div className={isCorrect ? 'alert alert-success' : 'alert alert-warning'}>{feedback}</div>}
    </div>
  );
}

function FillBlankActivity({ activity, onComplete }: { activity: Activity; onComplete: (data: unknown, isCorrect: boolean) => Promise<void> }) {
  const intro = String(activity.activity_data.intro ?? 'Complete as lacunas para formar o algoritmo correto.');
  const blanks = useMemo(() => (activity.activity_data.blanks ?? []) as Array<{ label: string; options: string[]; correct: string }>, [activity.activity_data]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  async function verify() {
    const correct = blanks.every((blank) => answers[blank.label] === blank.correct);
    setIsCorrect(correct);
    setFeedback(correct ? activity.success_feedback : activity.error_feedback);
    setIsSaving(true);
    try {
      await onComplete({ answers }, correct);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="activity-body pseudo-activity">
      <p className="muted">{intro}</p>
      <div className="fill-blank-list">
        {blanks.map((blank, index) => (
          <label className="fill-blank-item" key={blank.label}>
            <span><strong>{index + 1}.</strong> {blank.label}</span>
            <select
              onChange={(event) => { setAnswers((current) => ({ ...current, [blank.label]: event.target.value })); setFeedback(null); setIsCorrect(false); }}
              value={answers[blank.label] ?? ''}
            >
              <option value="">Selecione</option>
              {blank.options.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </label>
        ))}
      </div>
      <button className="btn btn-primary" disabled={isSaving || Object.keys(answers).length < blanks.length} onClick={verify} type="button">
        {isSaving ? 'Salvando...' : 'Verificar lacunas'}
      </button>
      {feedback && <div className={isCorrect ? 'alert alert-success' : 'alert alert-warning'}>{feedback}</div>}
    </div>
  );
}

function countCommand(lines: string[], command: string) {
  return lines.filter((line) => line.startsWith(command)).length;
}

function VisualCodeActivity({ activity, onComplete }: { activity: Activity; onComplete: (data: unknown, isCorrect: boolean) => Promise<void> }) {
  const [code, setCode] = useState(String(activity.activity_data.starter_code ?? ''));
  const [isValid, setIsValid] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const requiredCommands = (activity.activity_data.required_commands ?? []) as string[];
  const minimumLines = Number(activity.activity_data.minimum_lines ?? 1);
  const minimumCounts = (activity.activity_data.minimum_counts ?? {}) as Record<string, number>;
  const minimumColors = typeof activity.activity_data.minimum_colors === 'number' ? Number(activity.activity_data.minimum_colors) : 0;
  const targetDescription = String(activity.activity_data.target_description ?? 'Siga os critérios da atividade para montar o desenho solicitado.');
  const extraCriteria = (activity.activity_data.criteria ?? []) as string[];

  const normalizedLines = useMemo(() => code.split('\n').map((line) => line.trim().toLowerCase()).filter(Boolean), [code]);
  const uniqueColors = useMemo(() => new Set(normalizedLines.filter((line) => line.startsWith('cor ')).map((line) => line.replace('cor ', '').trim())).size, [normalizedLines]);

  const criteriaStatus = useMemo(() => {
    const base = [
      { label: `mínimo de ${minimumLines} comandos`, passed: normalizedLines.length >= minimumLines },
      ...requiredCommands.map((command) => ({ label: `usar o comando ${command}`, passed: normalizedLines.some((line) => line.startsWith(command)) })),
      ...Object.entries(minimumCounts).map(([command, min]) => ({ label: `usar ${command} pelo menos ${min} vez(es)`, passed: countCommand(normalizedLines, command) >= Number(min) })),
    ];
    if (minimumColors > 0) {
      base.push({ label: `usar pelo menos ${minimumColors} cores diferentes`, passed: uniqueColors >= minimumColors });
    }
    return base;
  }, [minimumLines, requiredCommands, normalizedLines, minimumCounts, minimumColors, uniqueColors]);

  const allCriteriaPassed = criteriaStatus.every((criterion) => criterion.passed);

  async function save() {
    const correct = isValid && allCriteriaPassed;
    setFeedback(correct ? activity.success_feedback : activity.error_feedback);
    setIsSaving(true);
    try {
      await onComplete({ code, criteria: criteriaStatus }, correct);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="activity-body visual-code-activity">
      <div className="target-briefing-card">
        <span className="eyebrow">Alvo visual</span>
        <h3>{targetDescription}</h3>
        {extraCriteria.length > 0 && (
          <ul>
            {extraCriteria.map((criterion) => <li key={criterion}>{criterion}</li>)}
          </ul>
        )}
      </div>
      <ul className="status-checklist criteria-checklist">
        {criteriaStatus.map((criterion) => (
          <li className={criterion.passed ? 'checked' : ''} key={criterion.label}>{criterion.passed ? '☑' : '□'} {criterion.label}</li>
        ))}
      </ul>
      <VisualCodeEditor initialCode={code} onCodeChange={setCode} onValidChange={setIsValid} />
      <button className="btn btn-primary" disabled={isSaving} onClick={save} type="button">
        {isSaving ? 'Salvando...' : 'Salvar atividade'}
      </button>
      {feedback && <div className={feedback === activity.success_feedback ? 'alert alert-success' : 'alert alert-warning'}>{feedback}</div>}
    </div>
  );
}

function ActivityRenderer({ activity, onComplete }: { activity: Activity; onComplete: (data: unknown, isCorrect: boolean) => Promise<void> }) {
  if (activity.activity_type === 'ordering') return <OrderingActivity activity={activity} onComplete={onComplete} />;
  if (activity.activity_type === 'matching') return <MatchingActivity activity={activity} onComplete={onComplete} />;
  if (activity.activity_type === 'block_programming') return <BlockProgrammingActivity activity={activity} onComplete={onComplete} />;
  if (activity.activity_type === 'visual_code') return <VisualCodeActivity activity={activity} onComplete={onComplete} />;
  if (activity.activity_type === 'predict_output') return <PredictOutputActivity activity={activity} onComplete={onComplete} />;
  if (activity.activity_type === 'fill_blank') return <FillBlankActivity activity={activity} onComplete={onComplete} />;
  return <p className="muted">Tipo de atividade ainda não implementado.</p>;
}

export function ActivityPage() {
  const { moduleId } = useParams();
  const { isDemoMode, user } = useAuth();
  const { modules } = useCourseModules();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  const module = modules.find((item) => item.id === moduleId);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    let isMounted = true;
    async function loadActivities() {
      if (!moduleId || !user) return;
      setIsLoading(true);
      setError(null);
      try {
        const [activityData, completedData] = await Promise.all([
          getActivitiesByModule(moduleId, isDemoMode),
          getCompletedActivityIdsByModule(user.id, moduleId, isDemoMode),
        ]);
        if (isMounted) {
          setActivities(activityData);
          setCompletedIds(completedData);
          window.setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }), 0);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro ao carregar atividades.';
        if (isMounted) setError(message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    void loadActivities();
    return () => {
      isMounted = false;
    };
  }, [moduleId, isDemoMode, user]);

  async function handleComplete(activity: Activity, submittedData: unknown, isCorrect: boolean) {
    if (!user) return;
    await saveActivityAttempt(user.id, activity.id, submittedData, isCorrect, isDemoMode);
    if (isCorrect) {
      setCompletedIds((current) => new Set(current).add(activity.id));
    }
  }

  const allCompleted = activities.length > 0 && activities.every((activity) => completedIds.has(activity.id));

  return (
    <div className="activity-page">
      <section className="page-header">
        <div>
          <span className="eyebrow">Atividade prática</span>
          <h1>{module ? module.title : 'Missão prática'}</h1>
          <p>Pratique antes de responder ao quiz. Agora o quiz só libera a conclusão real do módulo após esta etapa.</p>
        </div>
        <span className="badge badge-xp">{completedIds.size}/{activities.length || 0} concluídas</span>
      </section>

      <LogicSpeechBubble message="Agora é hora de aplicar o conteúdo. Conclua a atividade corretamente para liberar o quiz com validade para o progresso." />

      {isLoading && <Card><p className="muted">Carregando atividades...</p></Card>}
      {error && <div className="alert alert-error">{error}</div>}
      {!isLoading && activities.length === 0 && <Card><p className="muted">Nenhuma atividade cadastrada para este módulo.</p></Card>}

      <div className="activity-list">
        {activities.map((activity) => (
          <Card key={activity.id}>
            <div className="module-card-header">
              <span className="eyebrow">{activity.activity_type.replace('_', ' ')}</span>
              {completedIds.has(activity.id) && <span className="badge badge-success">Concluída</span>}
            </div>
            <h2>{activity.title}</h2>
            <p>{activity.statement}</p>
            <ActivityRenderer activity={activity} onComplete={(data, correct) => handleComplete(activity, data, correct)} />
          </Card>
        ))}
      </div>

      <div className="button-row page-actions">
        <Link className="btn btn-secondary" to={`/modulo/${moduleId}`}>Voltar ao conteúdo</Link>
        {allCompleted ? (
          <Link className="btn btn-primary" to={`/modulo/${moduleId}/quiz`}>Ir para o quiz</Link>
        ) : (
          <button className="btn btn-disabled" disabled type="button">Conclua a atividade para liberar o quiz</button>
        )}
      </div>
    </div>
  );
}
