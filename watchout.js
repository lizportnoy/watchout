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

var gameOver = function() {
  gameOptions.highScore[0] = Math.max(gameOptions.currentScore[0], gameOptions.highScore[0]);
  gameOptions.currentScore[0] = 0;
  gameOptions.collisions[0]++;
}

var playerStorage = {
    x: [476],
    y: [300]
  };

var movePlayer = function(d) {
  detectCollision();
  d3.select(this).attr("transform", function(d){
      return "translate(" + [ d.x[0],d.y[0] ] + ")"
  });
  d.x[0] = Math.min(Math.max(d.x[0] + d3.event.dx, 5), 950);
  d.y[0] = Math.min(Math.max(d.y[0] + d3.event.dy, 5), 595);
};


var drag = d3.behavior.drag()
  .origin(function(d) { return d; })
  .on('drag', movePlayer);

var player = d3.select('.gameBoard')
  .selectAll('.player')
  .data([playerStorage])
  .enter()
  .append('circle')
  .attr('class', 'player')
  .attr("transform", "translate(" + 476 + "," + 300 + ")")
  // .attr('x', function(d){return d.x[0]})
  // .attr('y', function(d){return d.y[0]})
  // .attr('width', 30)
  // .attr('height', 30)
  .attr('r',20)
  .attr('fill','pink')
  .call(drag)


// var detectCollision = function () {
//   console.log('this ran');
//   var enemyX;
//   var enemyY;
//   d3.select(this).each(function(d) {if(d.cx!==undefined){enemyX = d.cx});
//   d3.select(this).each(function(d) {if(d.cy!==undefined){enemyY = d.cy});
//   // if the x,y coordinates of the player match any of the x,y coordinates of the enemies within a set distance
//   var _distance = function(player) {
//     return Math.sqrt(Math.pow(player.x[0]-enemyX,2)+Math.pow(player.y[0]-enemyY,2));
//   };
//    console.log(_distance(playerStorage));
//    if(_distance(playerStorage)<30){
//      gameOver();
//    }
//   //}
// };

var detectCollision = function () {
  // if the x,y coordinates of the player match any of the x,y coordinates of the enemies within a set distance
  var _distance = function(player, enemy) {
    return Math.sqrt(Math.pow(player.x[0]-enemy.cx,2)+Math.pow(player.y[0]-enemy.cy,2));
  };
  for(var i = 0; i<enemies.length; i++){
    if(_distance(playerStorage, enemies[i])<30){
      gameOver();
    }
  }
};

var tweenFunc = function() {
  var self = this;
  return function(t) {
    detectCollision.call(self);
  };
};
  //.on("dragstart", function () {console.log('dragged')})
  //.on("dragend"/*, dragended*/);

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
  //detectCollision();

  circles.transition()
    .duration(500)
    .tween('custom', tweenFunc)
    .attr('cx', function(d) {d.update(); return d.cx})
    .attr('cy', function(d) { return d.cy})
    .attr('r', function(d) {return d.r})
    .attr('fill', function(d) {return d.fill})
}
  // .attr('cx', randWidth)
  // .attr('cy', randHeight)
  // .attr('r', 10)
  // .attr('fill', 'white')


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



