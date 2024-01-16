import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApolloProvider, client } from "./data/providers/ApolloClient";
import { RepositoryList } from "./components/RepositoryList";

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/:topic?" element={<RepositoryList />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
