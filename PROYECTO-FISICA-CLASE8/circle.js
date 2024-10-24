/*function Circle(x,y,r){
    this.body = Bodies.circle(x, y, r);
    this.r = r;
    World.add(world,this.body);

    this.show = function () { 
     var pos = this.body.position;
     var angle = this.body.angle;
     push();
     translate(pos.x,pos.y);

     ellipse(0,0,this.r*2);
     pop();

    }
} 

function Circle(x, y, r) {
    var options = {
        restitution: 0.8 // Agregar propiedad de rebote
    };
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    World.add(world, this.body);

    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        fill(127);
        stroke(255);
        strokeWeight(2);
        ellipse(0, 0, this.r * 2);
        pop();
    };
}

*/


function Circle(x, y, r) { 
    var options = {
        restitution: 0.9, // Agregar propiedad de rebote para mantener el movimiento
        frictionAir: 0.001, // Reducir la fricción del aire para que sigan rebotando
        collisionFilter: {
            group: -1 // Configurar para que las pelotas no colisionen entre ellas
        }
    };
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    World.add(world, this.body);

    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        fill(127);
        stroke(255);
        strokeWeight(2);
        ellipse(0, 0, this.r * 2);
        pop();
    };

    this.keepMoving = function () {
        // Si la pelota no está siendo arrastrada, añadir una pequeña fuerza
        if (!mouseConstraint.body || mouseConstraint.body !== this.body) {
            var forceMagnitude = 0.0005;
            Matter.Body.applyForce(this.body, this.body.position, {
                x: random(-forceMagnitude, forceMagnitude),
                y: random(-forceMagnitude, forceMagnitude)
            });
        } else {
            // Si está siendo arrastrada, detenerla
            Matter.Body.setVelocity(this.body, { x: 0, y: 0 });
        }
    };
}

function createCelebration(x, y) {
    for (var i = 0; i < 5; i++) {
        celebrationParticles.push(new CelebrationParticle(x, y));
    }
}

function CelebrationParticle(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(1, 3));
    this.size = random(2, 5);
    this.lifetime = 255;

    this.update = function () {
        this.pos.add(this.vel);
        this.lifetime -= 5;
    };

    this.show = function () {
        noStroke();
        fill(255, this.lifetime);
        ellipse(this.pos.x, this.pos.y, this.size);
    };

    this.isOffScreen = function () {
        return this.lifetime < 0;
    };
}
