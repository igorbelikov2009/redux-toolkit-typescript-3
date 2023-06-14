import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserSlice";
import userAsyncThunkReducer from "./reducers/userAsyncThunkSlice";
import { userAPI } from "../services/UserService";
import { todoApi } from "../services/TodoService";
import { albumApi } from "../services/AlbumService";
import { commentApi } from "../services/CommentService";
import { photoAPI } from "../services/PhotoService";
import { postAPI } from "../services/PostService";
import { productAPI } from "../services/ProductService";

// Создаём корневой редюсер, состоящий из комбинации всех редюсеров
const rootReducer = combineReducers({
  userReducer,
  userAsyncThunkReducer,

  // Регистрируем редюсер с UserService.ts как ключ-значение
  [userAPI.reducerPath]: userAPI.reducer,
  [todoApi.reducerPath]: todoApi.reducer,
  [albumApi.reducerPath]: albumApi.reducer,
  [commentApi.reducerPath]: commentApi.reducer,
  [photoAPI.reducerPath]: photoAPI.reducer,
  [postAPI.reducerPath]: postAPI.reducer,
  [productAPI.reducerPath]: productAPI.reducer,
});

// Создаём функцию setupStore, с помощью её мы будем конфигурировать
// наше редакс-хранилище. Без использования toolkit мы использовали
// createReducer. Сейчас используем configureStore().
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,

    // Добавляем к дефолтному мидлвееру, методом concat(), мидлвеер из нашего postAPI.
    // Затем, методом concat(), добавляем мидлвеер из нашего userAPI
    // Затем, методом concat(), добавляем мидлвеер из нашего todoAPI
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(userAPI.middleware)
        .concat(todoApi.middleware)
        .concat(albumApi.middleware)
        .concat(commentApi.middleware)
        .concat(photoAPI.middleware)
        .concat(postAPI.middleware)
        .concat(productAPI.middleware),
  });
};

// Три базовых типа, которые нам в дальнейшей работе понадобятся
// Нам необходимо получить тип нашего состояния
export type RootState = ReturnType<typeof rootReducer>;

// Так же получим тип самого стора, с помощью ретюрнтайп
export type AppStore = ReturnType<typeof setupStore>;

// Так же получим тип dispatch нашего хранилища. Определив тип диспатча,
// мы не сможем задиспачить те экшены, которые мы не определили
export type AppDispacth = AppStore["dispatch"];
