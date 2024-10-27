

document.addEventListener('DOMContentLoaded', function() {
    const countdownDate = new Date("October 28, 2024 00:00:00 GMT+0600").getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("day").innerText = days;
        document.getElementById("hour").innerText = hours;
        document.getElementById("minute").innerText = minutes;
        document.getElementById("second").innerText = seconds;

         // If the countdown is finished, display a message
		 if (distance < 0) {
            clearInterval(interval);
            document.getElementById('counter').style.display = 'none';
            document.getElementById('screen').style.display = 'block';

            document.getElementById('birth').style.display = 'block';
            
            fire(); // Start fireworks or initial action
            
            setTimeout(function() {
                document.getElementById('screen').style.display = 'none'; // Hide the screen after 3 seconds
				document.getElementById('birth').style.display = 'none';
                document.getElementById('c').style.display = 'block'; // Show element with ID 'c'
                fireCreker(); // Call fireCreker function
            }, 25000);
        }
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call to display countdown immediately
});


// birthday animation
function fireCreker()
{
    var w = c.width = window.innerWidth,
		h = c.height = window.innerHeight,
		ctx = c.getContext( '2d' ),
		
		hw = w / 2, // half-width
		hh = h / 2,
		
		opts = {
			strings: [ 'HAPPY', 'BIRTHDAY!', 'JANNATUL FERDAUS', 'ALLAH BLESS YOU', 'ALWAYS!'],
			charSize: 22,
			charSpacing: 20,
			lineHeight: 60,
			
			cx: w / 2,
			cy: h / 2,
			
			fireworkPrevPoints: 10,
			fireworkBaseLineWidth: 5,
			fireworkAddedLineWidth: 8,
			fireworkSpawnTime: 200,
			fireworkBaseReachTime: 30,
			fireworkAddedReachTime: 30,
			fireworkCircleBaseSize: 20,
			fireworkCircleAddedSize: 10,
			fireworkCircleBaseTime: 30,
			fireworkCircleAddedTime: 30,
			fireworkCircleFadeBaseTime: 10,
			fireworkCircleFadeAddedTime: 5,
			fireworkBaseShards: 5,
			fireworkAddedShards: 5,
			fireworkShardPrevPoints: 3,
			fireworkShardBaseVel: 4,
			fireworkShardAddedVel: 2,
			fireworkShardBaseSize: 3,
			fireworkShardAddedSize: 3,
			gravity: .1,
			upFlow: -.1,
			letterContemplatingWaitTime: 360,
			balloonSpawnTime: 20,
			balloonBaseInflateTime: 10,
			balloonAddedInflateTime: 10,
			balloonBaseSize: 20,
			balloonAddedSize: 20,
			balloonBaseVel: .4,
			balloonAddedVel: .4,
			balloonBaseRadian: -( Math.PI / 2 - .5 ),
			balloonAddedRadian: -1,
		},
		calc = {
			totalWidth: opts.charSpacing * Math.max( opts.strings[0].length, opts.strings[1].length )
		},
		
		Tau = Math.PI * 2,
		TauQuarter = Tau / 4,
		
		letters = [];

ctx.font = opts.charSize + 'px Verdana';

function Letter( char, x, y ){
	this.char = char;
	this.x = x;
	this.y = y;
	
	this.dx = -ctx.measureText( char ).width / 2;
	this.dy = +opts.charSize / 2;
	
	this.fireworkDy = this.y - hh;
	
	var hue = x / calc.totalWidth * 360;
	
	this.color = 'hsl(hue,80%,50%)'.replace( 'hue', hue );
	this.lightAlphaColor = 'hsla(hue,80%,light%,alp)'.replace( 'hue', hue );
	this.lightColor = 'hsl(hue,80%,light%)'.replace( 'hue', hue );
	this.alphaColor = 'hsla(hue,80%,50%,alp)'.replace( 'hue', hue );
	
	this.reset();
}
Letter.prototype.reset = function(){
	
	this.phase = 'firework';
	this.tick = 0;
	this.spawned = false;
	this.spawningTime = opts.fireworkSpawnTime * Math.random() |0;
	this.reachTime = opts.fireworkBaseReachTime + opts.fireworkAddedReachTime * Math.random() |0;
	this.lineWidth = opts.fireworkBaseLineWidth + opts.fireworkAddedLineWidth * Math.random();
	this.prevPoints = [ [ 0, hh, 0 ] ];
}
Letter.prototype.step = function(){
	
	if( this.phase === 'firework' ){
		
		if( !this.spawned ){
			
			++this.tick;
			if( this.tick >= this.spawningTime ){
				
				this.tick = 0;
				this.spawned = true;
			}
			
		} else {
			
			++this.tick;
			
			var linearProportion = this.tick / this.reachTime,
					armonicProportion = Math.sin( linearProportion * TauQuarter ),
					
					x = linearProportion * this.x,
					y = hh + armonicProportion * this.fireworkDy;
			
			if( this.prevPoints.length > opts.fireworkPrevPoints )
				this.prevPoints.shift();
			
			this.prevPoints.push( [ x, y, linearProportion * this.lineWidth ] );
			
			var lineWidthProportion = 1 / ( this.prevPoints.length - 1 );
			
			for( var i = 1; i < this.prevPoints.length; ++i ){
				
				var point = this.prevPoints[ i ],
						point2 = this.prevPoints[ i - 1 ];
					
				ctx.strokeStyle = this.alphaColor.replace( 'alp', i / this.prevPoints.length );
				ctx.lineWidth = point[ 2 ] * lineWidthProportion * i;
				ctx.beginPath();
				ctx.moveTo( point[ 0 ], point[ 1 ] );
				ctx.lineTo( point2[ 0 ], point2[ 1 ] );
				ctx.stroke();
			
			}
			
			if( this.tick >= this.reachTime ){
				
				this.phase = 'contemplate';
				
				this.circleFinalSize = opts.fireworkCircleBaseSize + opts.fireworkCircleAddedSize * Math.random();
				this.circleCompleteTime = opts.fireworkCircleBaseTime + opts.fireworkCircleAddedTime * Math.random() |0;
				this.circleCreating = true;
				this.circleFading = false;
				
				this.circleFadeTime = opts.fireworkCircleFadeBaseTime + opts.fireworkCircleFadeAddedTime * Math.random() |0;
				this.tick = 0;
				this.tick2 = 0;
				
				this.shards = [];
				
				var shardCount = opts.fireworkBaseShards + opts.fireworkAddedShards * Math.random() |0,
						angle = Tau / shardCount,
						cos = Math.cos( angle ),
						sin = Math.sin( angle ),
						
						x = 1,
						y = 0;
				
				for( var i = 0; i < shardCount; ++i ){
					var x1 = x;
					x = x * cos - y * sin;
					y = y * cos + x1 * sin;
					
					this.shards.push( new Shard( this.x, this.y, x, y, this.alphaColor ) );
				}
			}
			
		}
	} else if( this.phase === 'contemplate' ){
		
		++this.tick;
		
		if( this.circleCreating ){
			
			++this.tick2;
			var proportion = this.tick2 / this.circleCompleteTime,
					armonic = -Math.cos( proportion * Math.PI ) / 2 + .5;
			
			ctx.beginPath();
			ctx.fillStyle = this.lightAlphaColor.replace( 'light', 50 + 50 * proportion ).replace( 'alp', proportion );
			ctx.beginPath();
			ctx.arc( this.x, this.y, armonic * this.circleFinalSize, 0, Tau );
			ctx.fill();
			
			if( this.tick2 > this.circleCompleteTime ){
				this.tick2 = 0;
				this.circleCreating = false;
				this.circleFading = true;
			}
		} else if( this.circleFading ){
		
			ctx.fillStyle = this.lightColor.replace( 'light', 70 );
			ctx.fillText( this.char, this.x + this.dx, this.y + this.dy );
			
			++this.tick2;
			var proportion = this.tick2 / this.circleFadeTime,
					armonic = -Math.cos( proportion * Math.PI ) / 2 + .5;
			
			ctx.beginPath();
			ctx.fillStyle = this.lightAlphaColor.replace( 'light', 100 ).replace( 'alp', 1 - armonic );
			ctx.arc( this.x, this.y, this.circleFinalSize, 0, Tau );
			ctx.fill();
			
			if( this.tick2 >= this.circleFadeTime )
				this.circleFading = false;
			
		} else {
			
			ctx.fillStyle = this.lightColor.replace( 'light', 70 );
			ctx.fillText( this.char, this.x + this.dx, this.y + this.dy );
		}
		
		for( var i = 0; i < this.shards.length; ++i ){
			
			this.shards[ i ].step();
			
			if( !this.shards[ i ].alive ){
				this.shards.splice( i, 1 );
				--i;
			}
		}
		
		if( this.tick > opts.letterContemplatingWaitTime ){
			
			this.phase = 'balloon';
			
			this.tick = 0;
			this.spawning = true;
			this.spawnTime = opts.balloonSpawnTime * Math.random() |0;
			this.inflating = false;
			this.inflateTime = opts.balloonBaseInflateTime + opts.balloonAddedInflateTime * Math.random() |0;
			this.size = opts.balloonBaseSize + opts.balloonAddedSize * Math.random() |0;
			
			var rad = opts.balloonBaseRadian + opts.balloonAddedRadian * Math.random(),
					vel = opts.balloonBaseVel + opts.balloonAddedVel * Math.random();
			
			this.vx = Math.cos( rad ) * vel;
			this.vy = Math.sin( rad ) * vel;
		}
	} else if( this.phase === 'balloon' ){
			
		ctx.strokeStyle = this.lightColor.replace( 'light', 80 );
		
		if( this.spawning ){
			
			++this.tick;
			ctx.fillStyle = this.lightColor.replace( 'light', 70 );
			ctx.fillText( this.char, this.x + this.dx, this.y + this.dy );
			
			if( this.tick >= this.spawnTime ){
				this.tick = 0;
				this.spawning = false;
				this.inflating = true;	
			}
		} else if( this.inflating ){
			
			++this.tick;
			
			var proportion = this.tick / this.inflateTime,
			    x = this.cx = this.x,
					y = this.cy = this.y - this.size * proportion;
			
			ctx.fillStyle = this.alphaColor.replace( 'alp', proportion );
			ctx.beginPath();
			generateBalloonPath( x, y, this.size * proportion );
			ctx.fill();
			
			ctx.beginPath();
			ctx.moveTo( x, y );
			ctx.lineTo( x, this.y );
			ctx.stroke();
			
			ctx.fillStyle = this.lightColor.replace( 'light', 70 );
			ctx.fillText( this.char, this.x + this.dx, this.y + this.dy );
			
			if( this.tick >= this.inflateTime ){
				this.tick = 0;
				this.inflating = false;
			}
			
		} else {
			
			this.cx += this.vx;
			this.cy += this.vy += opts.upFlow;
			
			ctx.fillStyle = this.color;
			ctx.beginPath();
			generateBalloonPath( this.cx, this.cy, this.size );
			ctx.fill();
			
			ctx.beginPath();
			ctx.moveTo( this.cx, this.cy );
			ctx.lineTo( this.cx, this.cy + this.size );
			ctx.stroke();
			
			ctx.fillStyle = this.lightColor.replace( 'light', 70 );
			ctx.fillText( this.char, this.cx + this.dx, this.cy + this.dy + this.size );
			
			if( this.cy + this.size < -hh || this.cx < -hw || this.cy > hw  )
				this.phase = 'done';
			
		}
	}
}
function Shard( x, y, vx, vy, color ){
	
	var vel = opts.fireworkShardBaseVel + opts.fireworkShardAddedVel * Math.random();
	
	this.vx = vx * vel;
	this.vy = vy * vel;
	
	this.x = x;
	this.y = y;
	
	this.prevPoints = [ [ x, y ] ];
	this.color = color;
	
	this.alive = true;
	
	this.size = opts.fireworkShardBaseSize + opts.fireworkShardAddedSize * Math.random();
}
Shard.prototype.step = function(){
	
	this.x += this.vx;
	this.y += this.vy += opts.gravity;
	
	if( this.prevPoints.length > opts.fireworkShardPrevPoints )
		this.prevPoints.shift();
	
	this.prevPoints.push( [ this.x, this.y ] );
	
	var lineWidthProportion = this.size / this.prevPoints.length;
	
	for( var k = 0; k < this.prevPoints.length - 1; ++k ){
		
		var point = this.prevPoints[ k ],
				point2 = this.prevPoints[ k + 1 ];
		
		ctx.strokeStyle = this.color.replace( 'alp', k / this.prevPoints.length );
		ctx.lineWidth = k * lineWidthProportion;
		ctx.beginPath();
		ctx.moveTo( point[ 0 ], point[ 1 ] );
		ctx.lineTo( point2[ 0 ], point2[ 1 ] );
		ctx.stroke();
		
	}
	
	if( this.prevPoints[ 0 ][ 1 ] > hh )
		this.alive = false;
}
function generateBalloonPath( x, y, size ){
	
	ctx.moveTo( x, y );
	ctx.bezierCurveTo( x - size / 2, y - size / 2,
									 	 x - size / 4, y - size,
									   x,            y - size );
	ctx.bezierCurveTo( x + size / 4, y - size,
									   x + size / 2, y - size / 2,
									   x,            y );
}

function anim(){
	
	window.requestAnimationFrame( anim );
	
	ctx.fillStyle = '#111';
	ctx.fillRect( 0, 0, w, h );
	
	ctx.translate( hw, hh );
	
	var done = true;
	for( var l = 0; l < letters.length; ++l ){
		
		letters[ l ].step();
		if( letters[ l ].phase !== 'done' )
			done = false;
	}
	
	ctx.translate( -hw, -hh );
	
	if( done )
		for( var l = 0; l < letters.length; ++l )
			letters[ l ].reset();
}

for( var i = 0; i < opts.strings.length; ++i ){
	for( var j = 0; j < opts.strings[ i ].length; ++j ){
		letters.push( new Letter( opts.strings[ i ][ j ], 
														j * opts.charSpacing + opts.charSpacing / 2 - opts.strings[ i ].length * opts.charSize / 2,
														i * opts.lineHeight + opts.lineHeight / 2 - opts.strings.length * opts.lineHeight / 2 ) );
	}
}

anim();

window.addEventListener( 'resize', function(){
	
	w = c.width = window.innerWidth;
	h = c.height = window.innerHeight;
	
	hw = w / 2;
	hh = h / 2;
	
	ctx.font = opts.charSize + 'px Verdana';
})
}

// wish 
function fire(){
    
	var screenWidth = window.innerWidth;
	var screenHeight = window.innerHeight;
	var controller;
	
	var minVx = -10;
	var deltaVx = 20;
	var minVy = 25
	var deltaVy = 15;
	var minParticleV = 5;
	var deltaParticleV = 5;
	
	var gravity = 1;
	
	var explosionRadius = 500;
	var bombRadius = 3;
	var explodingDuration = 10;
	var explosionDividerFactor = 5; // I couldn't find a better name. Got any?
	
	var nBombs = 1; // initial
	var percentChanceNewBomb = 2;
	
	function Color(min) {
	  this.style = 'hsla(' + (Math.random() * 255) + ', 100%, 50%, 1.0)';
	};
	
	function colorValue(min) {
	  return Math.floor(Math.random() * (255 - min) + min);
	}
	
	function createColorStyle(r, g, b) {
	  return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)';
	}
	
	// A Bomb. Or firework.
	function Bomb() {
	  var self = this;
	  self.radius = bombRadius;
	  self.previousRadius = bombRadius;
	  self.explodingDuration = explodingDuration;
	  self.hasExploded = false;
	  self.alive = true;
	  self.color = new Color(160);
	
	  self.px = (window.innerWidth / 4) + (Math.random() * window.innerWidth / 2);
	  self.py = window.innerHeight;
	  self.vx = minVx + Math.random() * deltaVx;
	  self.vy = (minVy + Math.random() * deltaVy) * -1;
	
	  self.duration = 
		self.update = function(particlesVector) {
		if (self.hasExploded) {
		  var deltaRadius = explosionRadius - self.radius;
		  self.previousRadius = self.radius;
		  self.radius += deltaRadius / explosionDividerFactor;
		  self.explodingDuration--;
		  if (self.explodingDuration == 0) {
			self.alive = false;
		  }
		} else {
		  self.vx += 0;
		  self.vy += gravity;
		  if (self.vy >= 0) { // invertion point
			self.explode(particlesVector);
		  }
		  self.px += self.vx;
		  self.py += self.vy;
		}
	  };
	
	  self.draw = function(ctx) {
		ctx.beginPath();
		ctx.arc(self.px, self.py, self.previousRadius, 0, Math.PI * 2, false);
		if (self.hasExploded) {
		} else {
		  ctx.fillStyle = self.color.style;
		  ctx.lineWidth = 1;
		  ctx.fill();
		}
	  };
	
	  self.explode = function(particlesVector) {
		self.hasExploded = true;
		var e = 3 + Math.floor(Math.random() * 3);
		for(var j = 0; j < e; j++) {
		  var n = 10 + Math.floor(Math.random() * 21); // 10 - 30
		  var speed = minParticleV + Math.random() * deltaParticleV;
		  var deltaAngle = 2 * Math.PI / n;
		  var initialAngle = Math.random() * deltaAngle;
		  for(var i = 0; i < n; i++) {
			particlesVector.push(new Particle(self,  i * deltaAngle + initialAngle, speed));
		  }
		}
	  };
	
	}
	
	function Particle(parent, angle, speed) {
	  var self = this;
	  self.px = parent.px;
	  self.py = parent.py;
	  self.vx = Math.cos(angle) * speed;
	  self.vy = Math.sin(angle) * speed;
	  self.color = parent.color;
	  self.duration = 40 + Math.floor(Math.random() * 20);
	  self.alive = true;
	
	  self.update = function(){
		self.vx += 0;
		self.vy += gravity / 10;
	
		self.px += self.vx;
		self.py += self.vy;
		self.radius = 3;
	
		self.duration--;
		if(self.duration <= 0){
		  self.alive = false;
		}
	  };
	
	  self.draw = function(ctx) {
		ctx.beginPath();
		ctx.arc(self.px, self.py, self.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = self.color.style;
		ctx.lineWidth = 1;
		ctx.fill();
	  };
	}
	
	function Controller() {
	  var self = this;
	  self.canvas = document.getElementById("screen");
	  self.canvas.width = screenWidth;
	  self.canvas.height = screenHeight;
	  self.ctx = self.canvas.getContext('2d');
	  
	  function setSpeedParams() {
		var heightReached = 0;
		var vy = 0;
		while (heightReached < screenHeight && vy >= 0){
		  vy += gravity;
		  heightReached += vy;
		}
		minVy = vy / 2;
		deltaVy = vy - minVy;
		vx = (1 / 4) * screenWidth / (vy / 2);
		minVx = -vx;
		deltaVx = 2*vx;
	  };
	  
	  self.resize = function() {
		screenWidth = window.innerWidth;
		screenHeight = window.innerHeight;
		self.canvas.width = screenWidth;
		self.canvas.height = screenHeight;
		setSpeedParams();
	  };
	  
	  self.resize();
	  window.onresize = self.resize;
	  self.init = function(){
		self.readyBombs = [];
		self.explodedBombs = [];
		self.particles = [];
		for(var i = 0; i < nBombs; i++){
		  self.readyBombs.push(new Bomb());
		}
	  }
	  
	  self.update = function(){
		var aliveBombs = [];
		while(self.explodedBombs.length > 0){
		  var bomb = self.explodedBombs.shift();
		  bomb.update();
		  if (bomb.alive) {
			aliveBombs.push(bomb);
		  }
		}
		self.explodedBombs = aliveBombs;
		var notExplodedBombs = [];
		while (self.readyBombs.length > 0) {
		  var bomb = self.readyBombs.shift();
		  bomb.update(self.particles);
		  if (bomb.hasExploded){
			self.explodedBombs.push(bomb);
		  } else {
			notExplodedBombs.push(bomb);
		  }
		}
		self.readyBombs = notExplodedBombs;
		var aliveParticles = [];
		while (self.particles.length > 0) {
		  var particle = self.particles.shift();
		  particle.update();
		  if (particle.alive){
			aliveParticles.push(particle);
		  }
		}
		self.particles = aliveParticles;
	  }
	
	  self.draw = function() {
		self.ctx.beginPath();
		self.ctx.fillStyle='rgba(0, 0, 0, 0.1)'; // Ghostly effect
		self.ctx.fillRect(0, 0, self.canvas.width, self.canvas.height);
		self.ctx.globalCompositeOperation = 'lighter';
		for (var i = 0; i < self.readyBombs.length; i++){
		  self.readyBombs[i].draw(self.ctx);
		}
		for (var i = 0; i < self.explodedBombs.length; i++){
		  self.explodedBombs[i].draw(self.ctx);
		}
		for (var i = 0; i < self.particles.length; i++){
		  self.particles[i].draw(self.ctx);
		}
		self.ctx.globalCompositeOperation = 'source-over';
	  }
	  
	  self.animation = function() {
		self.update();
		self.draw();
		if (Math.random() * 100 < percentChanceNewBomb) {
		  self.readyBombs.push(new Bomb());
		}
		requestAnimationFrame(self.animation);
	  }
	}
	
	var controller = new Controller();
	controller.init();
	requestAnimationFrame(controller.animation);
	
}

