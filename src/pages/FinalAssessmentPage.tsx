import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { LogicSpeechBubble } from '../components/LogicSpeechBubble';
import { useAuth } from '../contexts/AuthContext';
import { getCertificationStatus, getFinalAssessmentQuestions, submitFinalAssessment } from '../services/courseService';
import type { CertificationStatus, FinalAssessmentQuestion, FinalAssessmentResult, QuizAnswerPayload } from '../types';

type OptionLetter = 'A' | 'B' | 'C' | 'D';

const optionLabels: OptionLetter[] = ['A', 'B', 'C', 'D'];

function getOptionText(question: FinalAssessmentQuestion, option: OptionLetter) {
  const map = {
    A: question.option_a,
    B: question.option_b,
    C: question.option_c,
    D: question.option_d,
  };
  return map[option];
}

export function FinalAssessmentPage() {
  const { user, isDemoMode } = useAuth();
  const [questions, setQuestions] = useState<FinalAssessmentQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, OptionLetter>>({});
  const [status, setStatus] = useState<CertificationStatus | null>(null);
  const [result, setResult] = useState<FinalAssessmentResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);
  const allAnswered = questions.length > 0 && answeredCount === questions.length;
  const canStart = Boolean(status && status.completed_modules === status.total_modules && status.has_final_project);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      if (!user) return;
      setIsLoading(true);
      setError(null);

      try {
        const [questionData, statusData] = await Promise.all([
          getFinalAssessmentQuestions(isDemoMode),
          getCertificationStatus(user.id, isDemoMode),
        ]);
        if (isMounted) {
          setQuestions(questionData);
          setStatus(statusData);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro ao carregar avaliação final.';
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

  function handleSelect(questionId: string, option: OptionLetter) {
    if (result) return;
    setAnswers((current) => ({ ...current, [questionId]: option }));
  }

  async function handleSubmit() {
    if (!allAnswered || !canStart) return;
    setIsSubmitting(true);
    setError(null);

    const payload: QuizAnswerPayload[] = questions.map((question) => ({
      question_id: question.id,
      selected_option: answers[question.id],
    }));

    try {
      const correction = await submitFinalAssessment(payload, isDemoMode);
      setResult(correction);
      if (user) {
        const refreshedStatus = await getCertificationStatus(user.id, isDemoMode);
        setStatus(refreshedStatus);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao enviar avaliação final.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="final-assessment-page">
      <section className="page-header">
        <div>
          <span className="eyebrow">Avaliação final</span>
          <h1>Desafio final CodeStart</h1>
          <p>Responda 10 questões integrando lógica, pensamento computacional, blocos e código visual.</p>
        </div>
        <span className="badge badge-xp">{answeredCount}/{questions.length || 0} respondidas</span>
      </section>

      <LogicSpeechBubble message="Esta avaliação confirma que você compreendeu a trilha como um todo. Nota mínima: 70%." />

      {status && !canStart && (
        <div className="alert alert-warning">
          A avaliação final ainda está bloqueada. Conclua os 8 módulos e salve o Projeto Final antes de começar.
        </div>
      )}

      {status && (
        <Card>
          <h2>Pré-requisitos</h2>
          <ul className="checklist status-checklist">
            <li className={status.completed_modules === status.total_modules ? 'checked' : ''}>
              {status.completed_modules === status.total_modules ? '☑' : '□'} Módulos concluídos: {status.completed_modules}/{status.total_modules}
            </li>
            <li className={status.has_final_project ? 'checked' : ''}>
              {status.has_final_project ? '☑' : '□'} Projeto final salvo
            </li>
          </ul>
        </Card>
      )}

      <Card>
        {isLoading && <p className="muted">Carregando avaliação...</p>}
        {error && <div className="alert alert-error">{error}</div>}

        <div className="quiz-question-list">
          {questions.map((question) => (
            <section className="quiz-question-card" key={question.id}>
              <span className="question-index">Questão {question.order_index}</span>
              <p className="question-text">{question.question}</p>
              <div className="options-list">
                {optionLabels.map((option) => {
                  const isSelected = answers[question.id] === option;
                  return (
                    <button
                      className={`option-button ${isSelected ? 'option-selected' : ''}`}
                      disabled={Boolean(result) || !canStart}
                      key={option}
                      onClick={() => handleSelect(question.id, option)}
                      type="button"
                    >
                      <strong>{option})</strong> {getOptionText(question, option)}
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {result && (
          <div className={result.passed ? 'alert alert-success' : 'alert alert-warning'}>
            <strong>{result.passed ? 'Avaliação final aprovada!' : 'Avaliação final não atingiu 70%.'}</strong>
            <br />
            Você acertou {result.correct_answers} de {result.total_questions} questões. Aproveitamento: {result.score}%.
          </div>
        )}

        <div className="button-row">
          <Link className="btn btn-secondary" to="/dashboard">Voltar ao painel</Link>
          {!result && (
            <button className="btn btn-primary" disabled={!canStart || !allAnswered || isSubmitting} onClick={handleSubmit} type="button">
              {isSubmitting ? 'Corrigindo...' : 'Enviar avaliação final'}
            </button>
          )}
          {result?.passed && <Link className="btn btn-success" to="/certificado">Ir para certificado</Link>}
          {!status?.has_final_project && <Link className="btn btn-primary" to="/projeto-final">Fazer projeto final</Link>}
        </div>
      </Card>
    </div>
  );
}
