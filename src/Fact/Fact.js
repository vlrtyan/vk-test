import React from "react";
import "./Fact.css";
import {
  Button
} from "@vkontakte/vkui";

function Fact() {
  const [fact, setFact] = React.useState("");
  const getFact = () => {
    fetch("https://catfact.ninja/fact")
      .then((res) => res.json())
      .then((json) => setFact(json.fact))
      .catch((err) => console.log(err));
  };

  return (
    <section className="fact">
      <Button onClick={getFact}>
        Get a fact
      </Button>
      <p className="fact_text">{fact}</p>
    </section>
  );
}

export default Fact;
