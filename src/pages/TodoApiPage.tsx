/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { todoApi } from "../services/TodoService";
import TodoItem from "../components/items/TodoItem";
import { IFilter, ITodo, IOption } from "../models/types";
import PaginationButtons from "../components/ui/PaginationButtons";
import SortFilter from "../components/SortFilter";

const TodoApiPage = () => {
  const { data: totalCountElem } = todoApi.useGetAllTodosQuery();
  let totalCount = 0;

  if (totalCountElem) {
    totalCount = totalCountElem.length;
    console.log(totalCountElem.length);
  }

  // Получаем данные по параметрам, установленным в postPaginationAPI в эндпоинте:
  // getPostsPagination: query: (page: number = 1, limit: number = 10)
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  // Вычисляем количество страниц
  let countPage: number = Math.ceil(totalCount / limit);
  // Создаём массив pages[], состоящий из нумерации страниц, типа const pages = [1, 2, 3, 4, 5];
  // Этот массив нужен нам для пагинации
  const pages: number[] = [];
  for (let i = 0; i < countPage; i++) {
    pages.push(i + 1);
  }

  // Получаем список дел постранично.
  const { data: todos, error, isLoading } = todoApi.useGetTodoPageByPageQuery(page);

  const nandleRemove = () => {};
  const handleUpdate = () => {};

  return (
    <Container className="card mt-6">
      <div className="containerButton"></div>
      <Row>
        <div>
          <h1 className="textCenter">Список дел пользователей из todoAPI</h1>
          {isLoading && <h1> Идёт загрузка</h1>}

          <div>
            <>
              {error && (
                <h1>
                  <> Произошла ошибка при загрузке. </>
                </h1>
              )}
            </>
          </div>

          <div className="post">
            {todos &&
              todos.map((todo) => <TodoItem key={todo.id} todo={todo} remove={nandleRemove} update={handleUpdate} />)}
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default TodoApiPage;
