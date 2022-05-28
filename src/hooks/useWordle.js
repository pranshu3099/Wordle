import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]); //each guess is an array
  const [history, setHistory] = useState([]); // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false);

  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedArray = [...currentGuess].map((l) => {
      return { key: l, color: "grey" };
    });

    //find any green letters

    formattedArray.forEach((l, i) => {
      if (solutionArray[i] === l.key) {
        formattedArray[i].color = "green";
        solutionArray[i] = null;
      }
    });

    //find any yellow letters

    formattedArray.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== "green") {
        formattedArray[i].color = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });

    return formattedArray;
  };

  const addnewGuess = (format) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuessArray = [...prevGuesses];
      newGuessArray[turn] = format;
      return newGuessArray;
    });

    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });

    setTurn((prev) => {
      return prev + 1;
    });
    setCurrentGuess("");
  };

  const handleKeyup = ({ key }) => {
    if (key === "Enter") {
      if (turn > 5) {
        console.log("You used all your guesses");
        return;
      }
      if (history.includes(currentGuess)) {
        console.log("You already tried that word");
        return;
      }
      if (currentGuess.length !== 5) {
        console.log("Words must be 5 chars long");
        return;
      }
      const format = formatGuess();
      addnewGuess(format);
    }

    if (key === "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
      return;
    }

    if (/^[A-za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key;
        });
      }
    }
  };

  return { turn, currentGuess, guesses, isCorrect, handleKeyup };
};

export default useWordle;
