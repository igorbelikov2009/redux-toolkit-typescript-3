/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { photoAPI } from "../services/PhotoService";
import { IPhoto, IOption } from "../models/types";
import PhotoItem from "../components/items/PhotoItem";
import MySelect from "../components/ui/select/MySelect";
import PaginationButtons from "../components/ui/PaginationButtons";

const PhotoApiPage = () => {
  // Получаем массив всех фоток с сервера для определения общего количества фоток
  const { data: totalCountElem } = photoAPI.useFetchAllPhotoQuery();
  let totalCount = 0;
  if (totalCountElem) {
    totalCount = totalCountElem.length;
  }

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const countPage: number = Math.ceil(totalCount / limit);
  const pages: number[] = [];
  for (let i = 0; i < countPage; i++) {
    pages.push(i + 1);
  }
  // Получаем массив фоток с сервера постранично
  const { data: photos, isError, isLoading } = photoAPI.useGetAllPhotoByPageQuery(page);

  // Получаем мутации
  const [createPhoto, { error: createError }] = photoAPI.useCreatePhotoMutation();
  const [updatePhoto, { error: updateError }] = photoAPI.useUpdatePhotoMutation();
  const [deletePhoto, { error: deleteError }] = photoAPI.useDeletePhotoMutation();

  const handleCreate = async () => {
    const title = prompt("Введите название фото") || "";
    const url = prompt("Введите url фото") || "";
    const thumbnailUrl = prompt("Введите thumbnailUrl фото") || "";
    await createPhoto({ title, url, thumbnailUrl } as IPhoto);
  };
  const handleUpdate = (photo: IPhoto) => {
    updatePhoto(photo);
  };
  const handleRemove = (photo: IPhoto) => {
    deletePhoto(photo);
  };

  //==============================
  // Сортировка
  const options: IOption[] = [
    { value: "id", name: "По номеру фото" },
    { value: "title", name: "По названию фото" },
    { value: "url", name: "По URL фото" },
    { value: "thumbnailUrl", name: "По URL эскиза" },
  ];

  const [selectedSort, setSelectedSort] = useState<string>("");

  function getSortedPhotos() {
    if (selectedSort && photos) {
      // return [...photos].sort((a, b) => String(a[selectedSort]).localeCompare(String(b[selectedSort])));
      return [...photos].sort((a, b) => (a[selectedSort] > b[selectedSort] ? 1 : -1));
    }
    return photos;
  }
  const sortedPhotos = getSortedPhotos();

  // Определяем выбранный в selecte метод сортировки фоток (sortPhotos) через в обработчик
  // onChangeValue={sortPhotos} и записываем его в состояние setSelectedSort(sort);
  const sortPhotos = (sort: string) => {
    setSelectedSort(sort);
  };

  // Сортировка
  //==============================

  return (
    <Container className="card mt-6">
      <Row>
        {photos && (
          <>
            <div>
              <h3 className="textCenter">Список фоток из photoAPI</h3>
            </div>

            <div className="mt-1 mb-4">
              <Button variant="outline-success" className="mt-2" onClick={handleCreate}>
                Добавить новое фото
              </Button>

              <MySelect
                defaultValue="Сортировка"
                disabled={true}
                options={options}
                value={selectedSort}
                onChangeValue={sortPhotos}
              />
            </div>
          </>
        )}

        <PaginationButtons countPage={countPage} page={page} pages={pages} setPage={setPage} />

        <div> {isLoading && <h1> Идёт загрузка</h1>} </div>

        <div>
          <>
            {isError && (
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
          {photos &&
            photos.map((photo) => (
              <PhotoItem key={photo.id} photo={photo} update={handleUpdate} remove={handleRemove} />
            ))}
        </div>
      </Row>
    </Container>
  );
};

export default PhotoApiPage;
