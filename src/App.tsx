import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import GlobalStyle from "./components/GlobalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
