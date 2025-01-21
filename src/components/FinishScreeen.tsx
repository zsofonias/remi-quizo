import { Dispatch } from 'react';
import { ReducerActionType } from '../App';

interface IFinishScreeenProps {
  points: number;
  totalPoints: number;
  highscore: number | null;
  onRestart: Dispatch<ReducerActionType>;
}
function FinishScreeen({
  points,
  totalPoints,
  highscore,
  onRestart,
}: IFinishScreeenProps) {
  const percentage = Math.ceil((points / totalPoints) * 100);
  return (
    <>
      <p className="result">
        Your score: <strong>{points}</strong> / {totalPoints}
        <br />
        You got {percentage}% of the questions
      </p>
      {highscore !== null && <p>Highscore: {highscore}</p>}
      <button
        onClick={() => onRestart({ type: 'restart' })}
        className="btn btn-ui"
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreeen;
