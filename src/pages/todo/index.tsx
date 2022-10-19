import TodoItem from '../../components/TodoItem';
import style from './todo.module.scss';
import { useState, useEffect } from 'react';
import FormTodo from '../../components/Form/FormTodo';
import { deleteData, getData, postData, updateData } from '../../serverRequest';
import { ITodoField } from '../../model';
import axios from 'axios';
import { Router, useRouter } from 'next/router';

const urlPath = 'http://localhost:3000/api/todo';

interface ITodoProps {
  todoList: ITodoField[];
}

export default function Todo({ todoList, elementCount }: any) {
  console.log('RENDERED');
  const [todoListState, setTodoList] = useState<ITodoField[]>([]);
  const [filterProps, setFilterProps] = useState({ completed: [] });
  const [sortProps, setSortProps] = useState({
    count: 5,
    sort: 'titleasc',
    page: 0,
    filter: null,
  });
  const [currentPage, setCurrentPage] = useState({
    current: 0,
    max: Math.floor(elementCount / sortProps.count),
    elementCount: elementCount,
  });
  const router = useRouter();

  function pushQuery() {
    const queryProps = Object.entries(sortProps).reduce((acc, item) => {
      console.log(acc);
      if (item[1] !== null) return { ...acc, [item[0]]: item[1] };
      else return acc;
    }, []);

    console.log('REDUCE', queryProps);
    router.push({
      pathname: '/todo',
      query: { data: JSON.stringify(queryProps) } as any,
    });
  }

  function getPageCount() {
    return Math.floor(elementCount / sortProps.count);
  }

  const pageClickHandler = (pageNumber: number) => {
    if (pageNumber !== sortProps.page) {
      setCurrentPage((value) => {
        return { ...value, current: pageNumber };
      });
      setSortProps((value) => {
        return { ...value, page: pageNumber };
      });
    }
  };

  const pageClickHandlerForward = () => {
    console.log('CLICK', currentPage.max);
    if (currentPage.current < currentPage.max) {
      setCurrentPage((value) => {
        return { ...value, current: value.current + 1 };
      });
      setSortProps((value) => {
        return { ...value, page: value.page + 1 };
      });
    }
  };

  const pageClickHandlerBack = () => {
    if (currentPage.current > 0) {
      setCurrentPage((value) => {
        return { ...value, current: value.current - 1 };
      });
      setSortProps((value) => {
        return { ...value, page: value.page - 1 };
      });
    }
  };

  const PageItem = ({ pageNumber, onClick }: any) => {
    return (
      <div
        onClick={() => {
          console.log('click');
          onClick(pageNumber);
        }}
        style={
          currentPage.current === pageNumber ? { backgroundColor: 'red' } : {}
        }
        className={style.paginationItem}
      >
        {pageNumber}
      </div>
    );
  };

  function GetPagination({ elementCount }: any) {
    // const num = 5;
    const num = Math.ceil(elementCount / sortProps.count);
    console.log('PAGE COUNT', num);

    return (
      <div className={style.paginationWrapper}>
        <PageItem key={'<'} onClick={pageClickHandlerBack} pageNumber={'<'} />
        {new Array(num).fill(0).map((_, key) => {
          return (
            <PageItem key={key} onClick={pageClickHandler} pageNumber={key} />
          );
        })}
        <PageItem
          key={'>'}
          onClick={pageClickHandlerForward}
          pageNumber={'>'}
        />
      </div>
    );
  }

  useEffect(() => {
    setSortProps((value) => {
      const filter = filterProps.completed.length !== 0 ? filterProps : {};
      return { ...value, filter };
    });
  }, [filterProps]);

  useEffect(() => {
    pushQuery();
  }, [sortProps]);

  useEffect(() => {
    console.log('ELEMENT COUTN CHANGEd', elementCount);
    setCurrentPage((value) => {
      return { ...value, elementCount: elementCount, max: getPageCount() };
    });
  }, [elementCount]);

  useEffect(() => {
    setTodoList(todoList);
  }, [todoList]);

  return (
    <>
      <h1 className={style.todoListTitle}>Todo List</h1>
      <select
        onChange={(event) => {
          console.log(event.target.value);
          const sort = event.target.value;
          if (sort !== sortProps.sort)
            setSortProps((value) => {
              return { ...value, sort };
            });
        }}
        title="Sort"
        name="sortBy"
      >
        <option value={`titleasc`}>Title asc</option>
        <option value={`titledesc`}>Title dec</option>
        <option value={`dateasc`}>Date asc</option>
        <option value={`datedesc`}>Date desc</option>
      </select>
      <div className={style.filterWrapper}>
        <label htmlFor="">
          Checked
          <input
            onChange={(event) => {
              console.log('COMPLETED ARR ++++', event.target.checked);

              setFilterProps((value: any) => {
                const arr = event.target.checked
                  ? [...value.completed, true]
                  : value.completed.filter((a) => a !== true);
                return { completed: arr };
              });
            }}
            title="checked"
            type="checkbox"
          />
        </label>
        <label htmlFor="">
          Unchecked
          <input
            onChange={(event) => {
              setFilterProps((value: any) => {
                const arr = event.target.checked
                  ? [...value.completed, false]
                  : value.completed.filter((a) => a !== false);
                return { completed: arr };
              });
            }}
            title="checked"
            type="checkbox"
          />
        </label>
      </div>
      <select
        onChange={(event) => {
          console.log(event.target.value);
          const count = ~~event.target.value;
          if (count !== sortProps.count)
            setSortProps((value) => {
              return { ...value, count };
            });
        }}
        title="Elements per page"
        name="perPage"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </select>
      <div className={style.todoList}>
        <FormTodo
          postTodo={async (todoFields: ITodoField) => {
            const addItem = await postTodo(todoFields);
            if (addItem._id)
              setTodoList((listState: ITodoField[]) => {
                const field = {
                  _id: addItem._id,
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
                title={`${item.title}`}
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
      <GetPagination elementCount={currentPage.elementCount}></GetPagination>
    </>
  );
}

async function postTodo(todoFields: ITodoField) {
  console.log('POST METHOD', todoFields);
  const postData = await axios.post(urlPath, todoFields);
  return postData.data;
}

async function deleteTodo(_id: number) {
  console.log('DELETE METHOD', _id);
  const postData = await axios.delete(urlPath, {
    data: { _id },
  });
  console.log(postData);
}

async function updateTodo(fields: any) {
  console.log('UPDATE METHOD', fields);
  const postData = await axios.put(urlPath, fields);
  console.log(postData);
}

export const getServerSideProps = async (ctx: any) => {
  console.log('query', ctx.query);
  const query = ctx.query;
  const res = await axios.get('http://localhost:3000/api/todo', {
    params: ctx.query,
  });
  console.log('RECIEVED DATA', res.data);
  return {
    props: {
      todoList: res.data.list,
      elementCount: res.data.count,
    },
  };
};
