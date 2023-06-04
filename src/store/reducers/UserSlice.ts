// В редакс редюсер - это просто по сути чистая функция, которая принимает
// state, action. В зависимости от экшена как-то изменяет state и возвращает
// его нам в обновлённом виде. В редакс-тулкит есть, так называемые, слайсы.
// Это некоторая обёртка над редюсерами, которая добовляет дополнительный
// функционал и упрощает работу.

import { IUser } from "../../models/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  users: IUser[];
  isLoading: boolean;
  error: string;
  count: number;
}

// Создаём объект типа UserState, который ожидаем в качестве загрузки.
const initialState: UserState = {
  users: [],
  isLoading: false,
  error: "",
  count: 0,
};

// Создаём сам редюсер. Подобные редюсеры в тулкит называются слайсами.
// Создаются они помощью специальной функции createSlice() и принимают параметрами
// объект с опциями.
export const userSlice = createSlice({
  name: "user",
  initialState: initialState, // Сюда мы передаём дефолтное значение.

  reducers: {
    // increment(state, action: PayloadAction<number>) {
    //   state.count += action.payload;
    // },
    // decrement(state, action: PayloadAction<number>) {
    //   state.count -= action.payload;
    // },

    // // Первый редюсер будет вызываться в тот момент, когда мы начинаем подгрузку пользователей.
    usersFetching(state) {
      state.isLoading = true;
    },
    // Второй редюсер будет вызываться в случае успешной загрузки
    usersFetchingSuccess(state, action: PayloadAction<IUser[]>) {
      state.isLoading = false;
      state.error = ""; // обнуляем ошибку, на случай, если она была
      state.users = action.payload; // меняем состояние, добавляем массив пользователей.
    },
    // Третий редюсер будет вызываться в случае загрузки с ошибкой
    usersFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// После создания слайса, мы можем вытащить из него отдельный редюсер
// и отдельный экшен-креатер. Например:

export default userSlice.reducer;
