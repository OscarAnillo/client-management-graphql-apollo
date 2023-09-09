import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client'
import App from './App.jsx'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:3005/graphql"
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </ApolloProvider>
)
