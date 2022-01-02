function changeBlack(e) {
	let val = e.target.classList[1]
	let divSelec = document.getElementsByClassName(`${val}`)[0]
	if (colorP == 'black') {
		divSelec.style.backgroundColor = `rgba(0,0,0)`
	} else if (colorP == 'rainbow') {
		let rColor = Math.floor(Math.random() * 255)
		let gColor = Math.floor(Math.random() * 255)
		let bColor = Math.floor(Math.random() * 255)
		divSelec.style.backgroundColor = `rgba(${rColor},${gColor},${bColor})`
	} else if (colorP == 'greytones') {
		if (divSelec.style.backgroundColor == 'rgba(0, 0, 0, 0.9)') {
			return
		} else if (divSelec.style.backgroundColor.match(/rgba/)) {
			let greyS = Number(divSelec.style.backgroundColor.slice(-4, -1))
			divSelec.style.backgroundColor = `rgba(0, 0, 0, ${greyS + 0.1})`
		} else {
			divSelec.style.backgroundColor = `rgba(0, 0, 0, 0.1)`
		}
	} else if (colorP == 'setcolor') {
		let hexColor = document.querySelector(`#seleColor`)
		let hexValue = hexColor.value
		divSelec.style.backgroundColor = `${hexValue}`
	}
}

function createTable(size, version) {
	let tama = getComputedStyle(container).width.slice(0, 3)
	let sizeV = size * size
	let siPx = tama / size
	container.style.gridTemplateRows = `repeat(${size},${siPx}px)`
	container.style.gridTemplateColumns = `repeat(${size},${siPx}px)`
	for (let i = 1; i <= `${sizeV}`; i++) {
		let div = document.createElement('div')
		div.classList.add('hover')
		div.classList.add(`${i}`)
		div.style.border = `1px solid rgba(255,255,255,0.5)`
		div.style.backgroundColor = 'rgba(255,255,255,0.3'
		div.style.transition = '0.2s'
		container.appendChild(div)
	}
	allDivs = Array.from(document.querySelectorAll(`.hover`))
	allDivs.forEach(div => div.addEventListener(version, changeBlack))
}

function resetTable() {
	allDivs.forEach(element => {
		container.removeChild(element)
	})
	createTable(quantity, option)
}

function changeSize() {
	tama = parseInt(
		prompt('What is the new size you want for the square? (min: 10 max: 64): ')
	)
	while (tama > 64 || tama < 10) {
		tama = prompt('Incorrect value (min: 10 max: 64): ')
	}
	resetTable()
}

function setBlack() {
	colorP = 'black'
}

function setRainbow() {
	colorP = 'rainbow'
}

function setGrey() {
	colorP = 'greytones'
}

function setColor() {
	colorP = 'setcolor'
}

function setHover() {
	option = 'mouseover'
	resetTable()
}

function setPress() {
	option = 'mousedown'
	resetTable()
}

// Inicio de página

const container = document.getElementById('container')

let colorP = 'black'

let quantity = 10

let option = 'mouseover'

let allDivs

createTable(quantity, option)

// Boton de tamaño

const sizeBtn = document.querySelector('#size')

sizeBtn.addEventListener('click', changeSize)

// Boton de cambio de color

allDivs = Array.from(document.querySelectorAll(`.hover`))

allDivs.forEach(div => div.addEventListener('mouseover', changeBlack))

// Boton de borrado

const clearBtn = document.querySelector('#clear')

clearBtn.addEventListener('click', resetTable)

// Colors

const blackC = document.querySelector('#black')
const rainbowC = document.querySelector('#rainbow')
const greysC = document.querySelector('#greys')
const hexC = document.querySelector('#selectorCol')

blackC.addEventListener('click', setBlack)
rainbowC.addEventListener('click', setRainbow)
greysC.addEventListener('click', setGrey)
hexC.addEventListener('click', setColor)

const pressing = document.getElementById('pressing')
const hovering = document.getElementById('hovering')

hovering.addEventListener('click', setHover)
pressing.addEventListener('click', setPress)

// Nav

const nav = document.getElementById('nav-header-navico-responsive')
const options = document.getElementById('container-options')

nav.addEventListener('click', e => {
	if (nav.classList.contains('fa-bars')) {
		nav.classList.replace('fa-bars', 'fa-times')
		nav.classList.add('flipNav')
		options.classList.add('showNav')
	} else {
		nav.classList.replace('fa-times', 'fa-bars')
		nav.classList.remove('flipNav')
		options.classList.remove('showNav')
	}
})

window.addEventListener('resize', e => {
	let tama = getComputedStyle(container).width.slice(0, 3)
	let siPx = tama / quantity
	container.style.gridTemplateRows = `repeat(${quantity},${siPx}px)`
	container.style.gridTemplateColumns = `repeat(${quantity},${siPx}px)`
})
