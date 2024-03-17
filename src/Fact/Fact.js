import React from "react";
import "./Fact.css";
import {
  Button
} from "@vkontakte/vkui";

function Fact() {
  const [result, setResult] = React.useState("");
  const getFact = () => {
    fetch("https://catfact.ninja/fact")
      .then((res) => res.json())
      .then((json) => setResult(json.fact))
      .catch((err) => setResult("Something went wrong"));
  };

  return (
    <section className="fact">
      <Button onClick={getFact}>
        Get a fact
      </Button>
      <p className="fact_text">{result}</p>
    </section>
  );
}

export default Fact;
