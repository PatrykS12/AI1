// Inicjalizacja mapy Leaflet
const map = L.map('box-1').setView([51.505, -0.09], 13);
const satelliteLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data © OpenStreetMap contributors'
});
satelliteLayer.addTo(map);

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        console.log("Geolokalizacja nie jest obsługiwana przez tę przeglądarkę.");
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log(`Szerokość geograficzna: ${lat}, Długość geograficzna: ${lon}`);
    map.setView([lat, lon], 15);
}

function showError(error) {
    console.log("Błąd geolokalizacji:", error.message);
}

function captureSatelliteImage() {
    leafletImage(map, function(err, canvas) {
        if (err) {
            console.log("Błąd podczas generowania obrazu mapy:", err);
            return;
        }

        const boxZdjecie = document.getElementById("box-zdjecie");
        boxZdjecie.innerHTML = ""; 
        boxZdjecie.appendChild(canvas);

        splitImageForPuzzle(canvas); 
    });
}

// Tworzenie siatki w #box-puzzle i #box-rozw
function createGrid(containerId) {
    const container = document.getElementById(containerId);
    for (let i = 0; i < 16; i++) {
        const cell = document.createElement("div");
        cell.className = "grid-cell";
        cell.setAttribute("data-index", i);
        container.appendChild(cell);
    }
}

// Podział obrazu na 16 fragmentów i losowe rozmieszczenie 
function splitImageForPuzzle(canvas) {
    const tileSize = 78;
    const tiles = [];

    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            const tileCanvas = document.createElement("canvas");
            tileCanvas.width = tileSize;
            tileCanvas.height = tileSize;
            const context = tileCanvas.getContext("2d");

            context.drawImage(
                canvas,
                col * tileSize, row * tileSize, tileSize, tileSize,
                0, 0, tileSize, tileSize
            );

            const tileElement = document.createElement("div");
            tileElement.className = "tile";
            tileElement.style.backgroundImage = `url(${tileCanvas.toDataURL()})`;
            tileElement.setAttribute("data-row", row);
            tileElement.setAttribute("data-col", col);
            tileElement.setAttribute("data-index", row * 4 + col);

            tiles.push(tileElement);
        }
    }

    shuffleArray(tiles);
    const puzzleContainer = document.getElementById("box-puzzle");
    puzzleContainer.innerHTML = ""; 

    tiles.forEach(tile => {
        tile.draggable = true;
        tile.ondragstart = dragStart;
        tile.ondragend = dragEnd;
        puzzleContainer.appendChild(tile);
    });
}

// Mieszanie elementów puzzli
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Obsługa Drag & Drop
let draggedTile = null;

function allowDrop(event) {
    event.preventDefault();
    const targetCell = event.target;

    // drop tylko na pustych komórkach
    if (targetCell.classList.contains("grid-cell") && !targetCell.hasChildNodes()) {
        targetCell.style.border = "2px dashed #00f";  // Podświetlenie komórki
    }
}

function dragStart(event) {
    draggedTile = event.target;
    draggedTile.classList.add("dragging");
    event.dataTransfer.setData("text/plain", null);
}

function dragEnd(event) {
    draggedTile.classList.remove("dragging");
    const cells = document.querySelectorAll(".grid-cell");
    cells.forEach(cell => {
        cell.style.border = "1px solid #ccc";  // Resetujemy border komórek
    });
}

function drop(event) {
    event.preventDefault();
    const targetCell = event.target;

    // Tylko jeśli jest pusta komórka
    if (targetCell.classList.contains("grid-cell") && !targetCell.hasChildNodes()) {
        // Umieszczamy kafelek w nowym miejscu
        targetCell.appendChild(draggedTile);

      
        checkPuzzle();
    }

    // Resetowanie stylu
    const cells = document.querySelectorAll(".grid-cell");
    cells.forEach(cell => {
        cell.style.border = "1px solid #ccc";
    });
}

// Sprawdzanie poprawności ułożenia puzzli
function checkPuzzle() {
    const solutionContainer = document.getElementById("box-rozw");
    const tiles = Array.from(solutionContainer.querySelectorAll(".tile"));

    if (tiles.length !== 16) return;

    let correctCount = 0;
    const wrongTiles = [];

    tiles.forEach((tile, index) => {
        const row = Math.floor(index / 4);
        const col = index % 4;
        const correctRow = tile.getAttribute("data-row");
        const correctCol = tile.getAttribute("data-col");

      
        console.log(`Kafelek ${index} znajduje się w pozycji (${row}, ${col}). Oczekiwana pozycja: (${correctRow}, ${correctCol})`);

        if (correctRow == row && correctCol == col) {
            correctCount++;
        } else {
            wrongTiles.push({ tile, row, col });
        }
    });

   
    console.log(`Poprawnie ułożonych kafelków: ${correctCount}/16`);
    
    // Sprawdzanie, czy wszystkie kafelki są poprawnie ułożone
    if (correctCount === 16) {
        console.log("Wszystkie kafelki zostały poprawnie ułożone!");
        alert("Gratulacje! Ułożyłeś puzzle poprawnie.");
    } else {
        console.log("Puzzle są nadal niepoprawnie ułożone. Spróbuj ponownie.");
    }
}

// Inicjalizacja siatki
createGrid("box-puzzle");
createGrid("box-rozw");

document.getElementById("getLocation").addEventListener("click", getLocation);
document.getElementById("getMap").addEventListener("click", captureSatelliteImage);
