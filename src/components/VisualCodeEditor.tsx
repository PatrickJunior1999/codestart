import { useEffect, useMemo, useRef, useState } from 'react';

type DrawCommand =
  | { type: 'color'; color: string }
  | { type: 'clear' }
  | { type: 'circle'; x: number; y: number; size: number }
  | { type: 'rect'; x: number; y: number; width: number; height: number }
  | { type: 'line'; x1: number; y1: number; x2: number; y2: number }
  | { type: 'triangle'; x1: number; y1: number; x2: number; y2: number; x3: number; y3: number };

type VisualCodeEditorProps = {
  initialCode?: string;
  onCodeChange?: (code: string) => void;
  onValidChange?: (isValid: boolean) => void;
};

const COLOR_MAP: Record<string, string> = {
  azul: '#38bdf8',
  vermelho: '#fb7185',
  verde: '#34d399',
  amarelo: '#facc15',
  roxo: '#a78bfa',
  preto: '#0f172a',
  branco: '#f8fafc',
  marrom: '#92400e',
  laranja: '#fb923c',
  cinza: '#94a3b8',
};

const DEFAULT_CODE = '';

const EDITOR_PLACEHOLDER = [
  'Comece aqui. Exemplo de estrutura:',
  'limpar',
  'cor nome_da_cor',
  'retangulo x y largura altura',
  'circulo x y tamanho',
  'linha x1 y1 x2 y2',
  'triangulo x1 y1 x2 y2 x3 y3',
].join('\n');

function parseNumber(value: string): number | null {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function parseCode(code: string): { commands: DrawCommand[]; errors: string[] } {
  const commands: DrawCommand[] = [];
  const errors: string[] = [];

  const lines = code
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  lines.forEach((line, index) => {
    const parts = line.toLowerCase().split(/\s+/);
    const command = parts[0];
    const lineNumber = index + 1;

    if (command === 'limpar') {
      commands.push({ type: 'clear' });
      return;
    }

    if (command === 'cor') {
      const colorName = parts[1];
      if (!colorName || !COLOR_MAP[colorName]) {
        errors.push(`Linha ${lineNumber}: use uma cor válida: azul, vermelho, verde, amarelo, roxo, preto, branco, marrom, laranja ou cinza.`);
        return;
      }
      commands.push({ type: 'color', color: COLOR_MAP[colorName] });
      return;
    }

    if (command === 'circulo') {
      if (parts.length !== 4) {
        errors.push(`Linha ${lineNumber}: use circulo x y tamanho.`);
        return;
      }
      const [x, y, size] = parts.slice(1).map(parseNumber);
      if (x === null || y === null || size === null) {
        errors.push(`Linha ${lineNumber}: circulo precisa receber apenas números.`);
        return;
      }
      commands.push({ type: 'circle', x, y, size });
      return;
    }

    if (command === 'retangulo') {
      if (parts.length !== 5) {
        errors.push(`Linha ${lineNumber}: use retangulo x y largura altura.`);
        return;
      }
      const [x, y, width, height] = parts.slice(1).map(parseNumber);
      if (x === null || y === null || width === null || height === null) {
        errors.push(`Linha ${lineNumber}: retangulo precisa receber apenas números.`);
        return;
      }
      commands.push({ type: 'rect', x, y, width, height });
      return;
    }

    if (command === 'linha') {
      if (parts.length !== 5) {
        errors.push(`Linha ${lineNumber}: use linha x1 y1 x2 y2.`);
        return;
      }
      const [x1, y1, x2, y2] = parts.slice(1).map(parseNumber);
      if (x1 === null || y1 === null || x2 === null || y2 === null) {
        errors.push(`Linha ${lineNumber}: linha precisa receber apenas números.`);
        return;
      }
      commands.push({ type: 'line', x1, y1, x2, y2 });
      return;
    }

    if (command === 'triangulo') {
      if (parts.length !== 7) {
        errors.push(`Linha ${lineNumber}: use triangulo x1 y1 x2 y2 x3 y3.`);
        return;
      }
      const [x1, y1, x2, y2, x3, y3] = parts.slice(1).map(parseNumber);
      if (x1 === null || y1 === null || x2 === null || y2 === null || x3 === null || y3 === null) {
        errors.push(`Linha ${lineNumber}: triangulo precisa receber apenas números.`);
        return;
      }
      commands.push({ type: 'triangle', x1, y1, x2, y2, x3, y3 });
      return;
    }

    errors.push(`Linha ${lineNumber}: comando "${command}" não reconhecido.`);
  });

  return { commands, errors };
}

function drawGrid(context: CanvasRenderingContext2D, width: number, height: number) {
  context.fillStyle = '#f8fafc';
  context.fillRect(0, 0, width, height);

  context.strokeStyle = 'rgba(148, 163, 184, 0.18)';
  context.lineWidth = 1;
  for (let x = 0; x <= width; x += 30) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }
  for (let y = 0; y <= height; y += 30) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }

  context.strokeStyle = '#cbd5e1';
  context.strokeRect(0, 0, width, height);
}

export function VisualCodeEditor({ initialCode, onCodeChange, onValidChange }: VisualCodeEditorProps) {
  const [code, setCode] = useState(initialCode ?? DEFAULT_CODE);
  const [lastRun, setLastRun] = useState(code);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const parsed = useMemo(() => parseCode(lastRun), [lastRun]);
  const currentParsed = useMemo(() => parseCode(code), [code]);

  useEffect(() => {
    onCodeChange?.(code);
    onValidChange?.(currentParsed.errors.length === 0 && code.trim().length > 0);
  }, [code, currentParsed.errors.length, onCodeChange, onValidChange]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    drawGrid(context, canvas.width, canvas.height);

    let activeColor = '#38bdf8';
    context.lineWidth = 4;
    context.lineCap = 'round';
    context.lineJoin = 'round';

    for (const command of parsed.commands) {
      if (command.type === 'clear') {
        drawGrid(context, canvas.width, canvas.height);
        continue;
      }

      if (command.type === 'color') {
        activeColor = command.color;
        continue;
      }

      context.fillStyle = activeColor;
      context.strokeStyle = activeColor;

      if (command.type === 'circle') {
        context.beginPath();
        context.arc(command.x, command.y, command.size / 2, 0, Math.PI * 2);
        context.fill();
      }

      if (command.type === 'rect') {
        context.fillRect(command.x, command.y, command.width, command.height);
      }

      if (command.type === 'line') {
        context.beginPath();
        context.moveTo(command.x1, command.y1);
        context.lineTo(command.x2, command.y2);
        context.stroke();
      }

      if (command.type === 'triangle') {
        context.beginPath();
        context.moveTo(command.x1, command.y1);
        context.lineTo(command.x2, command.y2);
        context.lineTo(command.x3, command.y3);
        context.closePath();
        context.fill();
      }
    }
  }, [parsed.commands]);

  return (
    <div className="visual-code-editor">
      <div className="editor-grid">
        <div>
          <label>
            Editor de comandos
            <textarea
              className="code-editor"
              onChange={(event) => setCode(event.target.value)}
              spellCheck={false}
              value={code}
              placeholder={EDITOR_PLACEHOLDER}
            />
          </label>
          <div className="button-row">
            <button className="btn btn-primary" onClick={() => setLastRun(code)} type="button">
              Executar prévia
            </button>
          </div>
          <div className="command-help command-help-tech">
            <strong>Comandos permitidos</strong>
            <code>cor nome_da_cor</code>
            <code>circulo x y tamanho</code>
            <code>retangulo x y largura altura</code>
            <code>linha x1 y1 x2 y2</code>
            <code>triangulo x1 y1 x2 y2 x3 y3</code>
            <code>limpar</code>
          </div>
        </div>
        <div>
          <h3>Prévia visual</h3>
          <canvas className="visual-canvas" height={300} ref={canvasRef} width={420} />
          {parsed.errors.length > 0 && (
            <div className="alert alert-error">
              <strong>Revise os comandos:</strong>
              <ul>
                {parsed.errors.map((error) => <li key={error}>{error}</li>)}
              </ul>
            </div>
          )}
          {parsed.errors.length === 0 && lastRun.trim().length > 0 && (
            <div className="alert alert-success">Comandos interpretados com sucesso.</div>
          )}
          {lastRun.trim().length === 0 && (
            <div className="alert alert-warning">Digite seus comandos e clique em Executar prévia para comparar com a referência.</div>
          )}
        </div>
      </div>
    </div>
  );
}
