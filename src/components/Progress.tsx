interface IProgressProps {
  currentQuestionIndex: number;
  points: number;
  totalPoints: number;
  questionCount: number;
  answer: number | null;
}

function Progress({
  currentQuestionIndex,
  points,
  totalPoints,
  questionCount,
  answer,
}: IProgressProps) {
  return (
    <header className="progress">
      <progress
        max={questionCount}
        value={currentQuestionIndex + Number(answer !== null)}
        // value={answer ? currentQuestionIndex + 1 : currentQuestionIndex}
      />
      <p>
        Question <strong>{currentQuestionIndex + 1}</strong>/{questionCount}
      </p>
      <p>
        <strong>{points}</strong>/{totalPoints}
      </p>
    </header>
  );
}

export default Progress;
