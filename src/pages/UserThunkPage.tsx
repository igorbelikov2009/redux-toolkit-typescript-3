import { FC, useEffect } from "react";
import { Container, Row, Card } from "react-bootstrap";
import { useAppDispanch, useAppSelector } from "../hooks/redux";
import { fetchAsyncThunkUsers } from "../store/reducers/ActionCreater";

const UserThunkPage: FC = () => {
  const dispatch = useAppDispanch();

  const { users, isLoading, error } = useAppSelector((state) => state.userAsyncThunkReducer);

  // Когда мы в ActionCreater.ts используем AsyncThunk,
  // то пишем fetchAsyncThunkUsers() со скобками
  useEffect(() => {
    dispatch(fetchAsyncThunkUsers());
  }, [dispatch]);

  return (
    <Container className="card mt-6 mb-4">
      <h3 className="textCenter mb-5">
        Используем redux toolkit createAsyncThunk, создаём экстра-редюсер userAsyncThunkReducer с помощью функции
        createSlice()
      </h3>

      <Row className="mt-4">
        <div>
          <h2 className="textCenter mb-4">Список пользователей из userAsyncThunkReducer</h2>
          {isLoading && <h1> Идёт загрузка</h1>}
          <div>
            <>
              {error && (
                <h1>
                  <> {error} </>
                </h1>
              )}
            </>
          </div>
        </div>

        {users.map((user) => (
          <Card key={user.id} className="card">
            <Card.Title>
              <b> Пользователь под номером: </b> {user.id}
            </Card.Title>

            <i className="displayBlock">
              <b> имя пользователя: </b> {user.name}
            </i>

            <i className="displayBlock">
              <b>ник: </b> {user.username}
            </i>
            <i className="displayBlock">
              <b>email:</b> {user.email}
            </i>
            <i className="displayBlock">
              <b>телефон:</b> {user.phone}
            </i>
            <i className="displayBlock">
              <b>ВЭБ сайт:</b> {user.website}
            </i>

            <i className="displayBlock">
              <b> company name: </b> {user.company.name}
            </i>
            <i className="displayBlock">
              <b>город:</b> {user.address.city}
            </i>
            <i className="displayBlock">
              <b>улица:</b> {user.address.street}
            </i>
            <i className="displayBlock">
              <b> suite: </b> {user.address.suite}
            </i>
            <i className="displayBlock">
              <b>zipcode: </b>
              {user.address.zipcode}
            </i>
          </Card>
        ))}
      </Row>
    </Container>
  );
};

export default UserThunkPage;
