let dino;
let ground;
let cactusGroup;
let gravity = 0.6;
let jumpPower = -12;
let score = 0;
let gameState = "menu"; // Estados del juego: 'menu', 'playing', 'help'
let isJumping = false;

let bottle;
let bottleExist = false;
let fire;

let fondoPos1 = 0;
let fondoPos2 = 0;
let fondo;
let ovnisGroup;
let jumpSound;

function preload() {
	// Carga la imagen de fondo
	fondo = loadImage('sprites/fondos/FONDO CHETO FINAL.png'); // Cambia a la ruta de tu imagen
	jumpSound = loadSound("sprites/sonidos/Musicaoniet.m4a");
}

function setup() {
	createCanvas(windowWidth, (windowHeight / 3) * 2);
}

function draw() {
	jumpSound.play();
	background(200);

	if(gameState !== "end" && gameState !== "menu"){
		image(fondo, fondoPos1, 0, (height * fondo.width) / fondo.height, height);
		image(fondo, fondoPos2, 0, (height * fondo.width) / fondo.height, height);
	}

	if(gameState === "menu"){
		
	}
	

	if (gameState === "menu") {
		drawMenu();
	} else if (gameState === "playing") {
		drawGame();
	} else if (gameState === "help") {
		drawHelp();
	} else if (gameState === "gameOver") {
		drawGameOver();
	}else if (gameState === "end") {
		drawGameOver();
	}

}

function drawEnd(){
	
}

function resetGame() {
	fondoPos1 = 0
	fondoPos2 = fondo.width * 2
	// Reiniciar variables para un nuevo juego
	dino = new Sprite(100, height - 70, 10, 40);
	dino.rotationLock = true; // Bloquear rotación
	dino.image = "sprites/pandillero/PANDILLERO0.png"
	dino.scale = 3

	// Crear el suelo
	ground = new Sprite(width / 2, height - 10, width, 20, 'static');
	ground.visible = true

	// Crear grupo de cactus
	cactusGroup = new Group();
	ovnisGroup = new Group();
	score = 0;
	isJumping = false; // Reiniciar el estado de salto
	gameState = "playing"; // Iniciar el juego
}

function drawMenu() {
	textSize(48);
	fill(0);
	textAlign(CENTER, CENTER);
	text("Juego del Dinosaurio", width / 2, height / 3);

	textSize(24);
	fill(50);
	text("Presiona los botones para comenzar", width / 2, height / 3 + 60);

	// Botón de "Jugar"
	fill(100, 200, 100);
	rectMode(CENTER);
	rect(width / 2, height / 2, 200, 50);
	fill(255);
	text("Jugar", width / 2, height / 2);

	// Botón de "Ayuda"
	fill(100, 100, 200);
	rect(width / 2, height / 2 + 70, 200, 50);
	fill(255);
	text("Ayuda", width / 2, height / 2 + 70);

	// Detectar clicks en los botones
	if (mouseIsPressed) {
		if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100) {
			if (mouseY > height / 2 - 25 && mouseY < height / 2 + 25) {
				resetGame(); // Comenzar a jugar
			} else if (mouseY > height / 2 + 45 && mouseY < height / 2 + 95) {
				gameState = "help"; // Mostrar ayuda
			}
		}
	}
}

function drawHelp() {
	textSize(32);
	fill(0);
	textAlign(CENTER, CENTER);
	text("Instrucciones", width / 2, height / 4);
	textSize(20);
	text("Presiona W, ↑ o barra espaciadora para saltar.", width / 2, height / 3);
	text("Usa A y D o las flechas ← → para moverte.", width / 2, height / 3 + 40);

	textSize(24);
	fill(100, 200, 100);
	rect(width / 2, height - 75, 200, 50);
	fill(255);
	text("Volver", width / 2, height - 75);

	// Detectar click en el botón de "Volver"
	if (mouseIsPressed && mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height - 100 && mouseY < height - 50) {
		gameState = "menu"; // Volver al menú
	}
}

function drawGame() {

	if(score >= 1000){
		gameState = "end"
	}

	fondoPos1 -= 6; // Cambia el valor para ajustar la velocidad
	fondoPos2 -= 6;

	// Vuelve a colocar el fondo si se ha salido de la pantalla
	if (fondoPos1 <= 0 - fondo.width * 2) {
		fondoPos1 = fondoPos2 + fondo.width * 2; // Coloca el fondo encima del segundo
	}
	if (fondoPos2 <= 0 - fondo.width * 2) {
		fondoPos2 = fondoPos1 + fondo.width * 2; // Coloca el fondo encima del primero
	}


	// Mostrar el puntaje
	textSize(24);
	text("Puntaje: " + score, 10, 30);

	// Aplicar gravedad al dinosaurio
	dino.vel.y += gravity;

	// Impedir que el dinosaurio caiga por debajo del suelo
	if (dino.collides(ground)) {
		dino.vel.y = 0; // Detener la caída
		isJumping = false; // Resetear estado de salto cuando está en el suelo
	}

	// Hacer que el dinosaurio salte con W, la flecha arriba o la barra espaciadora
	if ((kb.presses('space') || kb.presses('w') || kb.presses('up')) && !isJumping) {
		dino.vel.y = jumpPower; // Salto
		isJumping = true;
	}

	// Movimiento horizontal con A y D o flechas izquierda y derecha
	if (kb.pressing('a') || kb.pressing('left')) {
		dino.vel.x = -5;
	} else if (kb.pressing('d') || kb.pressing('right')) {
		dino.vel.x = 5;
	} else {
		dino.vel.x = 0; // Detener si no se presiona ninguna tecla
	}

	// Generar cactus cada 60 cuadros
	/*if (frameCount % 60 === 0) {
	let cactus = new Sprite(width, height - 70, 30, 60);
	cactus.vel.x = -6; // Movimiento hacia la izquierda
	cactusGroup.add(cactus);
	}*/
	if (frameCount % 200 === 0) {
		generateOvni()
	}
	if (frameCount % 120 === 0) {
		eventFire()
	}

	// Remover cactus fuera de la pantalla
	cactusGroup.forEach(cactus => {
		if (cactus.x < -50) {
			cactus.remove();
		}
	});

	// Verificar colisiones con los cactus
	if (dino.collides(cactusGroup)) {
		gameOver();
	}


	// Aumentar el puntaje
	score += 1;

	if (bottleExist && bottle.y > 550) {
		fire = new Sprite();
		fire.scale *= 3;
		fire.w = 80;
		fire.h = 20;
		fire.x = bottle.x;
		fire.y = height - 66;
		fire.life=80
		fire.vel.x=-4
		fire.rotationLock =true
		bottle.remove();
		tash.frameDelay = 60;
		fire.addAnimation(
			'sprites/fuego/sprite_1.png', 4
		);

	}
}

function drawGameOver() {
	textSize(48);
	fill(255, 0, 0);
	textAlign(CENTER, CENTER);
	text("¡Game Over!", width / 2, height / 2);
	textSize(24);
	fill(255);
	text("Puntaje final: " + score, width / 2, height / 2 + 40);

	// Botón de reinicio
	fill(100, 200, 100);
	rect(width / 2, height - 75, 200, 50);
	fill(255);
	text("Reiniciar", width / 2, height - 75);

	// Detectar clic en el botón de reinicio
	if (mouseIsPressed && mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height - 100 && mouseY < height - 50) {
		resetGame(); // Reiniciar el juego
	}

	for (let i = bottles.length - 1; i >= 0; i--) {
		let bottle = bottles[i];
		if (bottle.collides(ground)) {
			bottle.remove(); // Eliminar botella que colisiona con el suelo
			bottles.splice(i, 1); // Eliminar botella del arreglo
		}
	}
}

function gameOver() {
	gameState = "gameOver"; // Cambiar al estado de Game Over
	//noLoop(); // Detener el juego
}





function tash() {
	let tash;

	tash = new Sprite();
	tash.w = 30;
	tash.h = 60;
	tash.x = width;
	tash.y = height - 70;
	tash.velocity.x = -4;
	tash.rotationLock = true

	tash.addAnimation(
		'sprites/basura/Basura0.png', 5
	);


	tash.frameDelay = 10;
}

function generateOvni() {
	let ovni;

	ovni = new Sprite();
	ovni.scale *= 1.6;
	ovni.w = 30;
	ovni.h = 60;
	ovni.x = width;
	ovni.y = height - 400;
	ovni.velocity.x = -7;
	ovni.rotationLock = true

	ovni.addAnimation(
		'sprites/ovni/ovni0.png', 3
	);

	ovni.frameDelay = 10;
	ovni.moveTo(dino.x, dino.y, 8);
	ovni.collides(ground, () => {
		ovni.vel.x = -4
		ovni.vel.y = 0
	});

	ovni.life = 260;
}

function eventFire() {
	bottleExist = true
	bottle = new Sprite();
	bottle.scale *= 1.5;
	bottle.r = 20;
	bottle.rotationSpeed = 2;
	bottle.x = width / 2;
	bottle.y = height - 400;
	bottle.direction = random(160,100);
	bottle.speed = 10;

	bottle.addAnimation(
		'sprites/molotov/sprite_0.png', 1
	);

}