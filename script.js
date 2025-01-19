async function loadData() {
    try {
        const response = await fetch('models.json');
        if (!response.ok) {
            throw new Error("Failed to fetch Teslas!");
        }

        const data = await response.json();
        return data
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
}

function generateBingoTileNames(vehicles) {
    let tileNames = []
    for (const model in vehicles) {
        const {colors, variants} = vehicles[model];

        // Base Models
        tileNames.push(`Any ${model}`);

        // Colors
        colors.forEach(color => {
            tileNames.push(`${color} ${model}`);
        });

        // Variants
        variants.forEach(variant => {
            tileNames.push(`${model} ${variant}`);
        });
    }
    return tileNames
}

function populateBingoBoard(tileNames) {
    let bingoCells = document.getElementById("bingo-board");
    bingoCells.childNodes.forEach((cell, index) => {
        if (cell.innerText != "FREE") {
            let randomIndex = Math.floor(Math.random() * tileNames.length);
            let pickedTileName = tileNames[randomIndex];
            tileNames.splice(randomIndex, 1);

            cell.innerText = pickedTileName
            cell.addEventListener("mouseenter", () => {
                cell.style.backgroundColor = "#f0e68c";
            });

            cell.addEventListener("mouseleave", () => {
                cell.style.backgroundColor = ""; // Reset
            });
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    loadData().then(data => {
        let tileNames = generateBingoTileNames(data)
        populateBingoBoard(tileNames);
    })
});
