import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card } from '../components/Card';
import { validateCertificateCode } from '../services/courseService';
import type { CertificateValidationResult } from '../types';

function formatDate(date?: string | null) {
  if (!date) return 'não informado';
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export function ValidateCertificatePage() {
  const { codigo } = useParams();
  const [result, setResult] = useState<CertificateValidationResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadValidation() {
      if (!codigo) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await validateCertificateCode(codigo);
        if (isMounted) setResult(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro ao validar certificado.';
        if (isMounted) setError(message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void loadValidation();

    return () => {
      isMounted = false;
    };
  }, [codigo]);

  return (
    <main className="validate-page">
      <Card className="validate-card validate-card-wide">
        <div className="validation-brand">
          <span className="brand-mark">CS</span>
          <span>CodeStart</span>
        </div>
        <span className="eyebrow">Validação pública</span>
        <h1>Validar certificado</h1>
        <p className="muted">Consulte a autenticidade de um certificado emitido pela plataforma CodeStart.</p>

        <div className="validation-code-box">
          <span>Código informado</span>
          <strong>{codigo ?? 'não informado'}</strong>
        </div>

        {isLoading && <p className="muted">Consultando certificado...</p>}
        {error && <div className="alert alert-error">{error}</div>}
        {!isLoading && !error && !result && (
          <div className="alert alert-warning">Certificado não encontrado.</div>
        )}
        {result && (
          <div className={result.is_valid ? 'validation-result valid' : 'validation-result invalid'}>
            <div className="validation-status-icon">{result.is_valid ? '✓' : '!'}</div>
            <div>
              <h2>{result.is_valid ? 'Certificado válido' : 'Certificado inválido ou revogado'}</h2>
              <dl className="validation-details">
                <div>
                  <dt>Aluno</dt>
                  <dd>{result.student_name}</dd>
                </div>
                <div>
                  <dt>Curso</dt>
                  <dd>{result.course_name}</dd>
                </div>
                <div>
                  <dt>Carga horária</dt>
                  <dd>{result.workload_hours} horas</dd>
                </div>
                <div>
                  <dt>Data de emissão</dt>
                  <dd>{formatDate(result.issued_at)}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{result.status}</dd>
                </div>
              </dl>
            </div>
          </div>
        )}

        <Link className="btn btn-secondary" to="/">Voltar para a página inicial</Link>
      </Card>
    </main>
  );
}
