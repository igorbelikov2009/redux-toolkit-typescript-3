import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";
import { useAppDispanch, useAppSelector } from "./hooks/redux";
import { fetchUsers } from "./store/reducers/ActionCreater";

function App() {
  const { users, isLoading, error } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispanch();

  useEffect(() => {
    fetchUsers(dispatch);
  }, [dispatch]);

  return (
    <Container className="mt-6 mb-4">
      <h3 className="textCenter mb-5">Значение </h3>

      <Row className="mt-4">
        <Col md={4}>
          <h3 className="textCenter mb-5">Пользователи </h3>
          {isLoading && <h3 className="textCenter mb-5 colorRed">Идёт загрузка</h3>}
          {error && <h3 className="textCenter mb-5 colorRed"> {error} </h3>}
          {JSON.stringify(users, null, 2)}
        </Col>

        <Col md={4}>
          <h3 className="textCenter mb-5">Пользователи </h3>
        </Col>

        <Col md={4}>
          <h3 className="textCenter mb-5">Пользователи </h3>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
