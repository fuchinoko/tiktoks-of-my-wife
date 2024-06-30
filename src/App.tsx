import React from "react";

import "./App.css";
import list from "./karina's tiktoks.json";
import PaginatedList from "./PaginatedList";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Tiktoks of my Wife &lt;3</h1>
      <PaginatedList items={list} itemsPerPage={1} />
    </div>
  );
};

export default App;
