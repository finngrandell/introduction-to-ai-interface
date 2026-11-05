import { useState } from "react";
import data from "../solutions/c/svr_predictions.json";

const ORIENTATIONS = [
    { value: 2, label: "North" },
    { value: 3, label: "East" },
    { value: 4, label: "South" },
    { value: 5, label: "West" },
];
const GLAZING_AREAS = [
    { value: 0, label: "0%" },
    { value: 0.1, label: "10%" },
    { value: 0.25, label: "25%" },
    { value: 0.4, label: "40%" },
];
const DISTRIBUTIONS = [
    { value: 1, label: "Uniform" },
    { value: 2, label: "North" },
    { value: 3, label: "East" },
    { value: 4, label: "South" },
    { value: 5, label: "West" },
];

// Index every design by its inputs for direct lookup
const lookup = new Map(
    data.designs.map(([g, o, ga, gd, ph, pc, sh, sc, test]) => [
        `${g}|${o}|${ga}|${gd}`,
        { predictedHeating: ph, predictedCooling: pc, simulatedHeating: sh, simulatedCooling: sc, inTestSet: test === 1 },
    ])
);

function Options({ label, options, value, onChange, disabled }) {
    return (
        <div className="mb-5">
            <p className="m-0 mb-2 text-sm font-semibold">{label}</p>
            <div className="flex flex-wrap gap-2">
                {options.map((o) => (
                    <button
                        key={o.value}
                        disabled={disabled}
                        onClick={() => onChange(o.value)}
                        className={`px-3 py-1 rounded-[8px] border border-solid text-sm cursor-pointer disabled:cursor-default disabled:opacity-40 ${!disabled && o.value === value ? "bg-teal text-ink border-teal" : "bg-ink text-white border-white/40"}`}
                    >
                        {o.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

function Result({ label, predicted, simulated, mae }) {
    return (
        <div className="border border-solid border-white rounded-[12px] p-5">
            <p className="m-0 text-sm font-semibold">{label}</p>
            <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                    <p className="m-0 text-sm text-gray">Predicted</p>
                    <p className="m-0 mt-1 text-3xl font-bold">{predicted.toFixed(2)} <span className="text-base font-normal">kWh/m²</span></p>
                    <p className="m-0 mt-1 text-sm text-gray">Typical error ±{mae.toFixed(2)}</p>
                </div>
                <div>
                    <p className="m-0 text-sm text-gray">Simulated</p>
                    <p className="m-0 mt-1 text-3xl font-bold">{simulated.toFixed(2)} <span className="text-base font-normal">kWh/m²</span></p>
                    <p className="m-0 mt-1 text-sm text-gray">Difference {(predicted - simulated >= 0 ? "+" : "") + (predicted - simulated).toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
}

function ChosenSolution() {
    const [geometry, setGeometry] = useState(0);
    const [orientation, setOrientation] = useState(2);
    const [glazingArea, setGlazingArea] = useState(0.1);
    const [distribution, setDistribution] = useState(1);

    const effectiveDistribution = glazingArea === 0 ? 0 : distribution;
    const result = lookup.get(`${geometry}|${orientation}|${glazingArea}|${effectiveDistribution}`);
    const shape = data.geometries[geometry];

    return (
        <div>
            <h2>Chosen Solution</h2>
            <p>
                Support vector regression was chosen as the final solution. Choose a building design below to see the SVR's predicted heating and cooling loads.
            </p>

            <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 mt-6 max-lg:grid-cols-1">
                <div className="border border-solid border-white rounded-[12px] p-5">
                    <Options
                        label="Building shape"
                        options={data.geometries.map((_, i) => ({ value: i, label: `${i + 1}` }))}
                        value={geometry}
                        onChange={setGeometry}
                    />
                    <table className="text-sm mb-5 border-collapse">
                        <tbody>
                            {[
                                ["Relative compactness", shape.compactness],
                                ["Surface area", `${shape.surfaceArea} m²`],
                                ["Wall area", `${shape.wallArea} m²`],
                                ["Roof area", `${shape.roofArea} m²`],
                                ["Overall height", `${shape.height} m`],
                            ].map(([k, v]) => (
                                <tr key={k}>
                                    <td className="pr-6 py-0.5 text-gray">{k}</td>
                                    <td className="py-0.5">{v}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Options label="Orientation" options={ORIENTATIONS} value={orientation} onChange={setOrientation} />
                    <Options label="Glazing area" options={GLAZING_AREAS} value={glazingArea} onChange={setGlazingArea} />
                    <Options label="Glazing distribution" options={DISTRIBUTIONS} value={distribution} onChange={setDistribution} disabled={glazingArea === 0} />
                </div>

                <div className="flex flex-col gap-4">
                    <Result label="Heating load" predicted={result.predictedHeating} simulated={result.simulatedHeating} mae={data.testMae.heating} />
                    <Result label="Cooling load" predicted={result.predictedCooling} simulated={result.simulatedCooling} mae={data.testMae.cooling} />
                </div>
            </div>
        </div>
    );
}

export default ChosenSolution;
