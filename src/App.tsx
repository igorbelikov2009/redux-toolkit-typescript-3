/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import "./App.css";
import { useAppDispanch, useAppSelector } from "./hooks/redux";
import { userSlice } from "./store/reducers/UserSlice";

function App() {
  // const { users, isLoading, error } = useAppSelector((state) => state.userReducer);
  // const { count } = useAppSelector((state) => state.userReducer);
  // const { increment, decrement } = userSlice.actions;
  // const dispatch = useAppDispanch();

  return <div className="App">worker</div>;
}

export default App;
