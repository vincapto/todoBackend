import style from './CheckBox.module.scss';
import { FormEventHandler } from 'react';

interface ICheckbox {
  title: string;
  onChange: FormEventHandler<HTMLInputElement>;
}

function CheckBox({ title, onChange }: ICheckbox) {
  return (
    <>
      <label>{title}</label>
      <input
        type="checkbox"
        checked={false}
        className={style.checkbox}
        title={title}
        onChange={onChange}
      />
    </>
  );
}

export default CheckBox;
