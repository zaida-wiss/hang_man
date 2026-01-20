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
  const maxWrong = 6;


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

const isGameOver = count >=maxWrong;

const isWinner = secretWord
  .split("")
  .every((letter) => guesses.includes(letter));


return (
  <div style={{ backgroundColor: "red",
                padding: 20,
                textAlign: "center",
  }}>

      <h1>{title}</h1>
      <p>Fel: {count}/ {maxWrong}</p>
      <p>
{isWinner && <p>🎉 Du vann!</p>}
{isGameOver && !isWinner && <p>💀 Game over! Ordet var: {secretWord}</p>}


        {secretWord.split("").map((letter, index) =>
        guesses.includes(letter) ? (
          <span key={index}>{letter} </span>
        ):(
          <span key={index}>_ </span>
        )
      )}
      </p>
        <form onSubmit={handleNewGuess}>

        <input
          type="text"
          value={guess}
          onChange={(event) => setGuess(event.target.value)}
          disabled= {isGameOver || isWinner}  />

        <button type="submit" disabled= {isGameOver || isWinner} >Gissa</button>
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