// start slingin' some d3 here.

var gameOptions = {
  highScore: [1],
  currentScore: [0],
  collisions: [0]
};

var playerStorage = [{
    x: [476],
    y: [300]
  }];

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

var enemies = [];

var Enemy = function(){
  this.cx = randWidth();
  this.cy = randHeight();
  this.r = 10;
  this.fill = 'white';
}

for(var i = 0; i< 15; i++){
  enemies.push(new Enemy());
}

var movePlayer = function(d) {
  d3.select(this).attr("transform", function(d){
      return "translate(" + [ d.x[0],d.y[0] ] + ")"
  });
  d.x[0] += d3.event.dx;
  d.y[0] += d3.event.dy;
};

var circles = d3.select('.gameBoard')
  .selectAll('circle')
  .data(enemies)
  .enter()
  .append('circle')
  .attr('cx', function(d) { return d.cx})
  .attr('cy', function(d) { return d.cy})
  .attr('r', function(d) {return d.r})
  .attr('fill', function(d) {return d.fill})
  //.on('mouseover',gameOver);

var drag = d3.behavior.drag()
  .origin(function(d) { return d; })
  .on('drag', movePlayer);
  //.on("dragstart", function () {console.log('dragged')})
  //.on("dragend"/*, dragended*/);

var player = d3.select('.gameBoard')
  .selectAll('rect')
  .data(playerStorage)
  .enter()
  .append('rect')
  .attr("transform", "translate(" + 476 + "," + 300 + ")")
  // .attr('x', function(d){return d.x[0]})
  // .attr('y', function(d){return d.y[0]})
  .attr('width', 30)
  .attr('height', 30)
  .attr('fill','pink')
  .call(drag)

window.setInterval(moveEnemies, 1000);



