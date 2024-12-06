import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Github from "./components/masal2/index.jsx";
import Kitob from "./components/masal3/index.jsx";

const Valyuta = () => {
  const [rate, setRate] = useState(1);
  const [field, setField] = useState("");
  const [result, setResult] = useState(0);
  const [checkedValute, setCheckedValute] = useState("USD");

  useEffect(() => {
    axios
      .get(
        `https://api.fastforex.io/fetch-one?from=${
          checkedValute === "USD" ? "EUR" : "USD"
        }&to=${checkedValute === "USD" ? "USD" : "EUR"}&api_key=${
          import.meta.env.VITE_API_KEY
        }`
      )
      .then((response) => {
        if (response.status === 200) {
          setRate(
            checkedValute === "USD"
              ? response.data.result.USD
              : response.data.result.EUR
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [checkedValute]);

  function handleConvert(event) {
    event.preventDefault();
    setResult((field * rate).toFixed(2));
  }

  return (
    <div>
      <div className="container box">
        <h1 className="title">Valyuta Konvertori</h1>
        <div className="radio-group">
          <label className="radio-label" htmlFor="usd">
            <input
              id="usd"
              name="checked"
              value={"USD"}
              onChange={(e) => {
                setCheckedValute(e.target.value);
              }}
              type="radio"
              checked={checkedValute === "USD"}
            />
            USD
          </label>
          <label className="radio-label" htmlFor="eur">
            <input
              id="eur"
              name="checked"
              value={"EUR"}
              onChange={(e) => {
                setCheckedValute(e.target.value);
              }}
              type="radio"
              checked={checkedValute === "EUR"}
            />
            EUR
          </label>
        </div>
        <form className="form" onSubmit={handleConvert}>
          <input
            className="input-field"
            onChange={(e) => {
              setField(e.target.value);
            }}
            type="number"
            placeholder="Enter your money.."
          />
          <button className="convert-button" type="submit">
            Convert
          </button>
        </form>
        <h1 className="result">{result}</h1>
      </div>
      <div className="box_git">
        <Github />
      </div>
      <div className="box_kitob">
        <Kitob />
      </div>
    </div>
  );
};

export default Valyuta;
