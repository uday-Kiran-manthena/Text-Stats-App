import React, { useState } from "react";
import "./TextStats.css";

const TextStats = () => {
  const [text, setText] = useState("");
  const [searchString, setSearchString] = useState("");
  const [replaceString, setReplaceString] = useState("");
  const [highlightedText, setHighlightedText] = useState("");

  const handleTextChange = (e) => {
    setText(e.target.value);
    setHighlightedText(e.target.value);
  };

  const handleReplace = () => {
    const newText = text.replace(new RegExp(searchString, "g"), replaceString);
    const highlighted = text.replace(
      new RegExp(searchString, "g"),
      `<mark>${replaceString}</mark>`
    );
    setText(newText);
    setHighlightedText(highlighted);
  };

  const getUniqueWordsCount = () => {
    const wordsArray = text.toLowerCase().match(/\b\w+\b/g) || [];
    const uniqueWords = new Set(wordsArray);
    return uniqueWords.size;
  };

  const getCharacterCount = () => {
    const charactersArray = text.replace(/[^a-zA-Z0-9]/g, "");
    return charactersArray.length;
  };

  return (
    <div className="text-stats-container">
      <h2>Real-time Text Statistics</h2>
      <textarea
        value={text}
        onChange={handleTextChange}
        rows="8"
        cols="50"
        placeholder="Type your text here..."
      ></textarea>

      <div className="stats">
        <p>Unique Words: {getUniqueWordsCount()}</p>
        <p>
          Character Count (Excluding Spaces and Punctuation):{" "}
          {getCharacterCount()}
        </p>
      </div>

      <div className="replace-section">
        <input
          type="text"
          placeholder="String to search"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
        <input
          type="text"
          placeholder="String to replace with"
          value={replaceString}
          onChange={(e) => setReplaceString(e.target.value)}
        />
        <button onClick={handleReplace}>Replace All</button>
      </div>

      <div
        className="highlighted-text"
        dangerouslySetInnerHTML={{ __html: highlightedText }}
      ></div>
    </div>
  );
};

export default TextStats;
