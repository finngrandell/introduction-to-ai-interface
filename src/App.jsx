import SolutionSelector from "./components/SolutionSelector";
import SolutionWindow from "./components/SolutionWindow";
import { useState } from "react";

export default function App() {
  const [solutionSelected, setSolutionSelected] = useState('a');

  return (
    <div className="w-full h-full">
      
      <div className="absolute top-0 w-full"> {/* Header */}
         <div className="px-20">
          <h2 className="text-white">Introduction to AI - Heating & Cooling Predictions</h2>
        </div>
        <div className="h-1px bg-white w-full"></div>
      </div>
     
      <div className="px-20 text-white"> {/* Body */}
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
                <SolutionSelector title="Solution C" subtitle="Other" isSelected={solutionSelected == 'c'} onClick={() => setSolutionSelected('c')}/>
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

        <div>
          <h2>Comparison</h2>
          <p>Comparison here...</p>
        </div>

      </div>

      <div className="absolute bottom-0 w-full"> {/* Footer */}
        <div className="h-1px bg-white w-full"></div>
        <div className="px-20"> 
          <h2 className="text-white">Finn Randell | Yash Patil | Aaryan Dixit</h2>
        </div>
      </div>
    </div>
  )
}
