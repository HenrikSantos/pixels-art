const colors = document.querySelectorAll('.color');
const first = document.querySelector('.first');
const board = document.querySelector('#pixel-board');
const btnClearBoard = document.querySelector('.clear-board');
const boardSize = document.querySelector('#board-size');
const generateBoard = document.querySelector('#generate-board');
const pixel = [];
let currentColor = '';
const allColors = [];

function paint(e) {
  e.target.style.backgroundColor = currentColor;
}

function createBoard(size) {
  for (let index = 0; index < size; index += 1) {
    const newLine = document.createElement('div');
    newLine.classList.add('line');
    board.appendChild(newLine);
    for (let index2 = 0; index2 < size; index2 += 1) {
      const newPixel = document.createElement('div');
      newPixel.classList.add('pixel');
      newPixel.addEventListener('click', paint);
      pixel.push(newPixel);
      newLine.appendChild(newPixel);
    }
  }
}

function setCurrentColor(e) {
  currentColor = e.target.style.backgroundColor;
  colors.forEach((element) => {
    const currentElement = element;
    currentElement.className = 'color';
  });
  e.target.className = 'color selected';
}

colors.forEach((element) => {
  element.addEventListener('click', setCurrentColor);
});

function defineFirstElement() {
  colors.forEach((element) => {
    first.style.backgroundColor = 'black';
    currentColor = 'black';
    const currentElement = element;
    if (element.classList.length !== 3) {
      currentElement.className = 'color';
    }
  });
}

// function createPallet() {
//   colors.forEach((element) => {
//     // https://css-tricks.com/snippets/javascript/random-hex-color/ get random color
//     let randomColor = Math.floor(Math.random() * 16777215).toString(16);
//     const corDeFundo = element;
//     corDeFundo.style.backgroundColor = `#${randomColor}`;
//   });
//   defineFirstElement();
// }

function containsDuplicates(array) {
  if (array.length !== new Set(array).size) {
    return true;
  }

  return false;
}

function createPallet() {
  let randomColor = [];
  for (let index = 0; index < 4; index += 1) {
    for (let index2 = 0; index2 < 3; index2 += 1) {
      randomColor.push(Math.random() * (255 - 2) + 2);
      console.log(randomColor);
    }
    colors[
      index
    ].style.backgroundColor = `rgb(${randomColor[0]}, ${randomColor[1]}, ${randomColor[2]})`;
    randomColor = [];
    allColors.push(colors[index].style.backgroundColor);
  }
  if (containsDuplicates(allColors)) {
    createPallet();
  }
  defineFirstElement();
}

function clearBoard() {
  pixel.forEach((element) => {
    const currentElement = element;
    currentElement.style.backgroundColor = 'white';
  });
}

btnClearBoard.addEventListener('click', clearBoard);

function verifyBoard() {
  if (boardSize.value === '') {
    return false;
  }
  if (boardSize.value > 50) {
    boardSize.value = 50;
  }
  if (boardSize.value < 5) {
    boardSize.value = 5;
  }
  return true;
}

// https://www.geeksforgeeks.org/remove-all-the-child-elements-of-a-dom-node-in-javascript/ como deletar todos os filhos de um elemento
function gerarBoard() {
  if (verifyBoard()) {
    let child = board.lastElementChild;
    while (child) {
      board.removeChild(child);
      child = board.lastElementChild;
    }
    createBoard(boardSize.value);
  } else {
    window.alert('Board inválido!');
  }
}
generateBoard.addEventListener('click', gerarBoard);

window.onload = () => {
  createPallet();
  createBoard(5);
};
