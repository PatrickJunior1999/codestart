import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode';
import { jsPDF } from 'jspdf';
import { Card } from '../components/Card';
import { LogicSpeechBubble } from '../components/LogicSpeechBubble';
import { useAuth } from '../contexts/AuthContext';
import { getCertificationStatus, issueCertificate } from '../services/courseService';
import type { CertificationStatus } from '../types';

const COURSE_NAME = 'CodeStart: Explorando o Mundo da Programação';
const CERTIFICATE_DESCRIPTION =
  'Curso introdutório de lógica de programação, pensamento computacional, programação em blocos, código visual e projeto final.';

function formatDate(date?: string | null) {
  if (!date) return 'Data não informada';
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export function CertificatePage() {
  const { user, isDemoMode } = useAuth();
  const [status, setStatus] = useState<CertificationStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isIssuing, setIsIssuing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const certificateRef = useRef<HTMLDivElement | null>(null);

  async function loadStatus() {
    if (!user) return;
    setIsLoading(true);
    setFeedback(null);
    try {
      const data = await getCertificationStatus(user.id, isDemoMode);
      setStatus(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao carregar status do certificado.';
      setFeedback(message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadStatus();
  }, [user, isDemoMode]);

  const validationUrl = useMemo(() => {
    if (!status?.certificate_code) return null;
    return `${window.location.origin}/validar/${status.certificate_code}`;
  }, [status?.certificate_code]);

  useEffect(() => {
    let isMounted = true;

    async function generateQrCode() {
      if (!validationUrl) {
        setQrCodeUrl(null);
        return;
      }

      try {
        const dataUrl = await QRCode.toDataURL(validationUrl, {
          margin: 1,
          width: 220,
          errorCorrectionLevel: 'M',
        });
        if (isMounted) setQrCodeUrl(dataUrl);
      } catch {
        if (isMounted) setQrCodeUrl(null);
      }
    }

    void generateQrCode();

    return () => {
      isMounted = false;
    };
  }, [validationUrl]);

  async function handleIssueCertificate() {
    setIsIssuing(true);
    setFeedback(null);
    try {
      const certificate = await issueCertificate(isDemoMode);
      setFeedback(`Certificado emitido com sucesso: ${certificate.certificate_code}`);
      await loadStatus();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao emitir certificado.';
      setFeedback(message);
    } finally {
      setIsIssuing(false);
    }
  }

  function handlePrint() {
    window.print();
  }

  async function handleDownloadPdf() {
    if (!status?.certificate_code || !user) return;

    setIsDownloading(true);
    setFeedback(null);

    try {
      const qrDataUrl = qrCodeUrl ?? (validationUrl ? await QRCode.toDataURL(validationUrl, { margin: 1, width: 220 }) : null);
      const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      doc.setFillColor(248, 250, 252);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');

      doc.setDrawColor(59, 130, 246);
      doc.setLineWidth(1.1);
      doc.roundedRect(14, 14, pageWidth - 28, pageHeight - 28, 5, 5, 'S');

      doc.setDrawColor(124, 58, 237);
      doc.setLineWidth(0.45);
      doc.roundedRect(20, 20, pageWidth - 40, pageHeight - 40, 3, 3, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(37, 99, 235);
      doc.setFontSize(15);
      doc.text('CodeStart', 34, 34);

      doc.setTextColor(30, 41, 59);
      doc.setFontSize(28);
      doc.text('CERTIFICADO DE CONCLUSÃO', pageWidth / 2, 55, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(13);
      doc.setTextColor(100, 116, 139);
      doc.text('Certificamos que', pageWidth / 2, 73, { align: 'center' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(26);
      doc.setTextColor(30, 41, 59);
      doc.text(user.fullName, pageWidth / 2, 90, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.setTextColor(51, 65, 85);
      const description = `concluiu o curso ${COURSE_NAME}, com carga horária de ${status.workload_hours ?? 4} horas, contemplando lógica de programação, pensamento computacional, programação em blocos, código visual e projeto final.`;
      const lines = doc.splitTextToSize(description, 210);
      doc.text(lines, pageWidth / 2, 106, { align: 'center' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(30, 41, 59);
      doc.text(`Emitido em: ${formatDate(status.issued_at)}`, 34, 148);
      doc.text(`Código: ${status.certificate_code}`, 34, 158);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      doc.text('Validação pública:', 34, 168);
      doc.text(validationUrl ?? 'Link indisponível', 34, 174);

      if (qrDataUrl) {
        doc.addImage(qrDataUrl, 'PNG', pageWidth - 58, 137, 32, 32);
        doc.setFontSize(8);
        doc.text('Escaneie para validar', pageWidth - 42, 174, { align: 'center' });
      }

      doc.setDrawColor(203, 213, 225);
      doc.line(118, 161, 178, 161);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(30, 41, 59);
      doc.text('Projeto de Extensão CodeStart', 148, 168, { align: 'center' });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text('Documento emitido digitalmente pelo sistema', 148, 174, { align: 'center' });

      doc.save(`certificado-codestart-${status.certificate_code}.pdf`);
      setFeedback('PDF do certificado gerado com sucesso.');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao gerar PDF do certificado.';
      setFeedback(message);
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div className="certificate-page">
      <section className="page-header page-header-actions no-print">
        <div>
          <span className="eyebrow">Certificado</span>
          <h1>Status de certificação</h1>
          <p>Conclua os requisitos para emitir, visualizar e imprimir seu certificado verificável.</p>
        </div>
        <Link className="btn btn-secondary" to="/dashboard">Voltar aos módulos</Link>
      </section>
      <div className="no-print">
        <LogicSpeechBubble message="Depois da emissão, você poderá imprimir o certificado ou salvar como PDF pelo navegador." />
      </div>

      {feedback && <div className={feedback.includes('sucesso') ? 'alert alert-success no-print' : 'alert alert-warning no-print'}>{feedback}</div>}

      <Card className="no-print">
        <h2>Checklist</h2>
        {isLoading && <p className="muted">Carregando status...</p>}
        {status && (
          <>
            <ul className="checklist status-checklist">
              <li className={status.completed_modules === status.total_modules ? 'checked' : ''}>
                {status.completed_modules === status.total_modules ? '☑' : '□'} Concluir os 8 módulos: {status.completed_modules}/{status.total_modules}
              </li>
              <li className={status.has_final_project ? 'checked' : ''}>
                {status.has_final_project ? '☑' : '□'} Concluir o projeto final
              </li>
              <li className={status.final_assessment_passed ? 'checked' : ''}>
                {status.final_assessment_passed ? '☑' : '□'} Obter 70% na avaliação final — melhor nota: {status.best_final_score}%
              </li>
              <li className={status.has_certificate ? 'checked' : ''}>
                {status.has_certificate ? '☑' : '□'} Certificado emitido
              </li>
            </ul>

            {status.has_certificate && status.certificate_code ? (
              <div className="certificate-panel">
                <h3>Certificado emitido</h3>
                <code className="certificate-code">{status.certificate_code}</code>
                <p className="muted">Carga horária: {status.workload_hours ?? 4} horas</p>
                <div className="button-row">
                  <button className="btn btn-success" onClick={handlePrint} type="button">Imprimir / salvar como PDF</button>
                  <button className="btn btn-primary" disabled={isDownloading} onClick={() => void handleDownloadPdf()} type="button">
                    {isDownloading ? 'Gerando PDF...' : 'Baixar PDF'}
                  </button>
                  {validationUrl && (
                    <a className="btn btn-secondary" href={validationUrl} target="_blank" rel="noreferrer">
                      Abrir validação pública
                    </a>
                  )}
                  <Link className="btn btn-secondary" to="/dashboard">Voltar aos módulos</Link>
                </div>
              </div>
            ) : status.can_issue_certificate ? (
              <div className="button-row">
                <button className="btn btn-success" disabled={isIssuing} onClick={handleIssueCertificate} type="button">
                  {isIssuing ? 'Emitindo...' : 'Emitir certificado'}
                </button>
                <Link className="btn btn-secondary" to="/dashboard">Voltar aos módulos</Link>
              </div>
            ) : (
              <div className="button-row">
                <button className="btn btn-disabled" disabled type="button">Certificado bloqueado</button>
                <Link className="btn btn-secondary" to="/dashboard">Voltar aos módulos</Link>
                {status.completed_modules < status.total_modules && <Link className="btn btn-secondary" to="/dashboard">Continuar módulos</Link>}
                {!status.has_final_project && <Link className="btn btn-secondary" to="/projeto-final">Fazer projeto final</Link>}
                {!status.final_assessment_passed && <Link className="btn btn-secondary" to="/avaliacao-final">Fazer avaliação final</Link>}
              </div>
            )}
          </>
        )}
      </Card>

      {status?.has_certificate && status.certificate_code && user && (
        <section className="certificate-preview-wrap">
          <div className="certificate-document" ref={certificateRef}>
            <div className="certificate-border">
              <div className="certificate-inner-border">
                <header className="certificate-document-header">
                  <div className="certificate-brand-mark">CS</div>
                  <div>
                    <strong>CodeStart</strong>
                    <span>Explorando o Mundo da Programação</span>
                  </div>
                </header>

                <div className="certificate-main-content">
                  <span className="certificate-kicker">Certificado de Conclusão</span>
                  <h2>Certificamos que</h2>
                  <h3>{user.fullName}</h3>
                  <p>
                    concluiu o curso <strong>{COURSE_NAME}</strong>, com carga horária de <strong>{status.workload_hours ?? 4} horas</strong>,
                    desenvolvendo fundamentos de lógica de programação, pensamento computacional, programação em blocos, código visual e projeto final.
                  </p>
                </div>

                <footer className="certificate-footer">
                  <div className="certificate-info-block">
                    <span>Data de emissão</span>
                    <strong>{formatDate(status.issued_at)}</strong>
                    <span>Código de validação</span>
                    <strong>{status.certificate_code}</strong>
                  </div>

                  <div className="certificate-signature">
                    <span />
                    <strong>Projeto de Extensão CodeStart</strong>
                    <small>Documento emitido digitalmente</small>
                  </div>

                  <div className="certificate-qr-block">
                    {qrCodeUrl ? <img src={qrCodeUrl} alt="QR Code de validação do certificado" /> : <div className="qr-placeholder">QR</div>}
                    <small>Escaneie para validar</small>
                  </div>
                </footer>
              </div>
            </div>
          </div>
          {validationUrl && <p className="certificate-validation-link no-print">Validação pública: {validationUrl}</p>}
        </section>
      )}
    </div>
  );
}
