"use client";

type Todo = {
  id: string;
  title: string;
  contents: string;
  isDone: boolean;
};

import axios from "axios";
import { useEffect, useState } from "react";

const Page = () => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [doneList, setDoneList] = useState<Todo[]>([]);

  useEffect(() => {
    todoListHandler();
    doneListHandler();
  }, []);

  const onClickHandler = () => {
    axios.post("http://localhost:4000/todos", {
      id: String(new Date().getTime()),
      title,
      contents,
      isDone: false,
    });
  };

  const todoListHandler = async () => {
    const { data } = await axios.get("http://localhost:4000/todos");
    const result: Todo[] = data.filter((element: Todo) => {
      return element.isDone === false;
    });
    setTodoList(result);
  };

  const doneListHandler = async () => {
    const { data } = await axios.get("http://localhost:4000/todos");
    const result: Todo[] = data.filter((element: Todo) => {
      return element.isDone === true;
    });
    setDoneList(result);
  };

  const deleteHandler = async (id: string) => {
    await axios.delete(`http://localhost:4000/todos/${id}`);
  };

  const isDoneHandler = async (id: string) => {
    await axios.patch(`http://localhost:4000/todos/${id}`, { isDone: true });
  };

  const isNotDoneHandler = async (id: string) => {
    await axios.patch(`http://localhost:4000/todos/${id}`, { isDone: false });
  };

  return (
    <div>
      <div>
        제목 <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        내용 <input type="text" value={contents} onChange={(e) => setContents(e.target.value)} />
        <button onClick={onClickHandler}>추가하기</button>
      </div>
      <hr></hr>
      <div>
        working..🔥
        {todoList.map((todo: Todo) => {
          return (
            <div key={todo.id}>
              <h2>{todo.title}</h2>
              <p>{todo.contents}</p>
              <button onClick={() => deleteHandler(todo.id)}>삭제하기</button>
              <button onClick={() => isDoneHandler(todo.id)}>완료</button>
              <p>-------</p>
            </div>
          );
        })}
      </div>
      <hr></hr>
      <div>
        Done..!🎉
        {doneList.map((todo: Todo) => {
          return (
            <div key={todo.id}>
              <h2>{todo.title}</h2>
              <p>{todo.contents}</p>
              <button onClick={() => deleteHandler(todo.id)}>삭제하기</button>
              <button onClick={() => isNotDoneHandler(todo.id)}>취소</button>
              <p>-------</p>
            </div>
          );
        })}
      </div>
      <hr></hr>
    </div>
  );
};

export default Page;
