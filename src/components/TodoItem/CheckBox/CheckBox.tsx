import style from './CheckBox.module.scss';
import { FormEventHandler } from 'react';

interface ICheckbox {
  onChange: FormEventHandler<HTMLInputElement>;
  completed: boolean;
}

function CheckBox({ onChange, completed }: ICheckbox) {
  return (
    <>
      <input
        type="checkbox"
        className={style.checkbox}
        title={'Toggle Todo Item'}
        defaultChecked={completed}
        onChange={onChange}
      />
    </>
  );
}

export default CheckBox;
