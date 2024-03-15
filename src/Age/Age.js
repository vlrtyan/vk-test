import React from "react";
import './Age.css';
import {
  FormItem,
  Input,
  Button
} from "@vkontakte/vkui";

function Age() {
  const [age, setAge] = React.useState("");
  const [input, setInput] = React.useState("");
  const [lastSearch, setLastSearch] = React.useState("");
  const [submitTimer, setSubmitTimer] = React.useState(null);
  let controller;
  let signal;

  const handleChange = (event) => {
    submitTimer && clearTimeout(submitTimer);
    setInput(event.target.value);
  };

  const requestAge = (name) => {
    controller = new AbortController();
    signal = controller.signal;

    fetch(`https://api.agify.io?name=${name}`, { signal })
      .then((res) => res.json())
      .then((json) => {
        setAge(json.age);
        setLastSearch(name);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = () => {
    clearTimeout(submitTimer);
    controller && controller.abort();
    if (input !== lastSearch && input !== "") {
      requestAge(input);
    } else {
      console.log(`err: same search: ${input}`);
    }
  };

  React.useEffect(() => {
    setSubmitTimer(setTimeout(handleSubmit, 3000));

    return () => clearTimeout(submitTimer);
  }, [input]);


  return (
    <section className="age">
      <FormItem top="Name" htmlFor="name">
        <Input id="name" placeholder="Valeria" onChange={handleChange} />
      </FormItem>
      <Button onClick={handleSubmit}>
        Get an age
      </Button>
      <p>{age}</p>
    </section>
  );
}

export default Age;
