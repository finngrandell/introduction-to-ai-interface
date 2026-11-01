import { useState } from "react";
import a from "../solutions/a.json";

const solutions = { a };

function SolutionWindow({solution}){
    const [stepIndex, setStepIndex] = useState(0);
    const steps = solutions[solution];

    if (!steps) {
        return (
            <div className="mt-3 border border-solid border-white rounded-[12px] p-4">
                <p>This solution isn't available yet.</p>
            </div>
        );
    }

    const step = steps[stepIndex];

    return (
        <div className="mt-3 border border-solid border-white rounded-[12px] p-4">
            <div className="flex justify-between items-center gap-3">
                <div>
                    <h3>{step.title}</h3>
                    <p>{step.subtitle}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <button className="px-2 py-1 bg-ink text-white border border-solid border-white rounded-[8px] disabled:opacity-40" aria-label="Previous step" disabled={stepIndex === 0} onClick={() => setStepIndex(stepIndex - 1)}>←</button>
                    <span>{stepIndex + 1} / {steps.length}</span>
                    <button className="px-2 py-1 bg-ink text-white border border-solid border-white rounded-[8px] disabled:opacity-40" aria-label="Next step" disabled={stepIndex === steps.length - 1} onClick={() => setStepIndex(stepIndex + 1)}>→</button>
                </div>
            </div>
            <pre className="mt-3 overflow-x-auto"><code>{step.code}</code></pre>
            {step.outputs.length > 0 && (
                <div className="mt-3 bg-deep-teal rounded-[8px] p-3">
                    <p className="m-0 mb-2 text-teal">Out:</p>
                    {step.outputs.map((output, index) => (
                        output.type === "image"
                            ? <img key={index} className="block max-w-full h-auto" src={import.meta.env.BASE_URL + output.src} alt={output.alt} />
                            : <pre key={index} className="m-0 overflow-x-auto">{output.text}</pre>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SolutionWindow;
