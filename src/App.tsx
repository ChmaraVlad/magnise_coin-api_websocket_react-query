import Chart from "./components/Chart";
import EntityInfo from "./components/EntityInfo";
import MarketInfo from "./components/MarketInfo";

function App() {
  return (
    <div>
      <EntityInfo />
      <main>
        <MarketInfo />
        <Chart />
      </main>
    </div>
  );
}

export default App;
