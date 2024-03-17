import React from "react";
import "./Age.css";
import { FormItem, Input, Button } from "@vkontakte/vkui";

function Age() {
  const nameSymbols = /^[a-zA-Z\s-]+$/;
  const [result, setResult] = React.useState("");
  const [input, setInput] = React.useState("");
  const [lastSearch, setLastSearch] = React.useState("");
  const [submitTimer, setSubmitTimer] = React.useState(null);
  const [error, setError] = React.useState("");
  const isValid = error === undefined;
  const [controller, setController] = React.useState(null);

  const validation = (value) => {
    if (!value) {
      return "Required";
    } else if (!nameSymbols.test(value)) {
      return "Enter only latin leters";
    }
  };

  const handleChange = (e) => {
    submitTimer && clearTimeout(submitTimer);
    setInput(e.target.value);
    setError(validation(e.target.value));
  };

  const handleSubmit = (e) => {
    e && e.preventDefault();
    clearTimeout(submitTimer);
    if (input !== lastSearch && isValid) {
      requestAge(input);
    }
  };

  const requestAge = async (name) => {
    controller && controller.abort();
    const newController = new AbortController();
    setController(newController);
    try {
      const res = await fetch(`https://api.agify.io?name=${name}`, {
        signal: newController.signal,
      });
      const json = await res.json();
      json.age === null ? setResult("No information") : setResult(json.age);
      setLastSearch(name);
    } catch (err) {
      if (err.name === 'AbortError') return;
      setResult("Something went wrong");
    }
  };

  React.useEffect(() => {
    isValid && setSubmitTimer(setTimeout(handleSubmit, 3000));

    return () => clearTimeout(submitTimer);
  }, [input]);

  return (
    <section className="age">
      <form className="age__form" onSubmit={handleSubmit}>
        <FormItem
          top="Name"
          bottom={error ? error : "Type your name"}
          status={error ? "error" : "default"}
        >
          <Input
            id="name"
            name="name"
            placeholder="Valeria"
            required
            onChange={handleChange}
          />
        </FormItem>
        <Button type="submit" onSubmit={handleSubmit} disabled={!isValid}>
          Get an age
        </Button>
      </form>
      <p>{result}</p>
    </section>
  );
}

export default Age;
