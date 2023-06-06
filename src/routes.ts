import { IRoute } from "./models/types";
import AlbumApiPage from "./pages/AlbumApiPage";
import CommentApiPage from "./pages/CommentApiPage";
import PhotoApiPage from "./pages/PhotoApiPage";
import PostApiPage from "./pages/PostApiPage";
import ProductApiPage from "./pages/ProductApiPage";
import TodoApiPage from "./pages/TodoApiPage";
import UserApiPage from "./pages/UserApiPage";

import UserSlicePage from "./pages/UserSlicePage";
import UserThunkPage from "./pages/UserThunkPage";

export const USER_SLICE_ROUTE = "/";
export const USER_THUNK_ROUTE = "/userThunk";
export const USER_API_ROUTE = "/userApi";

export const ALBUM_API_ROUTE = "/albumApi";
export const COMMENT_API_ROUTE = "/commentApi";
export const PHOTO_API_ROUTE = "/photoApi";
export const POST_API_ROUTE = "/postApi";
export const PRODUCT_API_ROUTE = "/productApi";
export const TODO_API_ROUTE = "/todoApi";

export const routes: IRoute[] = [
  {
    path: USER_SLICE_ROUTE,
    Component: UserSlicePage,
  },
  {
    path: USER_THUNK_ROUTE,
    Component: UserThunkPage,
  },
  {
    path: USER_API_ROUTE,
    Component: UserApiPage,
  },
  {
    path: ALBUM_API_ROUTE,
    Component: AlbumApiPage,
  },
  {
    path: COMMENT_API_ROUTE,
    Component: CommentApiPage,
  },
  {
    path: PHOTO_API_ROUTE,
    Component: PhotoApiPage,
  },
  {
    path: POST_API_ROUTE,
    Component: PostApiPage,
  },
  {
    path: PRODUCT_API_ROUTE,
    Component: ProductApiPage,
  },
  {
    path: TODO_API_ROUTE,
    Component: TodoApiPage,
  },
];
