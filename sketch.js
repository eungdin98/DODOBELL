let dobell;

const particles = [];
function setup() {
	createCanvas(800, 800);
    dobell = new Dobell(width / 2, height / 2, 200);
	
	const particlesLength = Math.min(Math.floor(window.innerWidth / 10), 100);
	for(let i=0; i<particlesLength; i++) {
		particles.push(new Particle());
	}
}

function draw() {
	background(20);
    dobell.display(mouseX, mouseY);

	
	particles.forEach((particle, idx) => {
		particle.update();
		particle.draw();
		particle.checkParticles(particles.slice(idx));
	});
}
class Dobell {
   constructor(x_, y_, r_) {
    this.x = x_;
    this.y = y_;
    this.r = r_;
  }
  contains(mx, my) {
    return dist(mx, my, this.x, this.y) < this.r;
  }
  
  display(mx, my) {
    if (this.contains(mx, my)) {
      fill(0);
    } else {
      fill(175);
    }
    stroke(0);
    strokeWeight(1);
    ellipse(this.x, this.y, this.r, this.r);
  }
}


class Particle {
	constructor() {
		this.pos = createVector(random(width), random(height));
		this.vel = createVector(random(-2, 2), random(-2, 2));
		this.size = 5;
	}
	
	update() {
		this.pos.add(this.vel);
		this.edges();
	}
	
	draw() {
		noStroke();
		fill('rgba(255, 255, 255, 0.5)');
		circle(this.pos.x, this.pos.y, this.size * 2);
	}
	
	edges() {
		if(this.pos.x < 0 || this.pos.x > width) {
			this.vel.x *= -1;
		}
		
		if(this.pos.y < 0 || this.pos.y > height) {
			this.vel.y *= -1;
		}
	}
	
	checkParticles(particles) {
		particles.forEach(particle => {
			const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
			if(d < 120) {
				const alpha = map(d, 0, 120, 0, 0.25)
				stroke(`rgba(255, 255, 255, ${alpha})`);
				line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y)
			}
		});
	}
}


