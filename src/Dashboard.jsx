import { useState, useEffect } from "react";

const Dashboard = ({ title }) => {
  const [count, setCount] = useState(0);
  const [guess, setGuess] = useState("hej");
  const [guesses, setGuesses] = useState([]);
  const [error, setError] = useState("");

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

  const secretWord = "react";

const handleNewGuess = (event) => {
  event.preventDefault();           // 1. stoppa reload

  const cleanedGuess = guess.trim().toLowerCase();

  if (!cleanedGuess) {
    setError("Du har inte skrivit någonting");
    return;
  }

  if (cleanedGuess.length !== 1) {
    setError("Skriv endast en bokstav i taget");
    return;
  }

  if (guesses.includes(cleanedGuess)) {
    setError("Du har redan gissat på den här bokstaven");
    return;
  }

  if (!secretWord.includes(cleanedGuess)) {
    setCount((prev) => prev+1);
  }

  setError("");
  setGuesses((prevGuesses) => [...prevGuesses, cleanedGuess]);  // 2. lägg till gissning
  setGuess("");              // 3. töm input


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
      {error && <p>{error}</p>}
      <ul>
        {guesses.map((g, index) => (
          <li key={index}>{g}</li>
        ))}
      </ul>

    </div>
  );
};

export default Dashboard;