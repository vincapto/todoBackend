import TodoItem from '../../components/TodoItem';
import style from './todo.module.scss';
import { useState, useEffect } from 'react';
import FormTodo from '../../components/Form/FormTodo';
import { deleteData, getData, postData, updateData } from '../../serverRequest';
import { ITodoField } from '../../model';
import axios from 'axios';

interface ITodoProps {
  todoList: ITodoField[];
}

async function postTodo(todoFields: ITodoField) {
  console.log(todoFields);
  const postStatus = await postData('todo_page/todo', todoFields);
  return { id: postStatus.data, title: todoFields.title };
}

async function deleteTodo(_id: number) {
  console.log('DELETE ID', _id);
  const postStatus = await deleteData('todo_page/todo', _id);
  console.log(postStatus);
}

async function updateTodo(fields: any) {
  console.log('UPDATE FIELDS', fields);
  const updateStatus = await updateData('todo_page/todo', fields);
}

function Todo(props: any) {
  const todoList: any = [];
  const [todoListState, setTodoList] = useState<ITodoField[]>(todoList);
  // console.log('PROPS', props);

  return (
    <>
      <h1 className={style.todoListTitle}>Todo List</h1>
      <div className={style.todoList}>
        <FormTodo
          postTodo={async (todoFields: ITodoField) => {
            const addItem = await postTodo(todoFields);
            if (addItem.id)
              setTodoList((listState: ITodoField[]) => {
                const field = {
                  _id: addItem.id,
                  title: addItem.title,
                  completed: false,
                  date: new Date(Date.now()).toString(),
                };
                console.log(field);
                return [field, ...listState];
              });
          }}
          onClick={() => {}}
        />
        {todoList ? (
          todoListState.map((item) => {
            return (
              <TodoItem
                key={item._id}
                title={`${item.title} ${item._id}`}
                date={item.date || Date.now().toString()}
                completed={item.completed}
                onChange={(event: any) => {
                  console.log(event.target.value);
                  updateTodo({
                    _id: item._id,
                    completed: event.target.checked,
                  });
                }}
                onDelete={() => {
                  deleteTodo(item._id);
                  setTodoList((list: ITodoField[]) => {
                    return list.filter(
                      (filterItem) => filterItem._id !== item._id
                    );
                  });
                }}
                onUpdate={() => {}}
              />
            );
          })
        ) : (
          <h1>Todo List is empty</h1>
        )}
      </div>
    </>
  );
}

export const getServerSideProps = async (ctx: any) => {
  // console.log(ctx);
  const myCookie = ctx.req?.cookies || '';
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }
  // console.log('GETTING SERVER PROPS');

  const res = await axios.get('http://localhost:3000/api/todo');
  // console.log('TODO', res);
  return {
    props: {
      todoList: res.data,
    },
  };
};

// Todo.getInitialProps = async () => {
//   // const todoList = await getData('todo_page/todo', { date: 1 });
//   const res = await axios.get('http://localhost:3000/api/todo');
//   return { todoList: res.data };
// };

export default Todo;
