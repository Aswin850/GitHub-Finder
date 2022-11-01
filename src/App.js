import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Footer from "./components/layouts/Footer";
import Navbar from "./components/layouts/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Alert from "./components/layouts/Alert";
import User from "./pages/User";

import { UserProvider } from "./context/github/GithubContext";
import { AlertProvider } from "./context/github/alert/AlertContext";

function App() {
  return (
    <UserProvider>
      <AlertProvider>
        <Router>
          <div className="flex flex-col justify-between h-screen">
            <Navbar />
            <main className="container mx-auto px-3  pd-12">
              <Alert />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/user/:login" element={<User />} />

                <Route path="/notfound" element={<NotFound />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AlertProvider>
    </UserProvider>
  );
}

export default App;
