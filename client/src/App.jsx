import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useCookies } from "react-cookie";

import Header from "./components/Header";
import Footer from "./components/Footer";

function App({ children }) {
  const [cookies] = useCookies(["auth_token"]);

  const httpLink = createHttpLink({
    uri: "/graphql",
  });

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: cookies?.auth_token ? `Bearer ${cookies.auth_token}` : "",
    },
  }));

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Header />
      <main>
        {children} {/* This will render the routes */}
      </main>
      <Footer />
    </ApolloProvider>
  );
}

export default App;
