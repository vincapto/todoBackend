import style from './SubmitButton.module.scss';
import { FormEventHandler } from 'react';

interface ISubmitButton {
  title: string;
  onClick: FormEventHandler<HTMLButtonElement>;
}

function SubmitButton({ title, onClick }: ISubmitButton) {
  return (
    <>
      <button className={style.submitButton} type="submit" onClick={onClick}>
        {title}
      </button>
    </>
  );
}

export default SubmitButton;
