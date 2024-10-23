import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar"; // Navbar component
import TicketCard from "./components/TicketCard"; // TicketCard component

function App() {
  const [selectedGrouping, setSelectedGrouping] = useState(""); // Grouping: status, user, priority
  const [selectedSorting, setSelectedSorting] = useState(""); // Sorting: priority, title

  return (
    <div className="App">
      <Navbar
        onGroupingSelect={(group) => setSelectedGrouping(group)}
        onSortingSelect={(sort) => setSelectedSorting(sort)}
      />
      <main>
        <TicketCard
          selectedGrouping={selectedGrouping}
          selectedSorting={selectedSorting}
        />
      </main>
    </div>
  );
}

export default App;
