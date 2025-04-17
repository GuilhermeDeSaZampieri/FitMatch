import { Login } from "../src/pages/login/index";
import { Route, Routes } from "react-router";
import { Cadastro } from "./pages/cadastro";
import { Perfil } from "./pages/perfil";
import { EditarPerfil } from "./pages/editarPerfil";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { Home } from "./pages/Home";
import { ListOfType } from "./pages/ListagemPorTipo";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Cadastro" element={<Cadastro />}></Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Perfil" element={<Perfil />}></Route>
          <Route path="/EditarPerfil" element={<EditarPerfil />}></Route>
          <Route path="/Home/Listagem" element={<ListOfType />}></Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export { App };
