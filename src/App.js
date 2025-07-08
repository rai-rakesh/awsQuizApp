import React, { useState } from "react";
import quizData from "./quizData";

function App() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [jumpInput, setJumpInput] = useState("");

  const question = quizData[current];

  const handleOptionClick = (option) => {
    setSelected(option);
    setShowAnswer(true);
  };

  const handleNext = () => {
    setSelected(null);
    setShowAnswer(false);
    setCurrent((prev) => prev + 1);
  };

  const handleJump = () => {
    const index = parseInt(jumpInput, 10) - 1;
    if (!isNaN(index) && index >= 0 && index < quizData.length) {
      setCurrent(index);
      setSelected(null);
      setShowAnswer(false);
      setJumpInput("");
    } else {
      alert("Invalid question number");
    }
  };

  return (
    <div style={{ padding: 30, fontFamily: "Arial", maxWidth: 800, margin: "auto" }}>
      <h2>Question {current + 1}</h2>

     
      <p>{question.question}</p>
      <div>
        {Object.entries(question.options).map(([key, value]) => (
          <button
            key={key}
            onClick={() => handleOptionClick(key)}
            disabled={showAnswer}
            style={{
              display: "block",
              margin: "10px 0",
              padding: "10px",
              background:
                showAnswer && key === question.answer
                  ? "green"
                  : showAnswer && key === selected
                  ? "red"
                  : "#eee",
              color: "black",
              border: "1px solid #ccc",
              width: "100%",
              textAlign: "left"
            }}
          >
            {key}. {value}
          </button>
        ))}
      </div>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
      {showAnswer && (
        <div style={{ marginTop: 20 }}>
          <p>
            {selected === question.answer
              ? "✅ Correct!"
              : `❌ Incorrect. Correct answer: ${question.answer}`}
          </p>
          <p>
             Community Answer : {question.community}
          </p>
          {current + 1 < quizData.length ? (
            <button onClick={handleNext}>Next Question</button>
          ) : (
            <p>🎉 You've completed the quiz!</p>
          )}
        </div>
        
      )}
       <div>
        <label>Jump to:</label>
        <input
          type="number"
          min="1"
          max={quizData.length}
          value={jumpInput}
          onChange={(e) => setJumpInput(e.target.value)}
          style={{ margin: "0 10px", padding: "5px" }}
        />
        <button onClick={handleJump}>Go</button>
      </div>
      </div>
    </div>
  );
}

export default App;
