import { IUser } from "./../../models/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchAsyncThunkUsers } from "./ActionCreater";

// Создаём интерфейс для initialState для слайс-редюсера
interface IUserState {
  users: IUser[];
  isLoading: boolean;
  error: string | undefined;
}

// Создаём объект initialState типа IUserState

const initialState: IUserState = {
  users: [],
  isLoading: false,
  error: "",
};

// Создаём редюсер-слайс при помощи функции createSlice()
export const userAsyncThunkSlice = createSlice({
  name: "userAsyncThunk",
  initialState: initialState,
  reducers: {},
  // Когда мы в ActionCreater.ts используем createAsyncThunk, то в редюсерсы
  // записываем пустой объект: reducers: {},
  // и создаём extraReducers, в нём для нас уже автоматически создаются
  // три состояния: pending (в ожидании), rejected (отклоненный)
  // и fulfilled (выполненный)
  extraReducers: {
    [fetchAsyncThunkUsers.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchAsyncThunkUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
      state.isLoading = false;
      state.error = "";
      state.users = action.payload;
    },
    [fetchAsyncThunkUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// После создания слайса, мы можем вытащить из него отдельный редюсер
// и отдельный экшен-креатер. Например:

export default userAsyncThunkSlice.reducer;
