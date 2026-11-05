import SolutionSelector from "./components/SolutionSelector";
import SolutionWindow from "./components/SolutionWindow";
import Comparison from "./components/Comparison";
import { useState } from "react";

export default function App() {
  const [solutionSelected, setSolutionSelected] = useState('a');

  return (
    <div className="relative w-full min-h-screen flex flex-col">

      <div className="sticky top-0 z-10 w-full bg-ink"> {/* Header */}
         <div className="px-20">
          <h2 className="text-white">Introduction to AI - Heating & Cooling Predictions</h2>
        </div>
        <div className="h-1px bg-white w-full"></div>
      </div>
     
      <div className="px-20 my-10 text-white"> {/* Body */}
        <div>
          <h1>Predicting the heating and cooling loads of buildings</h1>
          <p>Brief explanation here...</p>
        </div>

        <div>
          <div>
            <h2>Notebooks</h2>
            <p>Use the arrows to move through the notebook steps for each solution!</p>

            <div>
              <div className="flex gap-3 justify-center w-full">
                <SolutionSelector title="Solution A" subtitle="Neural Network (FNN)" isSelected={solutionSelected == 'a'} onClick={() => setSolutionSelected('a')}/>
                <SolutionSelector title="Solution B" subtitle="Decision Tree" isSelected={solutionSelected == 'b'} onClick={() => setSolutionSelected('b')}/>
                <SolutionSelector title="Solution C" subtitle="Support Vector Regression" isSelected={solutionSelected == 'c'} onClick={() => setSolutionSelected('c')}/>
              </div>
            </div>

            <div>
              <SolutionWindow
                key={solutionSelected}
                solution={solutionSelected}
              >
              </SolutionWindow>
            </div>

          </div>
        </div>

        <Comparison />

        <div>
          <h2>Chosen Solution</h2>
          <p>Chosen solution here...</p>
        </div>

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
