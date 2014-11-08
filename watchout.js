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

var gameOver = function() {
  gameOptions.highScore[0] = Math.max(gameOptions.currentScore[0], gameOptions.highScore[0]);
  gameOptions.currentScore[0] = 0;
  gameOptions.collisions[0]++;
}

var moveEnemies = function () {
  incrementScore();
  circles.transition()
  .duration(500)
  .attr('cx', randWidth)
  .attr('cy', randHeight)
  .attr('r', 10)
  .attr('fill', 'white')
}


var circles = d3.select('.gameBoard')
  .selectAll('circle')
  .data(enemies)
  .enter()
  .append('circle')
  .attr('cx', randWidth)
  .attr('cy', randHeight)
  .attr('r', 10)
  .attr('fill', 'white')
  //.on('mouseover',gameOver);

var drag = d3.behavior.drag()
  .on('drag', function(){console.log('it worked!')});
  //.on("dragstart", function () {console.log('dragged')})
  //.on("dragend"/*, dragended*/);

var player = d3.select('.gameBoard')
  .selectAll('rect')
  .data([null])
  .enter()
  .append('rect')
  .attr('x', 476)
  .attr('y', 300)
  .attr('width', 30)
  .attr('height', 30)
  .attr('fill','pink')
  .call(drag)

window.setInterval(moveEnemies, 1000);



