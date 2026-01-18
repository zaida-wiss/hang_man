import { useState, useEffect } from "react";

const Dashboard = ({ title }) => {
  const [count, setCount] = useState(0);
  const [guess, setGuess] = useState("hej");
  const [guesses, setGuesses] = useState([]);

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

const handleNewGuess = (event) => {
  event.preventDefault();           // 1. stoppa reload

  const cleanedGuess = guess.trim().toLowerCase();
  if (!cleanedGuess) return;
  if (guesses.includes(cleanedGuess)) return;

  setGuesses((prevGuesses) => [...prevGuesses, cleanedGuess]);  // 2. lägg till gissning
  setGuess("");                     // 3. töm input
};

return (
  <div>
      <h1>{title}</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Öka
      </button>
      <form onSubmit={handleNewGuess}>
        <input
          type="text"
          value={guess}
          onChange={(event) => setGuess(event.target.value)}  />
        <button type="submit">Gissa</button>
      </form>
      <ul>
        {guesses.map((g, index) => (
          <li key={index}>{g}</li>
        ))}
      </ul>

    </div>
  );
};

export default Dashboard;