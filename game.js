var Arena = function(config){
  /* Assumptions:
   * - No initial array mutation
   * - Consistent row widths
   */
  var initialState = this.state = config.initialState;
  var width = this.width = initialState.length;
  var height = this.height = initialState[0].length;
};

Arena.prototype.tick = function(){
  var currentState = this.state;
  var newState = [];
  var count;
  var isAlive;
  var willBeAlive;

  for (var i = 0; i < this.width; i++) {
    // Initialize new row
    newState[i] = [];

    for (var j = 0; j < this.height; j++) {
      isAlive = currentState[i][j];
      count = this.countNeighbors(i, j);

      if (isAlive) {
        willBeAlive = (count === 2 || count === 3);
      } else {
        willBeAlive = (count === 3);
      }

      newState[i][j] = willBeAlive;
    }
  }

  this.state = newState;
};

Arena.prototype.countNeighbors = function(x, y) {
  // Set initial bounds
  var xMin = x - 1;
  var xMax = x + 1;
  var yMin = y - 1;
  var yMax = y + 1;

  // Sanity check bounds
  // Using widths/heights - 1 to shift into 0-based indexing
  if (xMin < 0) { xMin = 0; }
  if (xMax > this.width - 1) { xMax = this.width - 1; }
  if (yMin < 0) { yMin = 0; }
  if (yMax > this.height - 1) { yMax = this.height - 1; }

  var count = 0;

  for (var i = xMin; i <= xMax; i++) {
    for (var j = yMin; j <= yMax; j++) {
      // Skip self
      if (i === x && j === y) {
        continue;
      }

      if (this.state[i][j]) {
        count++;
      }
    }
  }

  return count;
}

module.exports = Arena;
