
const characters = []
const srcCharacter = "https://rickandmortyapi.com/api/character/avatar/"
const levels = [
  {level: "easy", numPairs: 4 },
  {level: "medium", numPairs: 6 },
  {level: "difficult", numPairs: 10 }
]
const gameArea$$ = document.querySelector(".game-area")
const card$$ = document.querySelector(".card")

//Creamos una funcion para generar tantos characters como parejas tenga el level


// Creamos de forma dinamica los botones para elegir dificultad
const nav__level$$ = document.querySelector(".nav__level")
levels.forEach(lvl => {
  const btn = document.createElement("button")
  btn.classList.add("nav__level--btn")
  btn.textContent = lvl.level
  nav__level$$.appendChild(btn)
})

// Funcion para poner una nueva carta nueva en la mesa
function newCard () {
  const clonedCard = card$$.cloneNode(true)
  gameArea$$.appendChild(clonedCard)
}

// Creamos una funcion que pondra cartas en la mesa en funcion de la dificultad al hacer click en el btn.
function setLevel (event) {
  // Reset de la mesa a la carta inicial
  const allCards$$ = document.querySelectorAll(".card")
  for (let i = 0; i < allCards$$.length; i++) {
    if (i !== 0 ){
      allCards$$[i].remove()
    }
  }
  // la funcion newCard se ejecuta x2 veces las parejas del level indicado al principio
  levels.forEach(lvl => {
    if (lvl.level === event.target.innerText) {
      const numCards = lvl.numPairs * 2 - 1
      for (let i = 0; i < numCards; i++) {
        newCard()
      }

      //*eventListener
      // Ponenmos un EventListener en las cartas para ver la imagen que se oculta
      const allCards$$ = document.querySelectorAll(".card")
      allCards$$.forEach (card => {
        card.addEventListener("click", flipCard)
      })
    }
  })

}

// Creamos una funcion para ver la imagen oculta en la carta
function flipCard (event) {
  console.log(event.target)
  const faceBack = event.path[2].querySelector(".card__face--back")
  const faceFront = event.path[2].querySelector(".card__face--front")
  faceBack.classList.toggle("display-none")
}

//*eventListener
// Ponemos un eventListener en los botones de dificultad que ejecutara la funcion anterior
const levelButtons = document.querySelectorAll(".nav__level--btn")
levelButtons.forEach( btn => {
  btn.addEventListener("click", setLevel)
})









