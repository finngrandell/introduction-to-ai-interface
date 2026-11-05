function Home({ onNavigate }) {
    return (
        <div>
            <h1 className="mb-6">Predicting the heating and cooling loads of buildings</h1>

            <div className="rounded-[12px] border border-solid border-white p-6">
                <p className="m-0 text-teal text-sm font-semibold uppercase tracking-wide">Problem statement</p>
                <p className="m-0 mt-3 text-xl leading-8">
                    What methods can we utilise to accurately and swiftly predict the heating and cooling demands of a residential structure during the design phase, using only its construction data, so that architects and builders can evaluate energy-efficient options without resorting to costly energy simulations?
                </p>
            </div>

            <h2 className="mt-10">Summary</h2>
            <div>
                <p>
                    Heating and cooling systems typically represent the primary energy consumer in Australian residences, accounting for about 40% of an average household's energy use. Many of the factors that drive these loads are fixed at the design stage, and are costly or unfeasible to change once construction is completed.
                </p>
                <p>
                    Using the UCI Energy Efficiency dataset of 768 simulated home designs, each defined by eight construction factors, we trained three models to predict heating and cooling load: a feedforward neural network, a decision tree, and support vector regression (SVR). All three were tested on the same 154 unseen buildings.
                </p>
                <p>
                    All three met the project quality target of 85%. SVR performed best, with test R² values of 0.9980 for heating and 0.9768 for cooling, and was chosen as the final solution. The models suit comparing orientation and glazing options for the 12 known building shapes, but not forecasting wholly new building shapes.
                </p>
            </div>
        </div>
    );
}

export default Home;
