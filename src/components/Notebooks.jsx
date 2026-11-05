import { useState } from "react";
import SolutionSelector from "./SolutionSelector";
import SolutionWindow from "./SolutionWindow";

function Notebooks() {
    const [solutionSelected, setSolutionSelected] = useState('a');

    return (
        <div>
            <h2>Notebooks</h2>
            <p>Use the arrows to move through the notebook steps for each solution!</p>

            <div className="flex gap-3 justify-center w-full">
                <SolutionSelector title="Solution A" subtitle="Neural Network (FNN)" isSelected={solutionSelected == 'a'} onClick={() => setSolutionSelected('a')}/>
                <SolutionSelector title="Solution B" subtitle="Decision Tree" isSelected={solutionSelected == 'b'} onClick={() => setSolutionSelected('b')}/>
                <SolutionSelector title="Solution C" subtitle="Support Vector Regression" isSelected={solutionSelected == 'c'} onClick={() => setSolutionSelected('c')}/>
            </div>

            <SolutionWindow key={solutionSelected} solution={solutionSelected} />
        </div>
    );
}

export default Notebooks;
