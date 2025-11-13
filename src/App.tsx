import React from "react";

import list from "./karina's tiktoks.json";
import PaginatedList from "./PaginatedList";

const App: React.FC = () => {
  return (
    <div className="App">
      <PaginatedList items={list} itemsPerPage={1} />
    </div>
  );
};

export default App;
