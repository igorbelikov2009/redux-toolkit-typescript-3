import React, { useState, useMemo } from "react";
import { Container, Row, Button, Form } from "react-bootstrap";
import InputSearch from "../components/ui/inputs/InputSearch";
import MySelect from "../components/ui/select/MySelect";
import { IComment, IOption } from "../models/types";
import CommentItem from "../components/items/CommentItem";
import { commentApi } from "../services/CommentService";

const CommentApiPage = () => {
  const [limit, setLimit] = useState<number | string>(100);

  const { data: comments, error, isLoading } = commentApi.useFetchAllCommentsQuery(limit);
  const [createComment, { error: createError, isLoading: createIsLoading }] = commentApi.useCreateCommentMutation();
  const [updateComment, { isLoading: updateIsLoading }] = commentApi.useUpdateCommentMutation();
  const [deleteComment, { error: deleteError }] = commentApi.useDeleteCommentMutation();

  const handleCreate = async () => {
    const postId = Number(prompt("Введите номер комментируемого вами поста"));
    const email = prompt("Введите свой email");
    const name = prompt("Введите название комментария");
    const body = prompt("Введите текст комментария");
    await createComment({ postId: postId, email: email, name: name, body: body } as unknown as IComment);
  };

  const handleUpdate = (comment: IComment) => {
    updateComment(comment);
  };

  const handleRemove = (comment: IComment) => {
    deleteComment(comment);
  };

  //==============================
  // Сортировка, поиск
  const opions: IOption[] = [
    { value: "id", name: "По номеру комментария" },
    { value: "postId", name: "По номеру комментируего поста" },
    { value: "email", name: "По email пользователя" },
    { value: "name", name: "По названию комментария" },
    { value: "body", name: "По тексту комментария" },
  ];

  const [selectedSort, setSelectedSort] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // получаем отсортированный массив комментов
  const sortedComments = useMemo(() => {
    if (selectedSort && comments) {
      return [...comments].sort((a, b) => (a[selectedSort] > b[selectedSort] ? 1 : -1));
    }
    return comments;
  }, [selectedSort, comments]);

  // Отсортированный и отфильтрованный массив:
  const sortedAndSearchedComments = useMemo(() => {
    if (sortedComments) {
      return sortedComments.filter((comment) => comment.name?.toLowerCase().includes(searchQuery));
    }
  }, [searchQuery, sortedComments]);

  const sortComments = (sort: any) => {
    setSelectedSort(sort);
    // console.log(sort);
    // для MySelect, onChangeValue={sortComments}
  };
  // Сортировка, поиск
  //==============================

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(e.target.value);
  };

  return (
    <Container className="card mt-6">
      <Row>
        <div>
          {sortedAndSearchedComments && (
            <>
              <h3 className="textCenter">Список комментов от пользователей из commentAPI</h3>

              <div className="containerButton">
                <Form className="card ml-2">
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <h6 className="mb-4">Сколько комментов показать на странице?</h6>

                    <Form.Select value={limit} onChange={handleSelect} aria-label="Default select example">
                      <option value="">Все</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                    </Form.Select>
                  </Form.Group>

                  <Button variant="outline-success" onClick={handleCreate}>
                    Добавить новый комментарий
                  </Button>
                </Form>

                <div className="card ml-2">
                  <h6> Компоненты поиска и выбора алгоритма сортировки раздельны друг от друга...</h6>
                  <div className="mb-3">
                    <InputSearch
                      placeholder="Поиск по названию комментария"
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                    />
                  </div>

                  <MySelect
                    defaultValue="Сортировка"
                    disabled={true}
                    options={opions}
                    value={selectedSort}
                    onChangeValue={sortComments}
                  />
                </div>
              </div>
            </>
          )}

          <div>
            {isLoading && <h1>Идёт загрузка</h1>}
            {createIsLoading && <h1>Идёт создание комментария</h1>}
            {updateIsLoading && <h1>Идёт обновление комментария</h1>}
          </div>

          <div>
            <>
              {error && (
                <h6>
                  Запусти команду в парралельном терминале:
                  <span className="colorRed"> json-server --watch db.json --port 5000</span>
                </h6>
              )}
            </>

            <>
              {deleteError && (
                <h1>
                  <> Произошла ошибка при удалении. </>
                </h1>
              )}
            </>

            <>
              {createError && (
                <h1>
                  <> Произошла ошибка при создании нового комментария. </>
                </h1>
              )}
            </>
          </div>

          {sortedAndSearchedComments &&
            sortedAndSearchedComments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} update={handleUpdate} remove={handleRemove} />
            ))}
        </div>
      </Row>
    </Container>
  );
};

export default CommentApiPage;
