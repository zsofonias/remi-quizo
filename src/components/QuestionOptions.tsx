import { Dispatch } from 'react';
import { IQuestion } from '../inerfaces/question.interface';
import { ReducerActionType } from '../App';

interface IQuestionOptionsProps {
  question: IQuestion;
  answer: number | null;
  onClick: Dispatch<ReducerActionType>;
}

function QuestionOptions({ question, answer, onClick }: IQuestionOptionsProps) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, idx) => (
        <button
          onClick={() => onClick({ type: 'set-answer', payload: idx })}
          key={option}
          disabled={answer !== null}
          className={`btn btn-option ${idx === answer ? 'answer' : ''} ${
            hasAnswered
              ? idx === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default QuestionOptions;
