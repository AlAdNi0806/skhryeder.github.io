const WHITE_KEYS = ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i'];
const BLACK_KEYS = ['s', 'd', 'g', 'h', 'j', '2', '3', '5', '6', '7', '9'];

const playedNotes = new Set();

const keys = document.querySelectorAll('.key');
let whiteKeys = document.querySelectorAll('.key.white');
let blackKeys = document.querySelectorAll('.key.black');
const noteAudios = Array.from(document.querySelectorAll('audio'));
const exactNoteElement = document.querySelector('.exactNote');

const keyboardCheckbox = document.querySelector(".keyboardCheckbox");
const pianoCheckbox = document.querySelector(".pianoCheckbox");
const keyboardKeys = document.querySelectorAll(".KeyboardKey");
const pianoKeys = document.querySelectorAll(".PianoKey");

const volumeSlyder = document.querySelector(".volume-slider input");
const octaveCheckbox = document.querySelector(".octaveCheckbox");



let volumeForKey = 0.5;

let mode = "piano";

const keyMap = {};

let keysPressed = [];

function assertKeysForMouse(){
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
        key.addEventListener('mousedown', () => {
            const note = key.classList[2]; 
            console.log(note);
            playNote(key);
            keyMap[key.dataset.note] = true;
    
            const typeOfNote = key.classList[1];
            if (typeOfNote === "black"){
                key.classList.add('pressedBlack');
                console.log(typeOfNote);
            } else {
                key.classList.add('pressedWhite');
            }
            
            let noteForInstrument = key.dataset.note;
            if (noteForInstrument.charAt(noteForInstrument.length - 2) === "b") {
                exactNoteElement.textContent = noteForInstrument.slice(0, -2) + "♭";
            } else if (!/\d/.test(noteForInstrument)){
                exactNoteElement.textContent = noteForInstrument;
            } else {
                exactNoteElement.textContent = noteForInstrument.slice(0, -1);
            }
        });
    
        key.addEventListener('mouseup', () => {
            const note = key.classList[2];
            console.log(note);
            stopNote(key);
            keyMap[key.dataset.note] = false;
            
            const typeOfNote = key.classList[1];
            if (typeOfNote === "black"){
                key.classList.remove('pressedBlack');
                console.log(typeOfNote);
            } else {
                key.classList.remove('pressedWhite');
            }
    
            exactNoteElement.textContent = "-";
    
        });
    
        key.addEventListener('mouseleave', () => {
            const note = key.classList[2]; 
            if (keyMap[key.dataset.note]) {
                if(keysPressed.length < 1){
                    console.log(keysPressed);
                    stopNote(key);
                    keyMap[key.dataset.note] = false;
                    
                    const typeOfNote = key.classList[1];
                    if (typeOfNote === "black"){
                        key.classList.remove('pressedBlack');
                        console.log(typeOfNote);
                    } else {
                        key.classList.remove('pressedWhite');
                    }
                }
            }
        });
    });
}

keys.forEach(key => {
    key.addEventListener('mousedown', () => {
        const note = key.classList[2]; 
        console.log(note);
        playNote(key);
        keyMap[key.dataset.note] = true;

        const typeOfNote = key.classList[1];
        if (typeOfNote === "black"){
            key.classList.add('pressedBlack');
            console.log(typeOfNote);
        } else {
            key.classList.add('pressedWhite');
        }
        
        let noteForInstrument = key.dataset.note;
        if (noteForInstrument.charAt(noteForInstrument.length - 2) === "b") {
            exactNoteElement.textContent = noteForInstrument.slice(0, -2) + "♭";
        } else if (!/\d/.test(noteForInstrument)){
            exactNoteElement.textContent = noteForInstrument;
        } else {
            exactNoteElement.textContent = noteForInstrument.slice(0, -1);
        }
    });

    key.addEventListener('mouseup', () => {
        const note = key.classList[2]; // Get the third class, which represents the note
        console.log(note);
        stopNote(key);
        keyMap[key.dataset.note] = false;
        
        const typeOfNote = key.classList[1];
        if (typeOfNote === "black"){
            key.classList.remove('pressedBlack');
            console.log(typeOfNote);
        } else {
            key.classList.remove('pressedWhite');
        }

        exactNoteElement.textContent = "-";

    });

    key.addEventListener('mouseleave', () => {
        const note = key.classList[2]; 
        if (keyMap[key.dataset.note]) {
            if(keysPressed.length < 1){
                console.log(keysPressed);
                stopNote(key);
                keyMap[key.dataset.note] = false;
                
                const typeOfNote = key.classList[1];
                if (typeOfNote === "black"){
                    key.classList.remove('pressedBlack');
                    console.log(typeOfNote);
                } else {
                    key.classList.remove('pressedWhite');
                }
            }
        }
    });
});

/*
document.querySelector(".rachie").addEventListener("click", function(event) {
    if (event.target.classList.contains("key")) {
        const keys = document.querySelectorAll('.key');
        keys.forEach(key => {
            key.addEventListener('mousedown', () => {
                const note = key.classList[2]; 
                console.log(note);
                playNote(key);
                keyMap[key.dataset.note] = true;
        
                const typeOfNote = key.classList[1];
                if (typeOfNote === "black"){
                    key.classList.add('pressedBlack');
                    console.log(typeOfNote);
                } else {
                    key.classList.add('pressedWhite');
                }
                
                let noteForInstrument = key.dataset.note;
                if (noteForInstrument.charAt(noteForInstrument.length - 2) === "b") {
                    exactNoteElement.textContent = noteForInstrument.slice(0, -2) + "♭";
                } else if (!/\d/.test(noteForInstrument)){
                    exactNoteElement.textContent = noteForInstrument;
                } else {
                    exactNoteElement.textContent = noteForInstrument.slice(0, -1);
                }
            });
        
            key.addEventListener('mouseup', () => {
                const note = key.classList[2]; // Get the third class, which represents the note
                console.log(note);
                stopNote(key);
                keyMap[key.dataset.note] = false;
                
                const typeOfNote = key.classList[1];
                if (typeOfNote === "black"){
                    key.classList.remove('pressedBlack');
                    console.log(typeOfNote);
                } else {
                    key.classList.remove('pressedWhite');
                }
        
                exactNoteElement.textContent = "-";
        
            });
        
            key.addEventListener('mouseleave', () => {
                const note = key.classList[2]; 
                if (keyMap[key.dataset.note]) {
                    if(keysPressed.length < 1){
                        console.log(keysPressed);
                        stopNote(key);
                        keyMap[key.dataset.note] = false;
                        
                        const typeOfNote = key.classList[1];
                        if (typeOfNote === "black"){
                            key.classList.remove('pressedBlack');
                            console.log(typeOfNote);
                        } else {
                            key.classList.remove('pressedWhite');
                        }
                    }
                }
            });
        });
    }
});
*/




document.addEventListener('keydown', e => {
    if (e.repeat || playedNotes.has(e.key)) {
        return;
    } else {
        playedNotes.add(e.key);
    }
    
    const key = e.key;
    const whiteKeyIndex = WHITE_KEYS.indexOf(key);
    const blackKeyIndex = BLACK_KEYS.indexOf(key);

    if (whiteKeyIndex > -1) {
        const whiteKeyElement = whiteKeys[whiteKeyIndex];
        if (whiteKeyElement) { // Check if the element exists
            const note = whiteKeyElement.classList[2];
            console.log(note);
            playNote(whiteKeyElement);
            keyMap[whiteKeyElement.dataset.note] = true;
    
            const typeOfNote = whiteKeyElement.classList[1];
            if (typeOfNote === "black") {
                whiteKeyElement.classList.add('pressedBlack');
                console.log(typeOfNote);
            } else {
                whiteKeyElement.classList.add('pressedWhite');
            }

            let noteForInstrumentToSend = whiteKeyElement.dataset.note;
            keysPressed.push(noteForInstrumentToSend);
            changeNote();
        }
    }
    if (blackKeyIndex > -1) {
        const blackKeyElement = blackKeys[blackKeyIndex];
        if (blackKeyElement) {
            const note = blackKeyElement.classList[2];
            console.log(note);
            playNote(blackKeyElement);
            keyMap[blackKeyElement.dataset.note] = true;
    
            const typeOfNote = blackKeyElement.classList[1];
            if (typeOfNote === "black") {
                blackKeyElement.classList.add('pressedBlack');
                console.log(typeOfNote);
            } else {
                blackKeyElement.classList.add('pressedWhite');
            }
            let noteForInstrumentToSend = blackKeyElement.dataset.note;
            keysPressed.push(noteForInstrumentToSend);
            changeNote();
        }
    }
});

document.addEventListener('keyup', e => {
    const key = e.key;
    const whiteKeyIndex = WHITE_KEYS.indexOf(key);
    const blackKeyIndex = BLACK_KEYS.indexOf(key);

    if (whiteKeyIndex > -1) {
        const whiteKeyElement = whiteKeys[whiteKeyIndex];
        if (whiteKeyElement) { // Check if the element exists
            const note = whiteKeyElement.classList[2];
            console.log(note);
            stopNote(whiteKeys[whiteKeyIndex]);
            keyMap[whiteKeys[whiteKeyIndex].dataset.note] = false;
    
            playedNotes.delete(key);
            const typeOfNote = whiteKeyElement.classList[1];
            if (typeOfNote === "black") {
                whiteKeyElement.classList.remove('pressedBlack');
                console.log(typeOfNote);
            } else {
                whiteKeyElement.classList.remove('pressedWhite');
            }
            let noteForInstrumentToSend = whiteKeyElement.dataset.note;
            keysPressed = keysPressed.filter(item => item !== noteForInstrumentToSend);
            changeNote();
        }
    }
    if (blackKeyIndex > -1) {
        const blackKeyElement = blackKeys[blackKeyIndex];
        if (blackKeyElement) {
            const note = blackKeyElement.classList[2];
            console.log(note);
            stopNote(blackKeys[blackKeyIndex]);
            keyMap[blackKeys[blackKeyIndex].dataset.note] = false;
    
            playedNotes.delete(key);
            const typeOfNote = blackKeyElement.classList[1];
            if (typeOfNote === "black") {
                blackKeyElement.classList.remove('pressedBlack');
                console.log(typeOfNote);
            } else {
                blackKeyElement.classList.remove('pressedWhite');
            }
            let noteForInstrumentToSend = blackKeyElement.dataset.note;
            keysPressed = keysPressed.filter(item => item !== noteForInstrumentToSend);
            changeNote();
        }
    }
});

function playNote(key) {
    let noteForInstrument = key.dataset.note;
    noteForInstrument = mode + noteForInstrument;
    const noteAudio = document.getElementById(noteForInstrument);
    console.log(noteAudio);
    noteAudio.volume = volumeForKey;
    noteAudio.currentTime = 0;
    noteAudio.play();
    key.classList.add('active');
    noteAudio.addEventListener('ended', () => {
        key.classList.remove('active');
    });
}

function stopNote(key) {
    let noteForInstrument = key.dataset.note;
    noteForInstrument = mode + noteForInstrument;
    const noteAudio = document.getElementById(noteForInstrument);
    noteAudio.pause();
    noteAudio.currentTime = 0;
    key.classList.remove('active');
}





function changeMode(element){
    removePressedItemClass();
    if (element && element.classList.length >= 2) {
        const secondClass = element.classList[1];
        console.log("Second class of the element: " + secondClass);
        element.classList.add("pressedItem");
        mode = secondClass;
    } else {
        console.log("Element doesn't have a second class or is invalid.");
    }
}
function removePressedItemClass() {
    const itemsWithPressedClass = document.querySelectorAll('.item.pressedItem');

    itemsWithPressedClass.forEach(item => {
        item.classList.remove('pressedItem');
    });
}


function changeNote(){
    const lastElement = keysPressed[keysPressed.length - 1];
    if (keysPressed.length === 0){
        exactNoteElement.textContent = "-";
    } else if (lastElement.charAt(lastElement.length - 2) === "b") {
        exactNoteElement.textContent = lastElement.slice(0, -2) + "♭";
    } else if (!/\d/.test(lastElement)){
        exactNoteElement.textContent = lastElement;
    } else {
        exactNoteElement.textContent = lastElement.slice(0, -1);
    }
}

keyboardCheckbox.addEventListener("change", function() {
    console.log("working");
    keyboardKeys.forEach(function(key) {
        if (keyboardCheckbox.checked) {
            key.classList.add("show");
            document.documentElement.style.setProperty('--bottom-margin-keys', '5px');
            if (!pianoCheckbox.checked) {
                document.documentElement.style.setProperty('--bottom-margin-keyboard', '35px');
            } else {
                document.documentElement.style.setProperty('--bottom-margin-keyboard', '45px');
            }
        } else {
            key.classList.remove("show");
            document.documentElement.style.setProperty('--bottom-margin-keys', '15px');
        }
    });
});

pianoCheckbox.addEventListener("change", function() {
    console.log("working");
    pianoKeys.forEach(function(key) {
        if (pianoCheckbox.checked) {
            key.classList.add("show");
            if (keyboardCheckbox.checked) {
                document.documentElement.style.setProperty('--bottom-margin-keyboard', '45px');
            }
        } else {
            key.classList.remove("show");
            if (keyboardCheckbox.checked) {
                document.documentElement.style.setProperty('--bottom-margin-keyboard', '35px');
            }
        }
    });
});




octaveCheckbox.addEventListener("change", function() {
    const rachieElements = document.querySelectorAll(".rachie");
    
    rachieElements.forEach(function(rachieElement) {
        // Remove all child elements with the class "key"
        const keysToRemove = rachieElement.querySelectorAll(".key");
        keysToRemove.forEach(function(key) {
            key.remove();
        });
        const woolLine = rachieElement.querySelectorAll(".wool-line");
        woolLine.forEach(function(wool){
            wool.remove();
        })

        if (octaveCheckbox.checked) {
            const lines = `
            <div data-note="C3" class="key white note1"><p class="PianoKey">C</p><p class="KeyboardKey">(z)</p></div>
            <div data-note="D3" class="key white note2"></div>
            <div data-note="E3" class="key white note3"></div>
            <div data-note="F3" class="key white note4"></div>
            <div data-note="G3" class="key white note5"></div>
            <div data-note="A3" class="key white note6"></div>
            <div data-note="B3" class="key white note7"></div>
            <div data-note="C4" class="key white note8"></div>

            <div data-note="Db3" class="key black note16"><p class="PianoKey">D♭</p><p class="KeyboardKey">(s)</p></div>
            <div data-note="Eb3" class="key black note17"></div>
            <div data-note="Gb3" class="key black note18"></div>
            <div data-note="Ab3" class="key black note19"></div>
            <div data-note="Bb3" class="key black note20"></div>
            <div data-note="Db4" class="key black note21"></div>
            <div class="wool-line"></div>
            `;
            rachieElement.insertAdjacentHTML("afterbegin", lines);
            document.documentElement.style.setProperty('--amount-of-columns', 'repeat(40, 1fr)');
            document.documentElement.style.setProperty('--amount-of-columns-for-wool', '1 / 41');
        } else {
            const lines = `
            <div data-note="C3" class="key white note1for2"><p class="PianoKey">C</p><p class="KeyboardKey">(z)</p></div>
            <div data-note="D3" class="key white note2for2"></div>
            <div data-note="E3" class="key white note3for2"></div>
            <div data-note="F3" class="key white note4for2"></div>
            <div data-note="G3" class="key white note5for2"></div>
            <div data-note="A3" class="key white note6for2"></div>
            <div data-note="B3" class="key white note7for2"></div>
            <div data-note="C4" class="key white note8for2"></div>
            <div data-note="D4" class="key white note9for2"></div>
            <div data-note="E4" class="key white note10for2"></div>
            <div data-note="F4" class="key white note11for2"></div>
            <div data-note="G4" class="key white note12for2"></div>
            <div data-note="A4" class="key white note13for2"></div>
            <div data-note="B4" class="key white note14for2"></div>
            <div data-note="C5" class="key white note15for2"></div>
    
            <div data-note="Db3" class="key black note16for2"><p class="PianoKey">D♭</p><p class="KeyboardKey">(s)</p></div>
            <div data-note="Eb3" class="key black note17for2"></div>
            <div data-note="Gb3" class="key black note18for2"></div>
            <div data-note="Ab3" class="key black note19for2"></div>
            <div data-note="Bb3" class="key black note20for2"></div>
            <div data-note="Db4" class="key black note21for2"></div>
            <div data-note="Eb4" class="key black note22for2"></div>
            <div data-note="Gb4" class="key black note23for2"></div>
            <div data-note="Ab4" class="key black note24for2"></div>
            <div data-note="Bb4" class="key black note25for2"></div>
            <div data-note="Db5" class="key black note26for2"></div>
            <div class="wool-line"></div>
            `;
            rachieElement.insertAdjacentHTML("afterbegin", lines);
            document.documentElement.style.setProperty('--amount-of-columns', 'repeat(45, 1fr)');
            document.documentElement.style.setProperty('--amount-of-columns-for-wool', '1 / 46');
        }
    });
    assertKeysForMouse();
    whiteKeys = document.querySelectorAll('.key.white');
    blackKeys = document.querySelectorAll('.key.black');
    console.log("working");
});


document.addEventListener("click", function(event) {
    // Check if the clicked element has a class attribute
    if (event.target.classList.length > 0) {
        // Get the class name of the clicked element
        const className = event.target.className;

        // Log the class name to the console
        console.log("Clicked element's class:", className);
    }
});


volumeSlyder.addEventListener("input", function(){
    volumeForKey = volumeSlyder.value;
});

document.addEventListener('DOMContentLoaded', function () {
    const element = document.querySelector(".piano");
    element.classList.add("pressedItem");
    pianoKeys.forEach(function(key) {
        if (pianoCheckbox.checked) {
            key.classList.add("show");
        } else {
            key.classList.remove("show");
        }
    });
});





















