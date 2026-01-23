import { useEffect, useReducer } from "react";

const initialState = {
  count: 0,
  guess: "",
  guesses: [],
  error: "",
};

function gameReducer(state, action) {
  switch (action.type) {
    case "SET_GUESS":
      return { ...state, guess: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    case "ADD_GUESS":
      return { ...state, guesses: [...state.guesses, action.payload] };

    case "INC_COUNT":
      return { ...state, count: state.count + 1 };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

const Dashboard = ({ title }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { count, guess, guesses, error } = state;

  const secretWord = "react";
  const maxWrong = 6;

  useEffect(() => {
    if (count > 0) console.log("Ökade med ett poäng:", count);
  }, [count]);

  useEffect(() => {
    if (guess.trim().length > 0) console.log("Du gissade:", guess);
  }, [guess]);

  const handleNewGuess = (event) => {
    event.preventDefault();

    const cleanedGuess = guess.trim().toLowerCase();

    if (!cleanedGuess) {
      dispatch({ type: "SET_ERROR", payload: "Du har inte skrivit någonting" });
      return;
    }

    if (cleanedGuess.length !== 1) {
      dispatch({
        type: "SET_ERROR",
        payload: "Skriv endast en bokstav i taget",
      });
      return;
    }

    if (guesses.includes(cleanedGuess)) {
      dispatch({
        type: "SET_ERROR",
        payload: "Du har redan gissat på den här bokstaven",
      });
      return;
    }

    if (!secretWord.includes(cleanedGuess)) {
      dispatch({ type: "INC_COUNT" });
    }

    dispatch({ type: "SET_ERROR", payload: "" });
    dispatch({ type: "ADD_GUESS", payload: cleanedGuess });
    dispatch({ type: "SET_GUESS", payload: "" });
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
  };

  const isGameOver = count >= maxWrong;
  const isWinner = secretWord.split("").every((letter) => guesses.includes(letter));

  return (
    <div
      style={{
        backgroundColor: "red",
        padding: 20,
        textAlign: "center",
      }}
    >
      <h1>{title}</h1>
      <p>Fel: {count}/ {maxWrong}</p>

      <div>
        {isWinner && <p>🎉 Du vann!</p>}
        {isGameOver && !isWinner && <p>💀 Game over! Ordet var: {secretWord}</p>}

        <p>
          {secretWord.split("").map((letter, index) =>
            guesses.includes(letter) ? (
              <span key={index}>{letter} </span>
            ) : (
              <span key={index}>_ </span>
            )
          )}
        </p>
      </div>

      <form onSubmit={handleNewGuess}>
        <input
          className="inputBox"
          type="text"
          value={guess}
          onChange={(event) =>
            dispatch({ type: "SET_GUESS", payload: event.target.value })
          }
          disabled={isGameOver || isWinner}
        />

        <button type="submit" disabled={isGameOver || isWinner}>
          Gissa
        </button>
      </form>

      {error && <p>{error}</p>}

      <ul>
        {guesses.map((g, index) => (
          <li key={index}>{g}</li>
        ))}
      </ul>

      {(isGameOver || isWinner) && <button onClick={handleReset}>Reset</button>}
    </div>
  );
};

export default Dashboard;
