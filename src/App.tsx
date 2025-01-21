import { useEffect, useReducer } from 'react';

import Header from './components/Header';
import Main from './components/Main';
import StartScreen from './components/StartScreen';
import Error from './components/Error';
import Loader from './components/Loader';
import Question from './components/Question';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import FinishScreeen from './components/FinishScreeen';
import Footer from './components/Footer';
import Timer from './components/Timer';

import { IQuestion } from './inerfaces/question.interface';

const SECS_PER_QUESTIONS = 20;

enum StateStatus {
  LOADING = 'loading',
  READY = 'ready',
  ACTIVE = 'active',
  FINISHED = 'finished',
  ERROR = 'error',
}

interface IState {
  questions: IQuestion[];
  currentQuestionIndex: number;
  status: StateStatus;
  answer: number | null;
  points: number;
  highscore: number;
  quizTime: number | null;
}

const initialState: IState = {
  questions: [],
  currentQuestionIndex: 0,
  status: StateStatus.LOADING,
  answer: null,
  points: 0,
  highscore: 0,
  quizTime: null,
};

export type ReducerActionType =
  | { type: 'data-received'; payload: IQuestion[] }
  | {
      type: 'data-error';
    }
  | {
      type: 'start';
    }
  | {
      type: 'set-answer';
      payload: number;
    }
  | {
      type: 'set-next';
    }
  | {
      type: 'restart';
    }
  | {
      type: 'tick';
    };

function reducer(state: IState, action: ReducerActionType): IState {
  switch (action.type) {
    case 'data-received':
      return {
        ...state,
        questions: action.payload,
        status: StateStatus.READY,
        quizTime: action.payload.length * SECS_PER_QUESTIONS,
      };
    case 'data-error':
      return { ...state, status: StateStatus.ERROR };
    case 'start':
      return {
        ...state,
        status: StateStatus.ACTIVE,
      };
    case 'set-answer':
      const question = state.questions[state.currentQuestionIndex];

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case 'set-next':
      const currentQuestionIndex = state.currentQuestionIndex + 1;
      const isFinished = currentQuestionIndex === state.questions.length;

      const highscore =
        state.points > Number(state.highscore) && isFinished
          ? state.points
          : state.highscore;

      return {
        ...state,
        currentQuestionIndex,
        status: isFinished ? StateStatus.FINISHED : state.status,
        highscore,
        answer: null,
      };

    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        status: StateStatus.READY,
        highscore: state.highscore,
      };

    case 'tick':
      if (state.quizTime === null) return state;
      const quizTime = state.quizTime - 1;
      const isTimeout = quizTime <= 0;
      const hscore =
        isTimeout && state.points > state.highscore
          ? state.points
          : state.highscore;

      return {
        ...state,
        quizTime,
        highscore: hscore,
        status: isTimeout ? StateStatus.FINISHED : state.status,
      };

    default:
      return state;
    // throw new Error('Action unknown');
  }
}

function App() {
  const [state, dispatch] = useReducer<
    (state: IState, action: ReducerActionType) => IState
  >(reducer, initialState);

  const {
    questions,
    status,
    currentQuestionIndex,
    answer,
    points,
    highscore,
    quizTime,
  } = state;
  const questionCount = questions.length;
  const totalPoints = questions.reduce(
    (acc: number, q) => (acc += q.points),
    0
  );

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then((response) => response.json())
      .then((data: IQuestion[]) =>
        dispatch({ type: 'data-received', payload: data })
      )
      .catch((err) => {
        console.log(err);
        dispatch({
          type: 'data-error',
        });
      });
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen onStart={dispatch} questionsCount={questionCount} />
        )}
        {status === 'active' && (
          <>
            <Progress
              currentQuestionIndex={currentQuestionIndex}
              questionCount={questionCount}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              onOptionClick={dispatch}
              answer={answer}
              question={questions[currentQuestionIndex]}
            />
            <Footer>
              <Timer quizTime={quizTime as number} onTick={dispatch} />
              <NextButton answer={answer} onClick={dispatch} />
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <FinishScreeen
            onRestart={dispatch}
            points={points}
            highscore={highscore}
            totalPoints={totalPoints}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
