// Variables
const DEFAULT_COLOR = "hsl(60, 30%, 0%)";
const DEFAULT_SIZE = "64"; // from 1 up to 99

// color picker
let newColor = DEFAULT_COLOR;
const colorPicker = document.querySelector("#colorPicker");

// grid size. for now up to 99.
let newSizeValue;
let gridSize;
const grids = document.querySelector(".grids");

initialSetup();

function initialSetup() {
	newSizeValue = DEFAULT_SIZE;
	gridSize = (100 / newSizeValue).toFixed(10);

	const gridSizeLabel = document.querySelector("#sizeLabel");
	gridSizeLabel.textContent = `${DEFAULT_SIZE} X ${DEFAULT_SIZE}`;

	const sizeSlider = document.querySelector("#sizeSlider");
	sizeSlider.oninput = function (e) {
		setNewSize(e.target.value);
		gridSizeLabel.textContent = `${e.target.value} X ${e.target.value}`;
	};
	setupGrids(newSizeValue, gridSize);
	colorPicker.oninput = (e) => setNewColor(e.target.value);
}

function setupGrids(newSizeValue, gridSize) {
	for (let i = 0; i < newSizeValue * newSizeValue; i++) {
		const grid = document.createElement("grids");
		grid.setAttribute(
			"style",
			`background-color:'';
			min-width:${gridSize}%; min-height:${gridSize}%; flex: 0 0 auto;`
		);
		grid.addEventListener("mousemove", changeColor);
		grids.appendChild(grid);
	}
}

// reseting grid size
function setNewSize(newInput) {
	removeAllChildNodes(grids);
	newSizeValue = newInput;
	gridSize = (100 / newSizeValue).toFixed(10);
	setupGrids(newSizeValue, gridSize);
}

// removing current grid
function removeAllChildNodes(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

function setNewColor(newInput) {
	newColor = newInput;
}

// drawing part
let mouseDown;
function changeColor(e) {
	document.querySelector(".grids").onmousedown = () => (mouseDown = true);
	document.querySelector(".grids").onmouseup = () => (mouseDown = false);
	if (mouseDown) e.target.style.backgroundColor = newColor;
	if (rainbowModeBtn.classList.contains("active")) {
		let hue = Math.floor(Math.random() * 360);
		let sat = Math.floor(Math.random() * 99) + 1;
		let lite = Math.floor(Math.random() * 100);
		if (mouseDown) {
			e.target.style.backgroundColor = `hsl(${hue}, ${sat}%, ${lite}%)`;
		}
	}
}

// clear button
const clear = document.querySelector("#clearBtn");
clear.addEventListener("click", function () {
	removeAllChildNodes(grids);
	setupGrids(newSizeValue, gridSize);
});

// eraser mode
let temp = "";
const erase = document.querySelector("#eraserBtn");
erase.addEventListener("click", eraser);

function eraser() {
	[temp, newColor] = [newColor, temp];
	if (colorModeBtn.classList.contains("active")) {
		colorModeBtn.classList.toggle("active");
	} else if (rainbowModeBtn.classList.contains("active")) {
		rainbowModeBtn.classList.toggle("active");
	}
	erase.classList.toggle("active");
	changeColor();
}

// color mode
const colorModeBtn = document.querySelector("#colorModeBtn");
colorModeBtn.addEventListener("click", colorMode);

function colorMode() {
	if (erase.classList.contains("active")) {
		erase.classList.toggle("active");
		[temp, newColor] = [newColor, temp];
	} else if (rainbowModeBtn.classList.contains("active")) {
		rainbowModeBtn.classList.toggle("active");
	}
	colorModeBtn.classList.toggle("active");
	changeColor();
}

// rainbow mode
const rainbowModeBtn = document.querySelector("#rainbowModeBtn");
rainbowModeBtn.addEventListener("click", rainbowMode);

function rainbowMode() {
	rainbowModeBtn.classList.toggle("active");
	if (erase.classList.contains("active")) {
		erase.classList.toggle("active");
		[temp, newColor] = [newColor, temp];
	} else if (colorModeBtn.classList.contains("active")) {
		colorModeBtn.classList.toggle("active");
		changeColor();
	}
}
