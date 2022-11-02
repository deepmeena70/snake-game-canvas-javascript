(function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // canvas size
  const w = (canvas.width = 680);
  const h = (canvas.height = 680);

  const canvasSize = 680;

  const canvasFillColor = "#000d36";
  const canvasStrokeColor = "rgba(211, 211, 211, 0.2)";

  // grid padding
  const pGrid = 10;
  // grid width
  const grid_line_len = canvasSize - 2 * pGrid;
  //  cell count
  const cellCount = 10;
  // cell size
  const cellSize = grid_line_len / cellCount;

  console.log(cellSize,cellCount);

  const head = {
    x: 2,
    y: 1,
    color: "red",
    vX: 0,
    vY: 0,
  };

  let tailLength = 2;
  let snakeParts = [];
  const tailColor = "green";

  class Tail {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }

  const food = {
    x: 4,
    y: 4,
    color: "yellow",
  };

  // this will set canvas style
  const setCanvas = () => {
    // canvas fill
    ctx.fillStyle = canvasFillColor;
    ctx.fillRect(0, 0, w, h);

    // canvas stroke
    ctx.strokeStyle = canvasStrokeColor;
    ctx.strokeRect(0, 0, w, h);

  };

  //   this will draw the grid
  const drawGrid = () => {
    ctx.beginPath();
    for (let i = 0; i <= grid_line_len; i += cellSize) {
      ctx.moveTo(i + pGrid, pGrid);
      ctx.lineTo(i + pGrid, grid_line_len + pGrid);
    }
    for (let i = 0; i <= grid_line_len; i += cellSize) {
      ctx.moveTo(pGrid, i + pGrid);
      ctx.lineTo(grid_line_len + pGrid, i + pGrid);
    }
    ctx.closePath();
    ctx.strokeStyle = canvasStrokeColor;
    ctx.stroke();
  };

  const drawSnake = () => {
    ctx.fillStyle = tailColor;
    //loop through our snakeparts array
    snakeParts.forEach((part) => {
      ctx.fillRect(
        part.x * cellSize + pGrid,
        part.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    });

    snakeParts.push(new Tail(head.x, head.y));

    if (snakeParts.length > tailLength) {
      snakeParts.shift(); //remove furthest item from  snake part if we have more than our tail size
    }

    ctx.fillStyle = head.color;
    ctx.fillRect(
      head.x * cellSize + pGrid,
      head.y * cellSize + pGrid,
      cellSize,
      cellSize
    );
  };

  const updateSnakePosition = () => {
    head.x += head.vX;
    head.y += head.vY;
  };

  const changeDir = (e) => {
    switch (e.key.toLowerCase()) {
      case "d":
        if (head.vX === -1) break;
        head.vX = 1;
        head.vY = 0;
        break;
      case "a":
        if (head.vX === 1) break;
        head.vX = -1;
        head.vY = 0;
        break;
      case "w":
        if (head.vY === 1) break;
        head.vX = 0;
        head.vY = -1;
        break;
      case "s":
        if (head.vY === -1) break;
        head.vX = 0;
        head.vY = 1;
        break;
    }
  };

  const drawFood = () => {
    ctx.fillStyle = food.color;
    ctx.fillRect(
      food.x * cellSize + pGrid,
      food.y * cellSize + pGrid,
      cellSize,
      cellSize
    );
  };

  const foodCollision = () => {
    let foodCollision = false;
    snakeParts.forEach((part) => {
      if (part.x == food.x && part.y == food.y) {
        foodCollision = true;
      }
    });
    if (foodCollision) {
      food.x = Math.floor(Math.random() * cellCount);
      food.y = Math.floor(Math.random() * cellCount);
      tailLength++;
    }
  };

  const isGameOver = () => {
    let gameOver = false;

    // snakeParts.forEach((part) => {
    //   if (part.x == head.x && part.y == head.y) {
    //     gameOver = true;
    //   }
    // });

    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x > cellCount - 1 ||
      head.y > cellCount - 1
    ) {
      gameOver = true;
    }

    return gameOver;
  };

  addEventListener("keypress", changeDir);

  // this will initiate all
  const animate = () => {
    setCanvas();
    drawGrid();
    drawSnake();
    updateSnakePosition();
    // console.log(cellSize)
    if(isGameOver()) {
      return;
    }
    foodCollision();
    drawFood();
    // requestAnimationFrame(animate)
    setTimeout(animate, 1000 / 4);
  };
  animate();

})();
