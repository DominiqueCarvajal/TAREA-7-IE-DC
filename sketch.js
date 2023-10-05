let tuercas = [];
let circulos = [];

function setup() {
  createCanvas(2000, 500);
  background(255, 240, 200); // Cambiar el color de fondo a crema
  noFill();
  noStroke();

  // Definir la cantidad de tuercas y sus características
  let numTuercas = 50;
  let radioMaximo = 80;
  let relieve = 10;

  // Crear y posicionar las tuercas en el lienzo
  for (let i = 0; i < numTuercas; i++) {
    let x = random(width);
    let y = random(height);
    let radio = random(20, radioMaximo);

    // Agregar la tuerca a la lista
    tuercas.push({
      x: x,
      y: y,
      radio: radio,
      angulo: random(TWO_PI) // Ángulo de inicio aleatorio
    });
  }
}

function draw() {
  background(255, 240, 200); // Limpiar el fondo en cada fotograma con el mismo color

  // Dibujar y animar las tuercas
  for (let i = 0; i < tuercas.length; i++) {
    let tuerca = tuercas[i];

    // Dibujar el relieve de la tuerca
    fill(220); // Color del relieve (gris claro)
    ellipse(tuerca.x, tuerca.y, tuerca.radio * 2 + 10, tuerca.radio * 2 + 10);

    // Calcular la posición de la tuerca girando
    let xGiro = tuerca.x + cos(tuerca.angulo) * (tuerca.radio + 5);
    let yGiro = tuerca.y + sin(tuerca.angulo) * (tuerca.radio + 5);

    // Dibujar la parte principal de la tuerca (círculo negro)
    fill(0); // Color negro
    ellipse(xGiro, yGiro, tuerca.radio * 2, tuerca.radio * 2);

    // Incrementar el ángulo para hacer que gire
    tuerca.angulo += 0.02; // Ajusta la velocidad de giro aquí
  }

  // Dibujar y actualizar los círculos de colores
  for (let i = circulos.length - 1; i >= 0; i--) {
    let circulo = circulos[i];
    fill(circulo.color);

    // Calcular la posición de rotación
    let xRotado = circulo.x + cos(circulo.angulo) * (circulo.radio + 5);
    let yRotado = circulo.y + sin(circulo.angulo) * (circulo.radio + 5);

    // Dibujar el círculo en la posición rotada
    ellipse(xRotado, yRotado, circulo.radio * 2, circulo.radio * 2);
    circulo.angulo += 0.02; // Ajusta la velocidad de giro aquí
    circulo.tiempo -= 1;

    if (circulo.tiempo <= 0) {
      // Eliminar el círculo si ha estado en pantalla durante 7 segundos
      circulos.splice(i, 1);
    }

    // Verificar la colisión con los círculos existentes
    for (let j = 0; j < tuercas.length; j++) {
      let tuerca = tuercas[j];
      let distancia = dist(xRotado, yRotado, tuerca.x, tuerca.y);

      if (distancia < circulo.radio + tuerca.radio) {
        // Cambiar el color del círculo al entrar en contacto
        circulo.color = randomColor();
      }
    }
  }
}

function mousePressed() {
  // Colores disponibles para los círculos
  let colores = [color(0, 0, 255), color(139, 69, 19), color(128), color(0, 128, 0), color(255, 165, 0), color(255, 105, 180), color(128, 0, 128), color(255, 0, 0), color(255, 255, 0)];

  // Crear un círculo de color aleatorio en la posición del clic
  let x = mouseX;
  let y = mouseY;
  let radio = random(10, 50); // Tamaño aleatorio
  let colorAleatorio = random(colores);

  // Agregar el círculo a la lista de círculos
  circulos.push({
    x: x,
    y: y,
    radio: radio,
    color: colorAleatorio,
    tiempo: 7 * 60, // 7 segundos en fotogramas (a 60 FPS)
    angulo: random(TWO_PI) // Ángulo de inicio aleatorio
  });
}

function randomColor() {
  // Función para obtener un color aleatorio de la lista de colores
  let colores = [color(0, 0, 255), color(139, 69, 19), color(128), color(0, 128, 0), color(255, 165, 0), color(255, 105, 180), color(128, 0, 128), color(255, 0, 0), color(255, 255, 0)];
  return random(colores);
}
