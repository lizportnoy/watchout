// start slingin' some d3 here.

var gameOptions = {
  highScore: [1],
  currentScore: [0],
  collisions: [0]
};

var gameDisplay = d3.select('.scoreboard')
  .selectAll('span')
  .data([gameOptions.highScore, gameOptions.currentScore, gameOptions.collisions]);

var incrementScore = function(){
  gameOptions.currentScore[0]++;
  gameDisplay.text(function(d){return d[0]});
}

var over = function() {
  gameOptions.highScore[0] = Math.max(gameOptions.currentScore[0], gameOptions.highScore[0]);
  gameOptions.currentScore[0] = 0;
  gameOptions.collisions[0]++;
}

var gameOver = _.throttle(over, 1000, {trailing: false});


var Player = function() {
  this.x = [476];
  this.y = [300];
  this.r = 20;
  this.fill = "pink";
};

Player.prototype.reset = function () {
  this.x = [476];
  this.y = [300];
}

var hero = new Player();

var movePlayer = function(d) {
  d.x[0] = Math.min(Math.max(d3.mouse(this)[0], 5), 950);
  d.y[0] = Math.min(Math.max(d3.mouse(this)[1], 5), 595);
  d3.select(this)
  .attr('cx', function(d) { return d.x[0]})
  .attr('cy', function(d) { return d.y[0]})
};

var drag = d3.behavior.drag()
  .origin(function(d) { return d; })
  .on('drag', movePlayer);

var player = d3.select('.gameBoard')
  .selectAll('.player')
  .data([hero])
  .enter()
  .append('circle')
  .attr('cx', function(d) {return d.x[0]})
  .attr('cy', function(d) { return d.y[0]})
  .attr('class', 'player')
  .attr('r',20)
  .attr('fill','pink')
  .call(drag)


var tweenFunc = function() {
  var self = this;
  return function(t) {
    detect();
  };
};

var enemies = [];

var randWidth = function() {
    return Math.random()*930+10;
};

var randHeight = function() {
    return Math.random()*580+10;
};

var Enemy = function(){
  this.cx = randWidth();
  this.cy = randHeight();
  this.r = 10;
  this.fill = 'white';
}

Enemy.prototype.update = function() {
  this.cx = randWidth();
  this.cy = randHeight();
};

for(var i = 0; i< 15; i++){
  enemies.push(new Enemy());
}
var moveEnemies = function () {
  incrementScore();

  circles.transition()
    .duration(2000)
    .tween('custom', tweenFunc)
    .attr('cx', function(d) {d.update();console.log(d.cx,d.cy); return d.cx})
    .attr('cy', function(d) { return d.cy})
    .attr('r', function(d) {return d.r})
    .attr('fill', function(d) {return d.fill})
}

var circles = d3.select('.gameBoard')
  .selectAll('.enemy')
  .data(enemies)
  .enter()
  .append('circle')
  .attr('class','enemy')
  // on appending, enact into motion the set interval
  .attr('cx', function(d) { return d.cx})
  .attr('cy', function(d) { return d.cy})
  .attr('r', function(d) {return d.r})
  .attr('fill', function(d) {return d.fill})
  //.on('mouseover',gameOver);
window.setInterval(moveEnemies, 2000);
//window.setInterval(function() {console.log(circles.attr('cx'))},0);

var detect = function () {
  circles.each(function (d) {
    var x = d3.select(this).attr('cx');
    var y = d3.select(this).attr('cy');
    detectCollision(hero, x, y)
  });
}

var detectCollision = function (player, x, y) {
  // if the x,y coordinates of the player match any of the x,y coordinates of the enemies within a set distance
  var _distance = function(player, x, y) {
    return Math.sqrt(Math.pow(player.x[0]-x,2)+Math.pow(player.y[0]-y,2));
  };

  if(_distance(hero, x, y)<30){
      gameOver();
    }
};
