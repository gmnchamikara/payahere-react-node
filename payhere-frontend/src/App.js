//import logo from "./logo.svg";
import "./App.css";
import PaymentGateway from "./PaymentGateWay/PaymentGateWay";


function App() {
  return (
    <div className="App">
      <div>Pay here</div>
      <button className="" onClick={PaymentGateway}>
        Start Payment
      </button>
    </div>
  );
}

export default App;
