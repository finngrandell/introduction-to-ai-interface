import { useState } from "react";

const models = [
    {
        id: "nn",
        name: "Neural Network",
        short: "MLP",
        tagline: "Three hidden layers (64, 32, 16), trained over 200 epochs",
        strengths: ["Models smooth, non-linear interactions", "Estimates both loads simultaneously"],
        weaknesses: ["Inputs not scaled", "Difficult to interpret", "No seed set, so results vary between runs"],
    },
    {
        id: "dt",
        name: "Decision Tree",
        short: "Tree",
        tagline: "Tuned to a maximum depth of 6",
        strengths: ["Highly interpretable", "Quickest to tune and train", "Little overfitting"],
        weaknesses: ["Step-shaped forecasts", "Only 87% of cooling predictions within ±10%"],
    },
    {
        id: "svr",
        name: "Support Vector Regression",
        short: "SVR",
        tagline: "RBF kernel, scaled inputs, 36 parameter combinations tested",
        strengths: ["Best results on every measure", "Smooth forecasts"],
        weaknesses: ["Challenging to interpret", "Relies on feature scaling", "Longest tuning time (144 s)"],
        chosen: true,
    },
];

const metrics = [
    { id: "r2", label: "R²", higherIsBetter: true, min: 0.85, max: 1,
      values: { nn: [0.8924, 0.8908], dt: [0.9959, 0.9556], svr: [0.998, 0.9768] }, format: (v) => v.toFixed(4) },
    { id: "mae", label: "MAE", higherIsBetter: false, max: 2.5,
      values: { nn: [2.4666, 2.4269], dt: [0.4702, 1.3328], svr: [0.3451, 0.8542] }, format: (v) => v.toFixed(2) },
    { id: "rmse", label: "RMSE", higherIsBetter: false, max: 3.5,
      values: { nn: [3.3487, 3.1797], dt: [0.6506, 2.028], svr: [0.4578, 1.4665] }, format: (v) => v.toFixed(2) },
    { id: "within", label: "Within ±10%", higherIsBetter: true, max: 100,
      values: { nn: [56.49, 58.44], dt: [98.05, 87.01], svr: [99.35, 95.45] }, format: (v) => `${v.toFixed(1)}%` },
    { id: "acc", label: "Accuracy", higherIsBetter: true, max: 100,
      values: { nn: [87.65, 90.63], dt: [97.85, 95.55], svr: [98.24, 96.85] }, format: (v) => `${v.toFixed(1)}%` },
];

const glance = [
    { label: "Prediction quality", values: ["Lowest", "High", "Highest"] },
    { label: "Training & tuning", values: ["Slow", "Fastest", "Slowest"] },
    { label: "Needs scaling", values: ["Yes (not applied)", "No", "Yes (applied)"] },
    { label: "Interpretability", values: ["Low", "High", "Low"] },
    { label: "Stable between runs", values: ["No", "Yes", "Yes"] },
];

function Bar({ value, min = 0, max, highlight, format }) {
    return (
        <div className="flex items-center gap-3">
            <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full ${highlight ? "bg-teal" : "bg-gray"}`}
                    style={{ width: `${Math.min(Math.max((value - min) / (max - min), 0), 1) * 100}%` }}
                />
            </div>
            <span className="w-16 text-right tabular-nums text-sm">{format(value)}</span>
        </div>
    );
}

function MetricExplorer() {
    const [metricId, setMetricId] = useState("r2");
    const metric = metrics.find((m) => m.id === metricId);

    const best = [0, 1].map((i) => {
        const vals = models.map((m) => metric.values[m.id][i]);
        return metric.higherIsBetter ? Math.max(...vals) : Math.min(...vals);
    });

    return (
        <div className="border border-solid border-white rounded-[12px] p-5">
            <div className="flex flex-wrap gap-2">
                {metrics.map((m) => (
                    <button
                        key={m.id}
                        onClick={() => setMetricId(m.id)}
                        className={`px-3 py-1 rounded-full border border-solid text-sm cursor-pointer ${m.id === metricId ? "bg-teal text-ink border-teal" : "bg-ink text-white border-white/40"}`}
                    >
                        {m.label}
                    </button>
                ))}
            </div>

            <div className="grid gap-5 mt-5">
                {models.map((m) => (
                    <div key={m.id} className="grid grid-cols-[minmax(0,140px)_1fr] gap-x-4 gap-y-2 items-center max-sm:grid-cols-1">
                        <div className={`font-semibold ${m.chosen ? "text-teal" : ""}`}>{m.name}</div>
                        <div className="grid gap-2">
                            {["Heating", "Cooling"].map((target, i) => (
                                <div key={target} className="grid grid-cols-[64px_1fr] items-center gap-2">
                                    <span className="text-gray text-sm">{target}</span>
                                    <Bar value={metric.values[m.id][i]} min={metric.min} max={metric.max}
                                         highlight={metric.values[m.id][i] === best[i]} format={metric.format} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ModelCard({ model }) {
    return (
        <div className={`relative flex flex-col rounded-[12px] p-5 border border-solid ${model.chosen ? "border-white bg-deep-teal/40" : "border-white/40"}`}>
            <h3 className="m-0">{model.name}</h3>
            <p className="m-0 mt-2 text-sm text-gray">{model.tagline}</p>

            <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                    <p className="m-0 text-sm font-semibold">Strengths</p>
                    <ul className="m-0 mt-1 pl-5 text-sm leading-6">
                        {model.strengths.map((s) => <li key={s}>{s}</li>)}
                    </ul>
                </div>
                <div>
                    <p className="m-0 text-sm font-semibold">Weaknesses</p>
                    <ul className="m-0 mt-1 pl-5 text-sm leading-6">
                        {model.weaknesses.map((w) => <li key={w}>{w}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    );
}

function Comparison() {
    return (
        <section className="mt-12">
            <h2 className="mb-2">Comparison</h2>

            <h3 className="mb-3">Explore the results</h3>
            <MetricExplorer />
            <p className="max-w-3xl w-full">
                Each model was more accurate in projecting heating demand than cooling load, indicating that cooling demand is more difficult to forecast using these eight parameters.
            </p>

            <h3 className="mt-10 mb-5">The three techniques</h3>
            <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
                {models.map((m) => <ModelCard key={m.id} model={m} />)}
            </div>

            <h3 className="mt-10 mb-3">At a glance</h3>
            <div className="overflow-x-auto border border-solid border-white/40 rounded-[12px]">
                <table className="w-full border-collapse text-left text-sm">
                    <thead>
                        <tr>
                            <th className="p-3"></th>
                            {models.map((m) => (
                                <th key={m.id} className={`p-3 font-semibold ${m.chosen ? "text-teal" : ""}`}>{m.short}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {glance.map((row) => (
                            <tr key={row.label} className="border-0 border-t border-solid border-white/20">
                                <th className="p-3 font-normal text-gray">{row.label}</th>
                                {row.values.map((v, i) => (
                                    <td key={i} className={`p-3 ${models[i].chosen ? "bg-deep-teal/40" : ""}`}>{v}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-10 max-md:grid-cols-1">
                <div className="rounded-[12px] border border-solid border-white/40 p-5">
                    <p className="m-0 text-gray text-sm font-semibold uppercase tracking-wide">One shared weakness</p>
                    <p className="m-0 mt-2">
                        Holding out whole building shapes caused performance to drop sharply. The models are appropriate for evaluating orientation and glazing options for the 12 existing shapes, but not for forecasting wholly new building shapes.
                    </p>
                </div>
                <div className="rounded-[12px] border border-solid border-teal bg-deep-teal/40 p-5">
                    <p className="m-0 text-teal text-sm font-semibold uppercase tracking-wide">The verdict</p>
                    <p className="m-0 mt-2">
                        SVR was chosen because it had the highest accuracy and the fewest errors for heating and cooling loads. It takes longer to tune, but just once, and forecasts take a fraction of a second.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Comparison;
