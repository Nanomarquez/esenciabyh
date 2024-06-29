import { Routes, Route } from "react-router-dom";
import AuthLayout from "./auth/AuthLayout";
import { Toaster } from "./components/ui/toaster";
import SignupForm from "./auth/forms/SignupForm";
import SigninForm from "./auth/forms/SigninForm";
import RootLayout from "./root/RootLayout";
import Home from "./root/pages/Home";
import Calculadora from "./root/pages/Calculadora";
import Perfil from "./root/pages/Perfil";
import Solucionador from "./root/pages/Solucionador";
import PasoAPaso from "./root/pages/PasoAPaso";
import ForgotPassword from "./auth/forms/ForgotPassword";
import NewPassword from "./auth/forms/NewPassword";
import CreatePost from "./root/pages/CreatePost";
import BlogList from "./root/pages/Blog";
import BlogPostPage from "./root/pages/PostDetail";

function App() {
  
  return (
    <main className="flex h-screen">
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/new-password" element={<NewPassword />} />
        </Route>
        {/* Private Routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/calculadora" element={<Calculadora />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/solucionador" element={<Solucionador />} />
          <Route path="/paso-a-paso" element={<PasoAPaso />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/post/:id" element={<BlogPostPage/>} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
}

export default App;
