import style from './Button.module.scss';
import { FormEventHandler } from 'react';

interface IButtonTodo {
  onClick: FormEventHandler<HTMLButtonElement>;
  text: string;
}

function Button({ onClick, text }: IButtonTodo) {
  return (
    <button className={style.button} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
