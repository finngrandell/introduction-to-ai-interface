const techniques = ["Neural Network (MLP)", "Decision Tree", "SVR"];

const resultsTable = {
    header: "Measure",
    caption: "Table 1: Test-set results of the techniques",
    rows: [
        ["R² - Heating", "0.8924", "0.9959", "0.9980"],
        ["R² -  Cooling", "0.8908", "0.9556", "0.9768"],
        ["MAE - heating (kWh/m²)", "2.4666", "0.4702", "0.3451"],
        ["MAE - cooling (kWh/m²)", "2.4269", "1.3328", "0.8542"],
        ["RMSE - heating (kWh/m²)", "3.3487", "0.6506", "0.4578"],
        ["RMSE - cooling (kWh/m²)", "3.1797", "2.0280", "1.4665"],
        ["Accuracy (100% - MAPE) - heating", "87.65%", "97.85%", "98.24%"],
        ["Accuracy (100% - MAPE) - cooling", "90.63%", "95.55%", "96.85%"],
        ["Within ±10% - heating", "56.49%", "98.05%", "99.35%"],
        ["Within ±10% - cooling", "58.44%", "87.01%", "95.45%"],
        ["Cross-validation R²", "0.8812 ±", "0.9771 ±", "0.9845 ±"],
        ["Meets 85% success target", "YES", "YES", "YES"],
    ],
};

const prosConsTable = {
    header: "Criteria",
    caption: "Table 2: Summary of pros and cons of the techniques",
    rows: [
        ["Prediction Quality (R²)", "Lowest (0.88 - 0.90)", "High (0.96 - 1.00)", "Highest (0.98 - 1.00)"],
        ["Typical Error (MAE)", "", "Low", "Lowest"],
        ["Training and tuning time", "Slow (200 epochs)", "Fastest", "Slowest"],
        ["Needs feature scaling", "Yes (Not Applied)", "No", "Yes (Applied)"],
        ["Interpretability", "Low", "High", "Low"],
        ["Stability between runs", "No seed set so it varies", "Same result with a fixed seed", "Same result with a fixed seed"],
    ],
};

const intro = "Three strategies were considered: a feedforward neural network (MLP), a decision tree regressor, and support vector regression (SVR). To provide a fair comparison, all three used the same dataset, eight input parameters, and an 80/20 train/test split (random_state = 42), so each model was tested on the same 154 unseen buildings. The main quality metric was R², which represents the load fluctuation described by the model. MAE and RMSE measured the magnitude of errors in kWh/m².  RMSE penalises larger errors more severely. We evaluated accuracy (100% − MAPE), prediction precision (±10% of genuine load), cross-validation stability, speed, and interpretability.";

const overview = "All three solutions met the project quality target of 85%, and each was more accurate in projecting heating demand than cooling load. These findings indicate that cooling demand is more difficult to forecast using these eight parameters. SVR has the best performance across all measures, followed by decision trees. The neural network explained just 88-90% of the variation, but the other two strategies explained more than 95%.";

const techniqueNotes = [
    {
        lead: "Neural networks.",
        text: "The MLP contained three hidden layers (64, 32, and 16 neurones) and was trained over 200 epochs. Its strength is its ability to model smooth, non-linear interactions and estimate both loads simultaneously, and its loss curves show how it learned. However, it had the lowest R2 values (0.88 for heating, 0.90 for cooling). Its inputs were probably not scaled. The features range from less than 1 to more than 800, and neural networks are sensitive to such differences. It is also difficult to interpret. Has the most parameters to change. The results vary from run to run because no random seed was used.",
    },
    {
        lead: "Decision tree.",
        text: "The amended tree had a R² of 0.9959 for heating and 0.9556 for cooling at a maximum depth of 6. Its key feature is interpretability: its principles indicate that relative compactness accounts for approximately 89% of the predictive importance, followed by glazing area. It did not require feature scaling. It was the quickest approach for tuning and training. It displayed little overfitting, with nearly identical R² values for training and testing. The problem is that its forecasts are step-shaped, meaning that all buildings in the same leaf receive the same value. Only 87% of cooling predictions were within ±10%, compared to SVR's 95% accuracy.",
    },
    {
        lead: "SVR.",
        text: "SVR was developed with an RBF kernel, scaled inputs, and parameters chosen from 36 combinations using five-fold cross-validation. It achieved the best results, with the greatest R² values of 0.9980 for heating and 0.9768 for cooling, and the lowest MAE and RMSE for both loads. Because the forecasts are smooth, slight design changes result in minor variations in the projected load. Its downsides include challenging interpretation, reliance on feature scaling, and the longest tuning time at 144 seconds, as opposed to a few seconds for the decision tree.",
    },
];

const weakness = "All three models have one significant weakness in common. Excluding each building shape from training and testing resulted in significantly lower performance, with SVR's R² going below zero and the decision tree's R² decreasing to approximately 0.35. Thus, the models are appropriate for evaluating orientation and glazing options for the 12 existing shapes, but not for forecasting wholly new building shapes.";

const finalChoice = "The final solution was chosen as SVR because it had the highest accuracy and the fewest errors for heating and cooling loads. It takes longer to tune, but just once, and forecasts take a fraction of a second. If a small increase in accuracy is less critical than communicating a prognosis to a designer, the decision tree remains a viable option.";

function Table({ header, caption, rows }) {
    return (
        <figure className="m-0 my-6">
            <div className="overflow-x-auto border border-solid border-white rounded-[12px]">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="bg-deep-teal">
                            <th className="p-3 font-semibold">{header}</th>
                            {techniques.map((t) => (
                                <th key={t} className="p-3 font-semibold">{t}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(([label, ...values]) => (
                            <tr key={label} className="border-0 border-t border-solid border-white/20">
                                <th className="p-3 font-normal text-gray">{label}</th>
                                {values.map((v, i) => (
                                    <td key={i} className="p-3 tabular-nums">{v}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <figcaption className="mt-2 text-gray text-sm">{caption}</figcaption>
        </figure>
    );
}

function Comparison() {
    return (
        <div>
            <h2>Comparison</h2>
            <p>{intro}</p>
            <Table {...resultsTable} />
            <p>{overview}</p>
            {techniqueNotes.map(({ lead, text }) => (
                <p key={lead}><strong>{lead}</strong> {text}</p>
            ))}
            <Table {...prosConsTable} />
            <p>{weakness}</p>
            <p>{finalChoice}</p>
        </div>
    );
}

export default Comparison;
