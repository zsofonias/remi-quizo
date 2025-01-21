import { Dispatch } from 'react';
import { IQuestion } from '../inerfaces/question.interface';
import QuestionOptions from './QuestionOptions';
import { ReducerActionType } from '../App';

interface IQuestionProps {
  question: IQuestion;
  answer: number | null;
  onOptionClick: Dispatch<ReducerActionType>;
}

function Question({ question, answer, onOptionClick }: IQuestionProps) {
  return (
    <div>
      <h4>{question.question}</h4>
      <QuestionOptions
        onClick={onOptionClick}
        question={question}
        answer={answer}
      />
    </div>
  );
}

export default Question;
