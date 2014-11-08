/**///Gameboard settings
var gameOptions = {
  highScore: [0],
  currentScore: [0],
  collisions: [0]
};

// updates scoreboard  using gameOptions
var gameDisplay = d3.select('.scoreboard')
  .selectAll('span')
  .data([gameOptions.highScore, gameOptions.currentScore, gameOptions.collisions]);

// updated scoreboard itself
var updateScore = function(){
  gameOptions.currentScore[0]++;
  gameDisplay.text(function(d){return d[0]});
}

// resets scoreboard values upon collision
var over = function() {
  gameOptions.highScore[0] = Math.max(gameOptions.currentScore[0], gameOptions.highScore[0]);
  gameOptions.currentScore[0] = 0;
  gameOptions.collisions[0]++;
  updateScore();
}

// throttles collision detection
var gameOver = _.throttle(over, 1000, {trailing: false});


//Setting the player
// creates player class (circle) with center starting coordinates
var Player = function() {
  this.x = [476];
  this.y = [300];
  this.r = 20;
  this.fill = "pink";
};

// instantiates our hero
var hero = new Player();

//allows us to move player coordinates as the player is dragged
var movePlayer = function(d) {
  //sets the coordinates within data to the current mouse location
  d.x[0] = Math.min(Math.max(d3.mouse(this)[0], 5), 950);
  d.y[0] = Math.min(Math.max(d3.mouse(this)[1], 5), 595);
  d3.select(this) // this refers to the DOM node of the hero
  .attr('cx', function(d) { return d.x[0]}) //sets coordinates of DOM node of hero to where mouse has moved
  .attr('cy', function(d) { return d.y[0]})
};

// variable drag points to d3's behavior property and selects the drag behavior
var drag = d3.behavior.drag()
  .origin(function(d) { return d; }) // set origin of svg object to the coordinates where it's at
  .on('drag', movePlayer); // when you're dragging, the movePlayer get's called

// adds player to DOM structure, takes data from player and binds it to the dom node
var player = d3.select('.gameBoard')
  .selectAll('.player') // non-existent
  .data([hero]) // binds the nodes to be created to the hero object
  .enter() // creates nodes
  .append('circle') // appends as circles
  .attr('cx', function(d) {return d.x[0]}) // set attributes using data
  .attr('cy', function(d) {return d.y[0]})
  .attr('class', 'player') // adds player class
  .attr('r',20)
  .attr('fill','pink')
  .call(drag) // (not your typical call). Drag is called in the context of the domNode

//#Creating the enemies

// wraps detect function so that it may be called between transitions
var tweenFunc = function() {
  return function(t) {
    detect();
  };
};

var randWidth = function() {
    return Math.random()*930+10;
};

var randHeight = function() {
    return Math.random()*580+10;
};

//created Enemy class at random coordinates
var Enemy = function(){
  this.cx = randWidth();
  this.cy = randHeight();
  this.r = 10;
  this.fill = 'white';
}

//allows enemy to update position
Enemy.prototype.update = function() {
  this.cx = randWidth();
  this.cy = randHeight();
};

var enemies = [];

//instantiates 15 enemies
for(var i = 0; i< 15; i++){
  enemies.push(new Enemy());
}

// creates a DOM node for each enemy element
var circles = d3.select('.gameBoard')
  .selectAll('.enemy')
  .data(enemies)
  .enter()
  .append('circle')
  .attr('class','enemy')
  .attr('cx', function(d) { return d.cx})
  .attr('cy', function(d) { return d.cy})
  .attr('r', function(d) {return d.r})
  .attr('fill', function(d) {return d.fill})

// function to shift enemies around the board
var moveEnemies = function () {
  circles.transition() // animates movement over 2 sec.
    .duration(2000)
    .tween('custom', tweenFunc) // detects collisions inbetween animations
    .attr('cx', function(d) {d.update(); return d.cx}) //updates new coordinates post animation;
    .attr('cy', function(d) { return d.cy})
    .attr('r', function(d) {return d.r})
    .attr('fill', function(d) {return d.fill})
}

// sets interval animation
window.setInterval(moveEnemies, 2000);

// detects when there is overlap of coordinates between player and enemy
var detectCollision = function (player, x, y) {

  var _distance = function(player, x, y) {
    return Math.sqrt(Math.pow(player.x[0]-x,2)+Math.pow(player.y[0]-y,2));
  };

  if(_distance(hero, x, y)<30){
      gameOver();
    }
};

// loops over all enemies and inputs callback function to retrieve their coordinates, then input into detect collision
var detect = function () {
  circles.each(function (d) {
    var x = d3.select(this).attr('cx');
    var y = d3.select(this).attr('cy');
    detectCollision(hero, x, y)
  });
}


