import { IUser } from "../../models/types";
import { AppDispacth } from "../store";
import axios from "axios";
import { userSlice } from "./UserSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = async (dispatch: AppDispacth) => {
  try {
    dispatch(userSlice.actions.usersFetching());
    const response = await axios.get<IUser[]>("https://jsonplaceholder.typicode.com/users");
    dispatch(userSlice.actions.usersFetchingSuccess(response.data));
  } catch (error: any) {
    // dispatch(userSlice.actions.usersFetchingError("Произошла ошибка загрузки"));
    dispatch(userSlice.actions.usersFetchingError(error.message));
  }
};

// Мы обработали три сценария: загрузку, успешную загрузку, загрузку с ошибкой.
// redux-toolkit позволяет немного упростить обработку этих сценариев.
// Для того, чтобы использовать redux-thunk, мы создавали функцию, которая принимает
// аргументом dispatch и возвращает другую фунцию.

//========================================================
// Теперь мы можем воспользоваться
// уже специальной надстройкой - фунцией createAsyncThunk(), которая это делает за нас.
// Thunk - это функция, которая возвращается из другой функциию.
// Первым аргументом мы указываем название этого асинхронного танка-thunk
// (name: "userAsyncThunk", из UserAsyncThunkSlice.ts), а вторым аргументом передаём колбэк,
// внутри которого мы будем реализовывать какие-то действия, в нашем случае
// мы должны отправить запрос и вернуть какие-то данные.

export const fetchAsyncThunkUsers = createAsyncThunk("userAsyncThunk/fetchAll", async (_: void, thunkAPI) => {
  try {
    const response = await axios.get<IUser[]>("https://jsonplaceholder.typicode.com/users");
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue("Не удалось загрузить список юзеров.");
  }
});
