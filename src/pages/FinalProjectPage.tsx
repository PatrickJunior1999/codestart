import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { LogicSpeechBubble } from '../components/LogicSpeechBubble';
import { VisualCodeEditor } from '../components/VisualCodeEditor';
import { useAuth } from '../contexts/AuthContext';
import { saveFinalProject } from '../services/courseService';

const FINAL_PROJECT_STARTER = [
  'limpar',
  'cor amarelo',
  'circulo 340 60 58',
  'cor azul',
  'retangulo 95 150 150 95',
  'cor roxo',
  'triangulo 75 150 170 75 265 150',
  'cor marrom',
  'retangulo 155 190 42 55',
  'cor verde',
  'retangulo 285 155 28 90',
  'circulo 300 125 70',
  'cor cinza',
  'linha 0 260 420 260',
].join('\n');

const REQUIREMENTS = [
  { label: 'pelo menos 12 linhas de comandos', test: (lines: string[]) => lines.length >= 12 },
  { label: 'usar 4 ou mais cores', test: (lines: string[]) => lines.filter((line) => line.startsWith('cor ')).length >= 4 },
  { label: 'desenhar pelo menos 3 retângulos', test: (lines: string[]) => lines.filter((line) => line.startsWith('retangulo')).length >= 3 },
  { label: 'desenhar pelo menos 2 círculos', test: (lines: string[]) => lines.filter((line) => line.startsWith('circulo')).length >= 2 },
  { label: 'usar pelo menos 1 triângulo para o telhado', test: (lines: string[]) => lines.some((line) => line.startsWith('triangulo')) },
  { label: 'usar pelo menos 1 linha para chão ou rua', test: (lines: string[]) => lines.some((line) => line.startsWith('linha')) },
];

export function FinalProjectPage() {
  const { user, isDemoMode } = useAuth();
  const [code, setCode] = useState(FINAL_PROJECT_STARTER);
  const [isValid, setIsValid] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const normalizedLines = useMemo(
    () => code.split('\n').map((line) => line.trim().toLowerCase()).filter(Boolean),
    [code],
  );

  const requirementStatus = REQUIREMENTS.map((requirement) => ({
    ...requirement,
    passed: requirement.test(normalizedLines),
  }));

  const allRequirementsPassed = requirementStatus.every((item) => item.passed);

  async function handleSave() {
    if (!user) return;

    if (!isValid || !allRequirementsPassed) {
      setFeedback('Revise seu projeto. Ele precisa representar uma cena programada completa e cumprir todos os critérios listados.');
      return;
    }

    setIsSaving(true);
    setFeedback(null);
    try {
      await saveFinalProject(user.id, code, isDemoMode);
      setFeedback('Projeto final salvo com sucesso. Ele já pode ser considerado na emissão do certificado.');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao salvar projeto final.';
      setFeedback(message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="final-project-page">
      <section className="page-header page-header-actions">
        <div>
          <span className="eyebrow">Projeto final</span>
          <h1>Cena Programada CodeStart</h1>
          <p>Crie uma cena completa com casa, árvore, sol e chão/rua usando comandos visuais. O objetivo é demonstrar sequência lógica, domínio das formas e atenção aos critérios.</p>
        </div>
        <Link className="btn btn-secondary" to="/dashboard">Voltar aos módulos</Link>
      </section>

      <LogicSpeechBubble message="Sua missão final é demonstrar sequência lógica, escolha de formas, uso de cores e organização espacial. Pense no desenho antes de escrever os comandos." />

      <Card className="project-briefing-card">
        <span className="eyebrow">Briefing do desafio</span>
        <h2>Desenhe uma cena programada completa</h2>
        <p>A cena deve conter, no mínimo: uma casa com telhado, uma árvore, um sol e uma linha de chão ou rua. Você pode melhorar o desenho com janelas, porta, nuvens, caminho, detalhes e organização espacial.</p>
        <ul className="status-checklist">
          {requirementStatus.map((item) => (
            <li className={item.passed ? 'checked' : ''} key={item.label}>{item.passed ? '☑' : '□'} {item.label}</li>
          ))}
        </ul>
      </Card>

      <Card>
        <VisualCodeEditor initialCode={code} onCodeChange={setCode} onValidChange={setIsValid} />
        <div className="button-row">
          <button className="btn btn-primary" disabled={isSaving} onClick={handleSave} type="button">
            {isSaving ? 'Salvando...' : 'Salvar projeto final'}
          </button>
          <Link className="btn btn-secondary" to="/dashboard">Voltar aos módulos</Link>
          <Link className="btn btn-secondary" to="/certificado">Ir para certificado</Link>
        </div>
        {feedback && <div className={feedback.includes('sucesso') ? 'alert alert-success' : 'alert alert-warning'}>{feedback}</div>}
      </Card>
    </div>
  );
}
