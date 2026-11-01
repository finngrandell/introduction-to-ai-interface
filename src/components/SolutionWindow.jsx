import { useState } from "react";
import a from "../solutions/a/a.json";

const solutions = { a };
const images = import.meta.glob("../solutions/*/images/*", { eager: true, query: "?url", import: "default" });

function SolutionWindow({solution}){
    const [stepIndex, setStepIndex] = useState(0);
    const steps = solutions[solution];

    if (!steps) return;

    const step = steps[stepIndex];

    return (
        <div className="mt-3 border border-solid border-white rounded-[12px] p-4 ">
            <div className="grid grid-cols-[2fr_3fr] gap-5 w-full">
                <div className="min-w-0">
                    <div>
                        <h3 className="m-0">{step.title}</h3>
                        <p className="m-0 mt-3">{step.subtitle}</p>
                    </div>
                </div>
                <div className="min-w-0 border border-solid border-1px border-white rounded rounded-[12px] pt-3">
                    <pre className="mt-3 overflow-x-auto mx-3"><code>{step.code}</code></pre>
                    {step.outputs.length > 0 && (
                        <div className="bg-deep-teal rounded-b-[8px] rounded-t-[0px] p-3">
                            <p className="m-0 mb-2 text-teal">Out:</p>
                            {step.outputs.map((output, index) => (
                                output.type === "image"
                                    ? <img key={index} className="block max-w-full h-auto" src={images[`../solutions/${solution}/${output.src}`]} alt={output.alt} />
                                    : <pre key={index} className="m-0 overflow-x-auto">{output.text}</pre>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full flex justify-center gap-2 shrink-0 mt-4">
                <button className="px-2 py-1 bg-ink text-white border border-solid border-white rounded-[8px] disabled:opacity-40" disabled={stepIndex === 0} onClick={() => setStepIndex(stepIndex - 1)}>{"<"}</button>
                <button className="px-2 py-1 bg-ink text-white border border-solid border-white rounded-[8px] disabled:opacity-40" disabled={stepIndex === steps.length - 1} onClick={() => setStepIndex(stepIndex + 1)}>{">"}</button>
            </div>
        </div>
    );
}

export default SolutionWindow;
