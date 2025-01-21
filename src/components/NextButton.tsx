import { Dispatch } from 'react';
import { ReducerActionType } from '../App';

interface NextButtonProps {
  answer: number | null;
  onClick: Dispatch<ReducerActionType>;
}

function NextButton({ answer, onClick }: NextButtonProps) {
  if (answer == null) return '';
  return (
    <button
      onClick={() => onClick({ type: 'set-next' })}
      className="btn btn-ui"
    >
      Next
    </button>
  );
}

export default NextButton;
