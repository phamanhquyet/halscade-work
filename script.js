function extractOperatorsOperands(code) {
    var operators = code.match(/[+\-*\/%=&|><!^~?:]+/g) || [];
    var operands = code.match(/\b\w+\b/g) || [];
    return [new Set(operators), new Set(operands)];
  }
  
  function calculateHalsteadMetrics(operators, operands) {
    var n1 = operators.size;
    var n2 = operands.size;
    var N1 = Array.from(operators).reduce((sum, op) => sum + countOccurrences(op), 0);
    var N2 = Array.from(operands).reduce((sum, op) => sum + countOccurrences(op), 0);
    var N = N1 + N2;
    var n = n1 + n
    var length = N * Math.log2(n);
    var vocabulary = n1 * Math.log2(n1) + n2 * Math.log2(n2);
    var volume = N * Math.log2(vocabulary);
    var difficulty = (n1 / 2) * (N2 / n2);
    var effort = difficulty * volume;
    var time = effort / 18;
    var bugs = volume / 3000;
    return {
      n1: n1,
      n2: n2,
      N1: N1,
      N2: N2,
      length: length,
      vocabulary: vocabulary,
      volume: volume,
      difficulty: difficulty,
      effort: effort,
      time: time,
      bugs: bugs
    };
  }
  
  function countOccurrences(code,str) {
    return (code.match(new RegExp(str, 'g')) || []).length;
  }
  
  function displayResults(results) {
    var resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
      <h2>Results:</h2>
      <table>
        <tr><td>n1:</td><td>${results.n1}</td></tr>
        <tr><td>n2:</td><td>${results.n2}</td></tr>
        <tr><td>N1:</td><td>${results.N1}</td></tr>
        <tr><td>N2:</td><td>${results.N2}</td></tr>
        <tr><td>Program length (n):</td><td>${results.length.toFixed(2)}</td></tr>
        <tr><td>Vocabulary size (n<sub>1</sub>+n<sub>2</sub>):</td><td>${results.vocabulary.toFixed(2)}</td></tr>
        <tr><td>Program volume (N*log<sub>2</sub>n):</td><td>${results.volume.toFixed(2)}</td></tr>
        <tr><td>Difficulty (n<sub>1</sub>/2)*(N<sub>2</sub>/n<sub>2</sub>):</td><td>${results.difficulty.toFixed(2)}</td></tr>
        <tr><td>Effort (Difficulty*Volume):</td><td>${results.effort.toFixed(2)}</td></tr>
        <tr><td>Time (Effort/18):</td><td>${results.time.toFixed(2)}</td></tr>
        <tr><td>Bugs (Volume/3000):</td><td>${results.bugs.toFixed(2)}</td></tr>
      </table>
    `;
  }
  
  function calculateMetrics() {
    var code = document.getElementById('code-input').value;
    var [operators, operands] = extractOperatorsOperands(code);
    var results = calculateHalsteadMetrics(operators, operands);
    displayResults(results);
  }
  
  document.getElementById('calculate-button').addEventListener('click', calculateMetrics);
    