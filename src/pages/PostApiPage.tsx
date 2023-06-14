/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import PaginationButtons from "../components/ui/PaginationButtons";
import MySelect from "../components/ui/select/MySelect";
import { IOption, IPost } from "../models/types";
import PostItem from "../components/items/PostItem";
import { postAPI } from "../services/PostService";

const PostApiPage = () => {
  // PAGINATION
  // //================================================================================
  const [limit, setLimit] = useState<number | string>(10);
  const [page, setPage] = useState<number>(1);

  const { data } = postAPI.useFetchAllPostQuery(limit);
  let totalCount = 0;

  if (data) {
    totalCount = data.length;
  }
  // console.log(data?.length);

  let countPage = Math.ceil(totalCount / Number(limit));
  // console.log(countPage);

  const pages: number[] = [];
  for (let i = 0; i < countPage; i++) {
    pages.push(i + 1);
  }

  // // PAGINATION
  // //================================================================================
  const { data: posts, error, isLoading } = postAPI.useGetPostByPageQuery(page);

  const [createPost, { error: errorCreate }] = postAPI.useCreatePostMutation();
  const [updatePost, { error: errorUpdate }] = postAPI.useUpdatePostMutation();
  const [deletePost, { error: errorDelete }] = postAPI.useDeletePostsMutation();

  const handleCreate = async () => {
    const title = prompt("Введите название поста") || "";
    const body = prompt("Ведите текст поста") || "";

    await createPost({ title, body } as IPost);
  };

  const handleUpdate = (post: IPost) => {
    updatePost(post);
  };
  const handleRemove = (post: IPost) => {
    deletePost(post);
  };

  //==============================
  // Сортировка
  const options: IOption[] = [
    { value: "id", name: "По номеру поста" },
    { value: "title", name: "По назаванию поста" },
    { value: "body", name: "По содержимому поста" },
  ];
  const [selectedSort, setSelectedSort] = useState<string>("");

  function getSortedPosts() {
    if (selectedSort && posts) {
      return [...posts].sort((a, b) => (a[selectedSort] > b[selectedSort] ? 1 : -1));
    }
    return posts;
  }

  const sortedPosts = getSortedPosts();

  const sortPosts = (sort: string) => {
    setSelectedSort(sort);
  };

  // Сортировка
  //==============================

  return (
    <Container className="card mt-6">
      <Row>
        {posts && (
          <div>
            <h1 className="textCenter">Список постов из postAPI</h1>

            <div className="mt-1 mb-4">
              <div className="textCenter">
                <Button variant="outline-success" onClick={handleCreate}>
                  Добавить нового пользователя
                </Button>
              </div>

              <MySelect
                defaultValue="Сортировка"
                disabled={true}
                options={options}
                value={selectedSort}
                onChangeValue={sortPosts}
              />
            </div>
          </div>
        )}

        <PaginationButtons countPage={countPage} page={page} pages={pages} setPage={setPage} />

        <div>{isLoading && <h1> Идёт загрузка </h1>}</div>

        <div>
          {error && (
            <h6>
              Запусти команду в парралельном терминале:
              <span className="colorRed"> json-server --watch db.json --port 5000</span>
            </h6>
          )}

          {errorCreate && <h6>Возникла ошибка при создании нового пользователя</h6>}
          {errorUpdate && <h6>Возникла ошибка при обновлении данных пользователя</h6>}
          {errorDelete && <h6>Возникла ошибка при удалении пользователя</h6>}
        </div>

        {sortedPosts &&
          sortedPosts.map((post) => <PostItem key={post.id} post={post} remove={handleRemove} update={handleUpdate} />)}
      </Row>
    </Container>
  );
};

export default PostApiPage;
