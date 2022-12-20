const srcCharacter = "https://rickandmortyapi.com/api/character/avatar/"
const levels = [
  {level: "easy", numPairs: 4 },
  {level: "medium", numPairs: 6 },
  {level: "difficult", numPairs: 10 }
]
let characters = []

const gameArea$$ = document.querySelector(".game-area")
const card$$ = document.querySelector(".card")
let comparitionPairs = []

//? Creamos una funcion para generar tantos characters como parejas tenga el level
function setCharacters (numCharacters) {

  //array de numeros aleatorios sin repetir. los numeros van de 0 al numero de cartas que vaya a haber.
  const numCards = numCharacters*2
  const randomPositions = []
  for (let i = 0; i < numCards; i++) {
    let randomNum = Math.floor(Math.random() * numCards)
    if (!randomPositions.includes(randomNum)) {
      randomPositions.push(randomNum)
    } else {
      while (randomPositions.includes(randomNum)) {
        const newRandomNum = Math.floor(Math.random() * numCards)
        randomNum = newRandomNum
      }
      randomPositions.push(randomNum)
    }
  }

  // array de personajes aleatorios de la API de rick y morty
  const randomCharacters = []
  for (let i = 0; i < numCharacters; i++) {
    const randomNum = Math.floor(Math.random() * 800)
    if (!randomCharacters.includes(randomNum)) {
      randomCharacters.push(randomNum)
      randomCharacters.push(randomNum)
    }
  }

  // juntamos al personaje y la posicion aleatoria dada por el primer array "randomPositions" y hacemos un array 
  // con el cual se asignaran las imagenes a las cartas.
  for (let i = 0; i < randomCharacters.length; i++) {
    const position = randomPositions[i]
    const characterToPush = randomCharacters[position];
    
    const urlCharacter = srcCharacter + characterToPush + ".jpeg"
    characters.push(urlCharacter)
  }

  // console.log(randomPositions)
  console.log(randomCharacters)
  // console.log(characters)
}

//? Creamos de forma dinamica los botones para elegir dificultad
const nav__level$$ = document.querySelector(".nav__level")
levels.forEach(lvl => {
  const btn = document.createElement("button")
  btn.classList.add("nav__level--btn")
  btn.textContent = lvl.level
  nav__level$$.appendChild(btn)
})

//? Funcion para poner una nueva carta nueva en la mesa
function newCard () {
  const clonedCard = card$$.cloneNode(true)
  gameArea$$.appendChild(clonedCard)
  return clonedCard
}

//? Funcion para ver la imagen oculta en la carta e indicar que hay que comprobar coincidencia
function flipCard (event) {
  const faceBack = event.path[2].querySelector(".card__face--back")
  faceBack.classList.toggle("display-none")
  faceBack.classList.add("face-up")
  
  const faceFront = event.path[2].querySelector(".card__face--front img")
  const imgFront = faceFront.getAttribute("src")
  comparitionPairs.push(imgFront)
}

//? Funcion que pondra cartas en la mesa en funcion de la dificultad al hacer click en el btn.
function setLevel (event) {
  // Reset de la mesa a la carta inicial
  let allCards$$ = document.querySelectorAll(".card")
  for (let i = 0; i < allCards$$.length; i++) {
    if (i !== 0 ){
      allCards$$[i].remove()
    }
  }
  characters = []
  // la funcion newCard se ejecuta x2 veces las parejas del level indicado al principio
  levels.forEach(lvl => {
    if (lvl.level === event.target.innerText) {
      const numCards = lvl.numPairs * 2 - 1
      setCharacters(lvl.numPairs)
      for (let i = 0; i < numCards; i++) {
        newCard()
      }

      //* EventListener en las cartas para ver la imagen que se oculta onclick
      const allCards$$ = document.querySelectorAll(".card")
      allCards$$.forEach (card => {
        card.addEventListener("click", (event) => {
          flipCard(event)
          pairIsGuessed (comparitionPairs)
        })
      })
    }
  })

  const imgCards$$ = document.querySelectorAll(".card__face--front")
  for (let i = 0; i < imgCards$$.length; i++) {
    imgCards$$[i].children[0].src = characters[i]
  }
}

//* EventListener en los botones de dificultad que ejecutara la funcion poner las cartas
const levelButtons = document.querySelectorAll(".nav__level--btn")
levelButtons.forEach( btn => {
  btn.addEventListener("click", setLevel)
})

//? Funcion que compara 2 cartas vueltas
function pairIsGuessed (pairOfCards) {
  if (pairOfCards.length === 2) {
    const card1 = pairOfCards[0]
    const card2 = pairOfCards[1]
    if (card1 === card2) {
      document.querySelectorAll(".face-up").forEach(faceUpCard => {
        faceUpCard.classList.add("guessed")
        faceUpCard.classList.toggle("face-up")
      })
      isGameOver()
    } else {
      setTimeout(() => {
        document.querySelectorAll(".face-up").forEach(faceUpCard => {
          faceUpCard.classList.remove("display-none")
          faceUpCard.classList.remove("face-up")
        })
      }, 1000);
    }
    comparitionPairs = []
  }
}

//? Funcion que comprueba si ha acabado la partida
function isGameOver() {
  const numGuessedCards = document.querySelectorAll(".guessed").length
  if (numGuessedCards === characters.length) {
    console.log("THE GAME IS OVER!!!! All cards are face up.")
  }
}









