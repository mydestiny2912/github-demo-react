import { useEffect, useState } from "react";



export default function App() {
  const [inputMoney, setInputMoney] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("INR");
  const [output, setOutput] = useState("");

  function handleChangeFromCurrency(value) {
    setFromCurrency(value);
    console.log(value);
  }

  function handleChangeToCurrency(value) {
    setToCurrency(value);
    console.log(value);
  }
  useEffect(() => {

    if (!inputMoney || !fromCurrency || !toCurrency || (fromCurrency === toCurrency)) return;
    fetch(`https://api.frankfurter.app/latest?amount=${inputMoney}&from=${fromCurrency}&to=${toCurrency}`)
      .then((res) => res.json())
      .then((data) => {
        setOutput(data.rates[toCurrency]);
        console.log(data);
      });
  }, [inputMoney, fromCurrency, toCurrency]);

  return (
    <div>
      <input type="text" value={inputMoney} onChange={(e) => setInputMoney(e.target.value)} />
      <select value={fromCurrency} onChange={e => handleChangeFromCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={toCurrency} onChange={e => handleChangeToCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>OUTPUT: {output}</p>
    </div>
  );
}
