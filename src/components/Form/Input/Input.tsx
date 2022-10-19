import style from './Input.module.scss';
import { ChangeEvent, FormEventHandler } from 'react';

interface IInput {
  title: string;
  onChange: FormEventHandler<HTMLInputElement> | undefined;
  placeholder: string;
}

function Input({ title, onChange, placeholder }: IInput) {
  const id = title.trim();
  return (
    <div className={style.inputWrapper}>
      <label className={style.title} htmlFor={id}>
        {title}
      </label>
      <input
        id={id}
        className={style.input}
        title={title}
        placeholder={placeholder}
        onChange={onChange}

        // onInput={onInput}
      />
    </div>
  );
}

export default Input;
