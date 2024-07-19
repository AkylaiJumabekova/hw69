import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Toolbar from './components/Toolbar/Toolbar';
import Home from './containers/Home/Home';
import SearchResults from './containers/Search/SearchResults';
import ShowDetails from './containers/ShowDetails/ShowDetails';

const App: React.FC = () => {
  return (
    <>
      <header>
        <Toolbar />
      </header>
      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/shows/:id" element={<ShowDetails />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </main>
    </>
  );
};

export default App;
