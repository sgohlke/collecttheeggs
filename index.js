const numberOfEggs = 6
const numberOfGrassPiles = 24
let eggLocations = []
let numberOfFoundEggs = 0
let context = null;

function startGame() {
    // Initialize new game
    eggLocations = []
    numberOfFoundEggs = 0
    document.getElementById('numberOfFoundEggs').innerHTML = '0'

    // "Set" eggs
    let locationForEgg = 0
    for (let egg = 0; egg < numberOfEggs; egg++) {
        do {
            locationForEgg = generateRandomNumber(numberOfGrassPiles)
        } while (eggLocations.includes(locationForEgg));
        eggLocations.push(locationForEgg)
    }

    // Create grass piles
    let grassPiles = ''
    for (let grassIndex = 0; grassIndex < numberOfGrassPiles; grassIndex++) {
        grassPiles += `<img id='field${grassIndex}' class='grassField' src='grass.svg' onclick='checkForEgg(${grassIndex})' width='100px' height='100px' alt='grass field' />`
    }
    document.getElementById('grassArea').innerHTML = grassPiles
}

function checkForEgg(grassPileIndex) {
    if (eggLocations.includes(grassPileIndex)) {
        document.getElementById('field' + grassPileIndex).src = 'egg.svg'
        eggLocations = eggLocations.filter(eggLocation => eggLocation !== grassPileIndex)
        numberOfFoundEggs++
        document.getElementById('numberOfFoundEggs').innerHTML =
            numberOfFoundEggs === numberOfEggs
                ? numberOfFoundEggs + '<br>Gratulation! Du hast alle Eier gefunden!'
                : numberOfFoundEggs
        playSound(true)
    } else {
        playSound(false)
    }
}

function generateRandomNumber(maxNumber) {
    return Math.floor(Math.random() * maxNumber)
}

function playSound(isFoundEgg) {
    if (document.getElementById('sound').checked) {
        if (context === null) {
            context = new AudioContext();
        }
        let oscillatorNode = context.createOscillator();
        let gainNode = context.createGain();
        oscillatorNode.type = 'sine';
        oscillatorNode.frequency.value = isFoundEgg ? 500 : 90;
        gainNode.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 1);
        oscillatorNode.connect(gainNode);
        gainNode.connect(context.destination);
        oscillatorNode.start(0);
    }
}

window.onload = startGame