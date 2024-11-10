// components/ResultDisplay.js

const ResultDisplay = ({ result }) => {
    return (
      <div>
        <h2>Kết quả:</h2>
        <p>{result.join(', ')}</p>
      </div>
    );
  };
  
  export default ResultDisplay;