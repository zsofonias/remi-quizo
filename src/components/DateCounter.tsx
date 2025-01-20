import { ChangeEvent, useReducer, useState } from 'react';

// type ReducerActionAlt = {
//   type: string;
//   payload?: number;
// };

// function reducer(state: number, action: ReducerActionAlt) {
//   switch (action.type) {
//     case 'inc':
//       return state + (action.payload ?? 1);
//     case 'dec':
//       return state - (action.payload ?? 1);
//     case 'setCount':
//       return action.payload;
//     default:
//       return state;
//   }
// }

type ReducerAction =
  | { type: 'inc'; payload?: number }
  | { type: 'dec'; payload?: number }
  | { type: 'setCount'; payload: number }
  | { type: 'setStep'; payload: number }
  | { type: 'reset' };

// function reducer(state: number, action: ReducerAction) {
//   // switch (action.type) {
//   //   case 'inc':
//   //     return (state += (action.payload ?? 1));
//   //   case 'dec':
//   //     return (state -= (action.payload ?? 1));
//   //   case 'setCount':
//   //     return action.payload;
//   //   default:
//   //     return state;
//   // }
//   if (action.type === 'inc') return (state += (action.payload ?? 1));
//   if (action.type === 'dec') return (state -= (action.payload ?? 1));
//   if (action.type === 'setCount') return action.payload;
//   return state;
// }

interface IState {
  count: number;
  step: number;
}

const initialState: IState = { count: 0, step: 1 };

function reducer(state: IState, action: ReducerAction) {
  switch (action.type) {
    case 'dec':
      return { ...state, count: state.count - state.step };
    case 'inc':
      return { ...state, count: state.count + state.step };
    case 'setCount':
      return { ...state, count: action.payload };
    case 'setStep':
      return { ...state, step: action.payload };
    case 'reset':
      return initialState;
    default:
      return state;
    // throw new Error('Unknown');
  }
}

function DateCounter() {
  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);
  // const [count, dispatch] = useReducer(reducer, 0);

  const [state, dispatch] = useReducer<
    (state: IState, action: ReducerAction) => IState
  >(reducer, initialState);
  const { count, step } = state;

  const date = new Date();
  // This mutates the date object.
  // date.setDate(date.getDate() + count);
  // Create a new Date object with the updated date
  const updatedDate = new Date(new Date().setDate(date.getDate() + count));

  const dec = function () {
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
    dispatch({ type: 'dec' });
  };

  const inc = function () {
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
    dispatch({ type: 'inc' });
  };

  const defineCount = function (e: ChangeEvent<HTMLInputElement>) {
    // setCount(Number(e.target.value));
    const newCount = Number(e.target.value);
    if (!isNaN(newCount)) {
      dispatch({ type: 'setCount', payload: newCount });
    }
  };

  const defineStep = function (e: ChangeEvent<HTMLInputElement>) {
    // setStep(Number(e.target.value));
    dispatch({ type: 'setStep', payload: Number(e.target.value) });
  };

  const reset = function () {
    // setCount(0);
    // setStep(1);
    // dispatch({ type: 'setCount', payload: 0 });
    dispatch({ type: 'reset' });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{updatedDate.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
