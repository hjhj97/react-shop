import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import GlobalStyle from "./components/GlobalStyle";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Header />
        <Outlet />
        <Footer />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
