/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from "react";
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

  // Получаем мутации из todoApi
  const [createTodo, { error: createError }] = todoApi.useCreateTodoMutation();
  const [updateTodo, { error: updateError }] = todoApi.useUpdateTodoMutation();
  const [deleteTodo, { error: deleteError }] = todoApi.useDeleteTodoMutation();

  const handleCreate = async () => {
    const title = prompt("Введите название дела") || "";
    const completed = false;
    await createTodo({ title, completed } as ITodo);
  };

  const nandleRemove = (todo: ITodo) => {
    deleteTodo(todo);
  };
  const handleUpdate = (todo: ITodo) => {
    updateTodo(todo);
  };
  // Сортировка и поиск
  //===============================================================================================
  const [filter, setFilter] = useState<IFilter>({ sort: "", query: "" });
  const options: IOption[] = [
    { value: "id", name: "По номеру дела" },
    { value: "title", name: "По названию дела" },
    { value: "completed", name: "По статусу выполнения" },
  ];

  // Отсортированный массив:
  const sortedTodos = useMemo(() => {
    if (filter.sort && todos) {
      return [...todos].sort((a, b) => (a[filter.sort] > b[filter.sort] ? 1 : -1));
    }
    return todos;
  }, [filter.sort, todos]);

  // Отсортированный и отфильтрованный массив:
  const sortedAndSearchedTodos = useMemo(() => {
    if (sortedTodos) {
      return sortedTodos.filter((todo) => todo.title.toLowerCase().includes(filter.query));
    }
  }, [filter.query, sortedTodos]);

  // Сортировка и поиск
  //===============================================================================================

  return (
    <Container className="card mt-6">
      {sortedAndSearchedTodos && (
        <div className="containerButton">
          <Button variant="outline-success mb-4" onClick={handleCreate}>
            Добавить новое дело
          </Button>
        </div>
      )}

      <Row>
        <div>
          {isLoading && <h1> Идёт загрузка</h1>}

          {sortedAndSearchedTodos && (
            <>
              <h1 className="textCenter">Список дел пользователей из todoAPI</h1>

              <PaginationButtons page={page} pages={pages} countPage={countPage} setPage={setPage} />
              <SortFilter
                filter={filter}
                setFilter={setFilter}
                options={options}
                placeholder="Поиск по названию дела..."
              />
            </>
          )}

          <div>
            <>
              {error && (
                <h6>
                  Запусти команду в парралельном терминале:
                  <span className="colorRed"> json-server --watch db.json --port 5000</span>
                </h6>
              )}

              {createError && (
                <h1>
                  <> Произошла ошибка при создании. </>
                </h1>
              )}
              {deleteError && (
                <h1>
                  <> Произошла ошибка при удалении. </>
                </h1>
              )}
              {updateError && (
                <h1>
                  <> Произошла ошибка при обновлении. </>
                </h1>
              )}
            </>
          </div>

          <div className="post">
            {sortedAndSearchedTodos &&
              sortedAndSearchedTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} remove={nandleRemove} update={handleUpdate} />
              ))}
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default TodoApiPage;
