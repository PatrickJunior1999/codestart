interface LogicSpeechBubbleProps {
  message: string;
}

export function LogicSpeechBubble({ message }: LogicSpeechBubbleProps) {
  return (
    <div className="logic-bubble">
      <div className="logic-avatar" aria-hidden="true">🐱</div>
      <div>
        <strong>LOGIC</strong>
        <p>{message}</p>
      </div>
    </div>
  );
}
