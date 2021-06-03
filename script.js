function changeBlack (e){
    let val = e.target.classList[1];
    let divSelec = document.getElementsByClassName(`${val}`)[0];
    if (colorP == "black"){
        divSelec.style.backgroundColor = `${colorP}`;
    }   else if (colorP == "rainbow"){
        let rColor = Math.floor(Math.random()*255);
        let gColor = Math.floor(Math.random()*255);
        let bColor = Math.floor(Math.random()*255);
        divSelec.style.backgroundColor = `rgb(${rColor},${gColor},${bColor})`;
    } else if(colorP == "greytones"){
        let greyColor = Number(divSelec.style.backgroundColor.slice(-4,-1));
        console.log(greyColor)
        divSelec.style.backgroundColor = `rgba(0,0,0,${greyColor + 0.2})`;
    }   
}

function createTable(size){
    let sizeV = size*size;
    let siPx = 700/size;
    container.style.gridTemplateRows = `repeat(${size},${siPx}px)`;
    container.style.gridTemplateColumns = `repeat(${size},${siPx}px)`;
    for (let i = 1; i <= `${sizeV}`; i++){
        let div = document.createElement('div');
        div.classList.add("hover");
        div.classList.add(`${i}`);
        div.style.width = `${siPx}px`;
        div.style.height = `${siPx}px`;
        div.style.border = `1px solid rgba(255,255,255,0.5`;
        div.style.backgroundColor = "none";
        container.appendChild(div);
    }
    allDivs = Array.from(document.querySelectorAll(`.hover`));
    allDivs.forEach(div => div.addEventListener('mouseover',changeBlack));
}

function resetTable(){
    allDivs.forEach(element => {
        container.removeChild(element);
    });
    createTable(tama);
}

function changeSize(){
    tama = parseInt(prompt('What is the new size you want for the square? (min: 10 max: 64): '));
    while (tama > 64 || tama < 10){
        tama = prompt('Incorrect value (min: 10 max: 64): ')
    }
    resetTable();
}

function setBlack(){
    colorP = "black";
}

function setRainbow(){
    colorP = "rainbow"
}

function setGrey(){
    colorP = "greytones"
}



// Inicio de página

const container = document.getElementById('container');

let colorP = "black";

let tama = 10;

let allDivs;

createTable(tama);

// Boton de tamaño

const sizeBtn = document.querySelector('#size');

sizeBtn.addEventListener('click', changeSize);

// Boton de cambio de color

allDivs = Array.from(document.querySelectorAll(`.hover`));

allDivs.forEach(div => div.addEventListener('mouseover',changeBlack));

// Boton de borrado

const clearBtn = document.querySelector('#clear');

clearBtn.addEventListener('click', resetTable);

// Colors

const blackC = document.querySelector('#black');
const rainbowC = document.querySelector('#rainbow');
const greysC = document.querySelector('#greys');

blackC.addEventListener('click', setBlack);
rainbowC.addEventListener('click', setRainbow);
greysC.addEventListener('click', setGrey);
