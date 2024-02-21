import "./App.css";
import CalculatorForm from "./components/CalculatorForm";

const App: React.FC = () => {
  return (
    <div>
      <h1>Delivery fee calculator</h1>
      <CalculatorForm />
    </div>
  );
};

export default App;
