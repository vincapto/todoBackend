import style from './TodoItem.module.scss';
import { FormEventHandler } from 'react';
import CheckBox from './CheckBox/CheckBox';
import Button from './Button/Button';
import { motion } from 'framer-motion';

interface ITodoItem {
  title: string;
  completed: boolean;
  onChange: FormEventHandler<HTMLInputElement>;
  onDelete: FormEventHandler<HTMLButtonElement>;
  onUpdate: FormEventHandler<HTMLButtonElement>;
  date: string;
}

function TodoItem({
  title,
  completed,
  onDelete,
  onUpdate,
  onChange,
  date,
}: ITodoItem) {
  const dateItem = new Date(date);
  const dateFormat = `${dateItem.getFullYear()}/${dateItem.getMonth()}/${dateItem.getDay()} ${dateItem.getHours()}:${dateItem.getMinutes()}:${dateItem.getSeconds()}`;

  return (
    <motion.div
      layout
      transition={{ duration: 0.15 }}
      className={style.todoItem}
    >
      <div className={style.todoItemContent}>
        <div className={style.todoItemHead}>
          <h4 className={style.date}>{dateFormat}</h4>
          <h3 className={style.title}>{title}</h3>
        </div>
        <CheckBox completed={completed} onChange={onChange} />
      </div>
      <div className={style.buttonWrapper}>
        <Button text={'Delete'} onClick={onDelete} />
        {/* <Button text={'Update'} onClick={onUpdate} /> */}
      </div>
    </motion.div>
  );
}

export default TodoItem;
