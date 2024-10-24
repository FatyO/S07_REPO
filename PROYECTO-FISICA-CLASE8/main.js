/*var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
//var circle1;
var circles = [];
var ground;

function setup() {
    createCanvas(400, 400);
    engine = Engine.create();
    world = engine.world;
   // circle1 = Bodies.circle(200, 100, 40);
    //World.add(world, circle1);
    Engine.run(engine);
    var options = {
        isStatic: true
    };
    ground = Bodies.rectangle(200, height , width, 20, options);
    World.add(world,ground);

    //circle1= new Circle (200,100,50);
}

function mousePressed(){
    circles.push(new Circle(mouseX,mouseY,20));
}

function draw() {
    background(51);
    Engine.update(engine);
    //ellipse(circle1.position.x, circle1.position.y, 80, 80);
    for (var i = 0; i < circles.length; i++){

    circles[i].show();
    }
}
/*
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
var circles = [];
var ground;
var walls = [];

function setup() {
    createCanvas(400, 400);
    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);

    var options = {
        isStatic: true
    };
    // Crear el suelo
    ground = Bodies.rectangle(200, height, width, 20, options);
    World.add(world, ground);

    // Crear paredes alrededor del canvas para que las pelotas reboten
    var wallOptions = {
        isStatic: true
    };
    var leftWall = Bodies.rectangle(0, height / 2, 20, height, wallOptions);
    var rightWall = Bodies.rectangle(width, height / 2, 20, height, wallOptions);
    var topWall = Bodies.rectangle(width / 2, 0, width, 20, wallOptions);

    // Agregar las paredes al mundo
    World.add(world, [leftWall, rightWall, topWall]);
    walls.push(leftWall, rightWall, topWall);
}

function mousePressed() {
    circles.push(new Circle(mouseX, mouseY, 20));
}

function draw() {
    background(51);
    Engine.update(engine);

    // Mostrar las pelotas
    for (var i = 0; i < circles.length; i++) {
        circles[i].show();
    }

    // Dibujar el suelo y las paredes
    fill(127);
    rectMode(CENTER);
    rect(ground.position.x, ground.position.y, width, 20);
    for (var i = 0; i < walls.length; i++) {
        rect(walls[i].position.x, walls[i].position.y, walls[i].bounds.max.x - walls[i].bounds.min.x, walls[i].bounds.max.y - walls[i].bounds.min.y);
    }
}
*/


var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Events = Matter.Events,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

var engine;
var world;
var circles = [];
var celebrationParticles = [];
var mouseConstraint;

function setup() {
    // Crear un canvas que cubra toda la pantalla
    createCanvas(windowWidth, windowHeight);
    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);

    // Crear bordes alrededor del canvas para que las pelotas reboten
    var wallOptions = {
        isStatic: true
    };
    var leftWall = Bodies.rectangle(0, height / 2, 20, height, wallOptions);
    var rightWall = Bodies.rectangle(width, height / 2, 20, height, wallOptions);
    var topWall = Bodies.rectangle(width / 2, 0, width, 20, wallOptions);
    var bottomWall = Bodies.rectangle(width / 2, height, width, 20, wallOptions);

    // Agregar las paredes al mundo
    World.add(world, [leftWall, rightWall, topWall, bottomWall]);

    // Generar muchos círculos al azar
    for (var i = 0; i < 100; i++) {
        circles.push(new Circle(random(20, width - 20), random(20, height - 20), random(10, 20)));
    }

    // Configurar la interacción con el ratón
    var canvasMouse = Mouse.create(canvas.elt);
    var optionsMouse = {
        mouse: canvasMouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    };
    mouseConstraint = MouseConstraint.create(engine, optionsMouse);
    World.add(world, mouseConstraint);

    // Detectar colisiones
    Events.on(engine, 'collisionStart', function(event) {
        var pairs = event.pairs;
        for (var i = 0; i < pairs.length; i++) {
            var bodyA = pairs[i].bodyA;
            var bodyB = pairs[i].bodyB;

            // Verificar si la colisión involucra un círculo
            var circleBody = circles.find(circle => circle.body === bodyA || circle.body === bodyB);
            if (circleBody) {
                var pos = circleBody.body.position;
                createCelebration(pos.x, pos.y);
            }
        }
    });
}

function draw() {
    // Establecer el fondo en negro
    background(0); // Cambiado a negro
    Engine.update(engine);

    // Mantener las pelotas en movimiento
    for (var i = 0; i < circles.length; i++) {
        circles[i].keepMoving();
        circles[i].show();
    }

    // Mostrar partículas de celebración
    for (var i = celebrationParticles.length - 1; i >= 0; i--) {
        celebrationParticles[i].show();
        celebrationParticles[i].update();
        if (celebrationParticles[i].isOffScreen()) {
            celebrationParticles.splice(i, 1);
        }
    }
}

