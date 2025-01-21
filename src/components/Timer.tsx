import { Dispatch, useEffect } from 'react';
import { ReducerActionType } from '../App';

interface ITimerProps {
  quizTime: number;
  onTick: Dispatch<ReducerActionType>;
}

function Timer({ quizTime, onTick }: ITimerProps) {
  const mins = Math.floor(quizTime / 60);
  const secs = quizTime % 60;

  useEffect(() => {
    const timer = setInterval(() => {
      onTick({ type: 'tick' });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTick]);

  return (
    <div className="timer">
      {mins < 10 ? '0' : ''}
      {mins}:{secs < 10 ? '0' : ''}
      {secs}
    </div>
  );
}
export default Timer;
