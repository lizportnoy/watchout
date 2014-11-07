// start slingin' some d3 here.

var gameOptions = {
  highScore: [1],
  currentScore: [0],
  collisions: [0]
};

var enemies = new Array(15);

var gameDisplay = d3.select('.scoreboard')
  .selectAll('span')
  .data([gameOptions.highScore, gameOptions.currentScore, gameOptions.collisions]);

var incrementScore = function(){
  console.log('!!');
  gameOptions.currentScore[0]++;
  gameDisplay.text(function(d){return d[0]});
}

var randWidth = function() {
    return Math.random()*930+10;
};

var randHeight = function() {
    return Math.random()*580+10;
};

var circles = d3.select('.gameBoard')
  .selectAll('circle')
  .data(enemies)
  .enter()
  .append('circle')
  .attr('cx', randWidth)
  .attr('cy', randHeight)
  .attr('r', 10)
  .attr('fill', 'white')

window.setInterval(incrementScore, 100);

var moveEnemies = function () {
  .attr('cx', randWidth)
  .attr('cy', randHeight)
  .attr('r', 10)
  .attr('fill', 'white')
}
