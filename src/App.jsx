import { useState } from "react";
import NavMenu from "./components/NavMenu";
import Home from "./components/Home";
import Notebooks from "./components/Notebooks";
import Comparison from "./components/Comparison";
import ChosenSolution from "./components/ChosenSolution";

const pages = [
  { id: "home", label: "Home" },
  { id: "notebooks", label: "Notebooks" },
  { id: "comparison", label: "Comparison" },
  { id: "chosen", label: "Chosen Solution" },
];

export default function App() {
  const [page, setPage] = useState("home");

  const navigate = (id) => {
    setPage(id);
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col">

      <div className="sticky top-0 z-10 w-full bg-ink"> {/* Header */}
        <div className="px-20 flex items-center justify-between gap-4">
          <h2 className="text-white">Introduction to AI - Heating & Cooling Predictions</h2>
          <NavMenu pages={pages} current={page} onNavigate={navigate} />
        </div>
        <div className="h-1px bg-white w-full"></div>
      </div>

      <div className="px-20 my-10 text-white"> {/* Body */}
        {page === "home" && <Home onNavigate={navigate} />}
        {page === "notebooks" && <Notebooks />}
        {page === "comparison" && <Comparison />}
        {page === "chosen" && <ChosenSolution />}
      </div>

      <div className="sticky bottom-0 z-10 mt-auto w-full bg-ink"> {/* Footer */}
        <div className="h-1px bg-white w-full"></div>
        <div className="px-20">
          <h2 className="text-white">Finn Randell | Yash Patil | Aaryan Dixit</h2>
        </div>
      </div>
    </div>
  )
}
