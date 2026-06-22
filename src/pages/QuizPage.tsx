import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card } from '../components/Card';
import { LogicSpeechBubble } from '../components/LogicSpeechBubble';
import { useAuth } from '../contexts/AuthContext';
import { useCourseModules } from '../hooks/useCourseModules';
import { getModuleCompletionState, getQuizQuestionsByModule, submitQuizAttempt } from '../services/courseService';
import type { ModuleCompletionState, QuizAnswerPayload, QuizAttemptResult, QuizQuestion } from '../types';

type OptionLetter = 'A' | 'B' | 'C' | 'D';

const optionLabels: OptionLetter[] = ['A', 'B', 'C', 'D'];

function getOptionText(question: QuizQuestion, option: OptionLetter) {
  const map = {
    A: question.option_a,
    B: question.option_b,
    C: question.option_c,
    D: question.option_d,
  };
  return map[option];
}

export function QuizPage() {
  const { moduleId } = useParams();
  const { isDemoMode, user } = useAuth();
  const { modules } = useCourseModules();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, OptionLetter>>({});
  const [completionState, setCompletionState] = useState<ModuleCompletionState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<QuizAttemptResult | null>(null);

  const module = modules.find((item) => item.id === moduleId);
  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);
  const allAnswered = questions.length > 0 && answeredCount === questions.length;
  const activityCompleted = completionState?.activity_completed ?? false;

  useEffect(() => {
    let isMounted = true;

    async function loadQuestions() {
      if (!moduleId || !user) return;
      setIsLoading(true);
      setError(null);

      try {
        const [questionData, stateData] = await Promise.all([
          getQuizQuestionsByModule(moduleId, isDemoMode),
          getModuleCompletionState(user.id, moduleId, isDemoMode),
        ]);
        if (isMounted) {
          setQuestions(questionData);
          setCompletionState(stateData);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro ao carregar perguntas.';
        if (isMounted) setError(message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void loadQuestions();

    return () => {
      isMounted = false;
    };
  }, [moduleId, isDemoMode, user]);

  function handleSelect(questionId: string, option: OptionLetter) {
    if (result) return;
    setAnswers((current) => ({ ...current, [questionId]: option }));
  }

  async function handleSubmit() {
    if (!moduleId || !allAnswered || !activityCompleted) return;
    setIsSubmitting(true);
    setError(null);

    const payload: QuizAnswerPayload[] = questions.map((question) => ({
      question_id: question.id,
      selected_option: answers[question.id],
    }));

    try {
      const correction = await submitQuizAttempt(moduleId, payload, isDemoMode);
      setResult(correction);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao enviar respostas.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="quiz-page">
      <section className="page-header">
        <div>
          <span className="eyebrow">Quiz</span>
          <h1>{module ? `Avaliação: ${module.title}` : 'Avaliação do módulo'}</h1>
          <p>Responda com atenção. Agora a conclusão só vale se a atividade prática já estiver concluída.</p>
        </div>
        <span className="badge badge-xp">{answeredCount}/{questions.length || 0} respondidas</span>
      </section>

      <LogicSpeechBubble message="Leia o contexto da questão antes de escolher. A nota mínima é 70%, mas o módulo só conclui após atividade prática + quiz aprovado." />

      {!activityCompleted && !isLoading && (
        <div className="alert alert-warning">
          O quiz está bloqueado porque a atividade prática deste módulo ainda não foi concluída corretamente.
        </div>
      )}

      <Card>
        {isLoading && <p className="muted">Carregando perguntas...</p>}
        {error && <div className="alert alert-error">{error}</div>}
        {!isLoading && questions.length === 0 && (
          <p className="muted">Nenhuma pergunta cadastrada para este módulo ainda.</p>
        )}

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
                      disabled={Boolean(result) || !activityCompleted}
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
          <div className={result.module_completed ? 'alert alert-success' : 'alert alert-warning'}>
            <strong>{result.module_completed ? 'Módulo concluído!' : result.passed ? 'Quiz aprovado, mas o módulo ainda não foi concluído.' : 'Revise o conteúdo e tente novamente.'}</strong>
            <br />
            Você acertou {result.correct_answers} de {result.total_questions} questões. Aproveitamento: {result.score}%.
            {result.completion_message && <><br />{result.completion_message}</>}
          </div>
        )}

        <div className="button-row">
          <Link className="btn btn-secondary" to={`/modulo/${moduleId}`}>Voltar ao módulo</Link>
          {!result && (
            <button
              className="btn btn-primary"
              disabled={!activityCompleted || !allAnswered || isSubmitting}
              onClick={handleSubmit}
              type="button"
            >
              {isSubmitting ? 'Corrigindo...' : 'Enviar respostas'}
            </button>
          )}
          {result?.module_completed && <Link className="btn btn-success" to="/dashboard">Voltar ao painel</Link>}
          {!activityCompleted && <Link className="btn btn-primary" to={`/modulo/${moduleId}/atividade`}>Fazer atividade prática</Link>}
        </div>
      </Card>
    </div>
  );
}
