import React, { FC } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import {
  USER_SLICE_ROUTE,
  USER_THUNK_ROUTE,
  USER_API_ROUTE,
  ALBUM_API_ROUTE,
  COMMENT_API_ROUTE,
  PHOTO_API_ROUTE,
  POST_API_ROUTE,
  PRODUCT_API_ROUTE,
  TODO_API_ROUTE,
} from "../routes";
import { IButtonsRoute } from "../models/types";

const NavBar: FC = () => {
  const history = useHistory();
  const buttons: IButtonsRoute[] = [
    { id: 1, path: USER_SLICE_ROUTE, title: "UserSlice" },
    { id: 2, path: USER_THUNK_ROUTE, title: "UserThunk" },
    { id: 3, path: USER_API_ROUTE, title: "UserApi" },
    { id: 4, path: ALBUM_API_ROUTE, title: "Album" },
    { id: 5, path: COMMENT_API_ROUTE, title: "Comment" },
    { id: 6, path: PHOTO_API_ROUTE, title: "Photo" },
    { id: 7, path: POST_API_ROUTE, title: "Post" },
    { id: 8, path: PRODUCT_API_ROUTE, title: "Product" },
    { id: 9, path: TODO_API_ROUTE, title: "Todo" },
  ];

  return (
    <Navbar bg="dark" variant="dark" className="navbar mb-4">
      <Container>
        {buttons.map((route) => (
          <Button
            variant="outline-primary"
            // active={location === route.path}
            key={route.id}
            onClick={() => {
              history.push(route.path);
            }}
          >
            {route.title}
          </Button>
        ))}
      </Container>
    </Navbar>
  );
};

export default NavBar;
