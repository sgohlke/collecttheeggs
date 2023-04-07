const numberOfEggs = 5
const numberOfGrassPiles = 25
let eggLocations = []
let numberOfFoundEggs=0

function startGame() {
    console.log('Starting game!')


    // Initialize new game
    eggLocations = []
    numberOfFoundEggs = 0
    document.getElementById('numberOfFoundEggs').innerHTML = '0'
    document.getElementById('foundEggsText').style.setProperty('visibility', 'visible')

    // "Set" eggs
    let locationForEgg = 0
    for (let egg = 0; egg < numberOfEggs; egg++) {
        do {
            locationForEgg = generateRandomNumber(numberOfGrassPiles)
        } while (eggLocations.includes(locationForEgg));
        eggLocations.push(locationForEgg)
    }
   
    console.log('eggLocations ' , eggLocations )


    // Create grass piles
    let grassPiles=''
    for (let grassIndex = 0; grassIndex < numberOfGrassPiles; grassIndex++) {
        grassPiles += `<img id='field${grassIndex}' class='grassField' src='grass.svg' onclick='checkForEgg(${grassIndex})' />`
    }
    // console.log('Add grass piles', grassPiles)
    document.getElementById('grassArea').innerHTML = grassPiles
}

function checkForEgg(grassPileIndex) {
    console.log('Checking pile ', grassPileIndex)
    if (eggLocations.includes(grassPileIndex)) {
        console.log('Found egg on pile ', grassPileIndex)
        document.getElementById('field'+ grassPileIndex).src = 'egg.svg'
        eggLocations = eggLocations.filter( eggLocation => eggLocation !== grassPileIndex)
        numberOfFoundEggs++
        document.getElementById('numberOfFoundEggs').innerHTML = 
        numberOfFoundEggs === numberOfEggs 
        ? numberOfFoundEggs + '<br>Gratulation! Du hast alle Eier gefunden!' 
        : numberOfFoundEggs

    }
}

function generateRandomNumber(maxNumber) {
    return Math.floor(Math.random() * maxNumber)
}