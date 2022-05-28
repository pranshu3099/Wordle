import { useEffect } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";

const Wordle = ({ solution }) => {
  const { currentGuess, handleKeyup, turn, guesses, isCorrect } =
    useWordle(solution);
  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);
    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup]);
  useEffect(() => {
    console.log(guesses, turn, isCorrect);
  }, [guesses, isCorrect, turn]);
  return (
    <div>
      <div>solution : {solution}</div>
      <div>current Guess : {currentGuess}</div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
    </div>
  );
};

export default Wordle;
