import { Dispatch } from 'react';
import { ReducerActionType } from '../App';

interface IStartScreenProps {
  questionsCount: number;
  onStart: Dispatch<ReducerActionType>;
}

function StartScreen({ questionsCount, onStart }: IStartScreenProps) {
  return (
    <div className="start">
      <h2>Welcome to Quizo</h2>
      <h3>{questionsCount} questions to test your knowledge</h3>
      <button onClick={() => onStart({ type: 'start' })} className="btn btn-ui">
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
