import AppRouter from "./components/AppRouter";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
      <NavBar />
    </BrowserRouter>
  );
}

export default App;
