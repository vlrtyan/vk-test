import React from "react";
import "./Fact.css";
import { Button } from "@vkontakte/vkui";

function Fact() {
  const [result, setResult] = React.useState("");
  const resRef = React.useRef(null);

  const setCursor = (element, position) => {
    if (element.setSelectionRange) {
      element.focus();
      setTimeout(() => {element.setSelectionRange(position, position)}, 0);
    }
  };

  const getFact = async () => {
    try {
      const res = await fetch("https://catfact.ninja/fact");
      const json = await res.json();
      setResult(json.fact);
      if (json.fact) {
        const firstSpaceIndex = json.fact.search(/\W/);
        console.log(firstSpaceIndex)
        if (firstSpaceIndex != - 1) {
          setCursor(resRef.current, firstSpaceIndex);
        }
      }
    } catch (err) {
      setResult("Something went wrong");
    }
  };

  return (
    <section className="fact">
      <Button onClick={getFact}>Get a fact</Button>
      <textarea className="fact_text" defaultValue={result} ref={resRef} rows="5" cols="50"></textarea>
    </section>
  );
}

export default Fact;
