import Input from '../Input';
import style from './FormTodo.module.scss';
import SubmitButton from '../SubmitButton/SubmitButton';
import { ChangeEvent, FormEvent, FormEventHandler, useState } from 'react';
import { ITodoField } from '../../../model';

interface IFormTodo {
  onClick: FormEventHandler<HTMLButtonElement>;
  postTodo: (todoFields: ITodoField) => void;
}

function Form({ onClick, postTodo }: IFormTodo) {
  const [titleState, setTitleState] = useState('');
  return (
    <form className={style.form} action="">
      <Input
        title={'Todo title'}
        placeholder={'Enter Title'}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          console.log(event.target.value);
          setTitleState(event.target.value);
        }}
      />
      <SubmitButton
        title="Add Todo"
        onClick={(event) => {
          event.preventDefault();
          postTodo({
            title: titleState.length !== 0 ? titleState : 'Default Title',
            _id: 0,
            completed: false,
            date: new Date(Date.now()).toString(),
          });
        }}
      />
    </form>
  );
}

export default Form;
