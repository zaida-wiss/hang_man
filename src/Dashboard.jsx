import { useState, useEffect } from "react";

const Dashboard = ({ title }) => {
  const [count, setCount] = useState(0);
  const [guess, setGuess] = useState("hej");

  useEffect(() => {
  if (count > 0) {
    // logik här
    console.log("Ökade med ett poäng:", count);
  }
}, [count]);

  useEffect(() => {
  if (guess.trim().length > 0) {
    // logik här
console.log("Du gissade:", guess);
  }
}, [guess]);


  return (
    <div>
      <h1>{title}</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Öka
      </button>
<input
  type="text"
  value={guess}
  onChange={(event) => setGuess(event.target.value)}
/>

    </div>
  );
};

export default Dashboard;