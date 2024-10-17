let dino;
let ground;
let cactusGroup;
let gravity = 0.6;
let jumpPower = -12;
let score = 0;
let gameState = "menu"; // Estados del juego: 'menu', 'playing', 'help'
let isJumping = false;

function setup() {
	createCanvas(800, 400);
}

function draw() {
	background(200);

	if (gameState === "menu") {
	drawMenu();
	} else if (gameState === "playing") {
	drawGame();
	} else if (gameState === "help") {
	drawHelp();
	} else if (gameState === "gameOver") {
	drawGameOver();
	}
}

function resetGame() {
	// Reiniciar variables para un nuevo juego
	dino = new Sprite(100, height - 70, 50, 50);
	dino.rotationLock = true; // Bloquear rotación

	// Crear el suelo
	ground = new Sprite(width / 2, height - 10, width, 20, 'static');

	// Crear grupo de cactus
	cactusGroup = new Group();
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
	if (frameCount % 60 === 0) {
	let cactus = new Sprite(width, height - 70, 30, 60);
	cactus.vel.x = -6; // Movimiento hacia la izquierda
	cactusGroup.add(cactus);
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
}

function drawGameOver() {
	textSize(48);
	fill(255, 0, 0);
	textAlign(CENTER, CENTER);
	text("¡Game Over!", width / 2, height / 2);
	textSize(24);
	fill(0);
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
}

function gameOver() {
	gameState = "gameOver"; // Cambiar al estado de Game Over
	//noLoop(); // Detener el juego
}



function nada(){

    obj1 = new Group();
	obj1.w = 30;
	obj1.h = 60;
	obj1.tile = '=';

	obj2 = new Group();
	obj2.w = 60;
	obj2.h = 60;
	obj2.tile = '#';

	obj3 = new Group();
	obj3.w = 40;
	obj3.h = 5;
	obj3.tile = 'z';

	obj4 = new Group();
	obj4.w = 60;
	obj4.h = 15;
	obj4.tile = '_';

	obj5 = new Group();
	obj5.w = 150;
	obj5.h = 80;
	obj5.tile = 'A';

	obj6 = new Group();
	obj6.w = 50;
	obj6.h = 30;
	obj6.tile = '~';

	obj8 = new Group();
	obj8.w = 30;
	obj8.h = 30;
	obj8.tile = '°';

	obj7 = new Group();
	obj7.w = 30;
	obj7.h = 30;
	obj7.tile = '*';

	obj9 = new Group();
	obj9.w = 30;
	obj9.h = 30;
	obj9.tile = '@';


	tash = new Tiles(
		[
			'='
		],
		100, //pocicion x
		40, //pocicion y
	);


	car = new Tiles(
		[
			'A'
		],
		100, //pocicion x
		40, //pocicion y
	);


	jump = new Tiles(
		[
			'..#.',
			'z.#.',
		],
		100, //pocicion x
		40, //pocicion y
	);


		fire = new Tiles(
		[
			'A'
		],
		100, //pocicion x
		40, //pocicion y
	);


		car = new Tiles(
		[
			'A'
		],
		100, //pocicion x
		40, //pocicion y
	);

		car = new Tiles(
		[
			'A'
		],
		100, //pocicion x
		40, //pocicion y
	);
}