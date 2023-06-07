import React from "react";
import { albumApi } from "../services/AlbumService";
import { Container, Row, Button } from "react-bootstrap";
import AlbumItem from "../components/items/AlbumItem";
import { IAlbum } from "../models/types";

const AlbumApiPage = () => {
  const { data: albums, error, isLoading } = albumApi.useFetchAllAlbumsQuery(25);
  const [createAlbum, { error: createError }] = albumApi.useCreateAlbumMutation();
  const [updateAlbum, { error: updateError }] = albumApi.useUpdateAlbumMutation();
  const [deleteAlbum, { isLoading: deleteIsLoading }] = albumApi.useDeleteAlbumMutation();

  const handleCreate = async () => {
    const title = prompt("Введите название альбома") || "";
    await createAlbum({ title } as IAlbum);
  };
  const handleUpdate = (album: IAlbum) => {
    updateAlbum(album);
  };
  const handleRemove = (album: IAlbum) => {
    deleteAlbum(album);
  };

  return (
    <Container className="card mt-6">
      <Row>
        <div>
          <h3 className="textCenter">Список альбомов из albumAPI </h3>

          <div className="containerButton">
            <Button variant="outline-success" onClick={handleCreate}>
              Добавить новый альбом
            </Button>
          </div>

          <div>
            {isLoading && <h1>Идёт загрузка</h1>}
            {deleteIsLoading && <h1>Идёт удаление</h1>}
          </div>

          <div>
            {error && (
              <h1>
                <> Произошла ошибка при загрузке. </>
              </h1>
            )}

            {updateError && (
              <h1>
                <> Произошла ошибка при обновлении. </>
              </h1>
            )}

            {createError && (
              <h1>
                <> Произошла ошибка при создании. </>
              </h1>
            )}
          </div>

          {albums &&
            albums.map((album) => (
              <AlbumItem key={album.id} album={album} update={handleUpdate} remove={handleRemove} />
            ))}
        </div>
      </Row>
    </Container>
  );
};

export default AlbumApiPage;
