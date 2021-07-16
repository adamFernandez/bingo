let app = document.getElementById("app");
let list= document.getElementById("list");
let bolaEnJuego = document.getElementById("bolaEnJuego");
bolaEnJuego.innerHTML = "00";
let inner = [];
let innerArray = document.getElementById("innerArray");
let bolasFuera = document.getElementById("bolasFuera");
let speed = 3000;

for (i=1; i<=90 ;i++) {
  inner.push(i);
}

// creates an element with its class and innerText
const create = (_element, _class, _inner = "") => {
  let el = document.createElement(_element);
  el.setAttribute('class', _class);
  el.innerText = _inner;
  return el;
}
// creates element with Id, class and innerText
const createId = (_element, _id, _class, _inner = "") => {
  let el = document.createElement(_element);
  el.setAttribute('class', _class);
  el.setAttribute('id', _id);
  el.innerText = _inner;
  return el;
}

// removes number of child Elements of an array of elements 
const removeElements = (elements = [], cardNum) => {
  for (let i = 0; i < cardNum; i++){
      elements.forEach((e) => { document.querySelector(e).lastElementChild.remove(); });
  }
}

// replace an oldClass with a newClass given an elementId group
const switchClass =(group = true, _element, oldClass, newClass) => {
  let el;
  el =  group ? document.querySelectorAll(_element) : NodeList =[document.querySelector(_element)];
  el.forEach((e) => { 
    e.classList.contains(newClass) 
    ? e.classList.remove(oldClass) 
    : (e.classList.add(newClass), e.classList.remove(oldClass)); });
}


function gameBoard() {
  let li;
  for (i=1;i<=inner.length;i++) {
    if (i < 10 ){
      li = create("li",`li${i}`,`0${i}`);
    }  else {
      li = create("li",`li${i}`,`${i}`);
    }
    list.appendChild(li);
  }

}
gameBoard();

let interval;
const buttonBall = document.getElementById("ball");


const stopBolas = () => {
  clearInterval(interval);
  buttonBall.innerText = "Saca Bola";
}




const minus = document.getElementById("minus");
const plus = document.getElementById("plus");
const speedTimer = document.getElementById("speedTimer");
speedTimer.innerText = 0;
let seconds = 0;


//reducing timer speed
minus.onclick = () => {
  speed < 5000 ?
  (
    buttonBall.innerText = "Stop Bola",
    speed += 500,
    clearInterval(interval),
    interval = setInterval(function() { ball(); }, speed),
    speedTimer.innerText = Math.abs(parseFloat(speed / 1000)).toFixed(1) + " s"
  )
  : speedTimer.innerText = "Minimum speed";
}


//adding timer speed
plus.onclick = () => {
  speed > 500 ?
  (
    buttonBall.innerText = "Stop Bola",
    speed -= 500,
    clearInterval(interval),
    interval = setInterval(function() { ball(); }, speed),
    speedTimer.innerText = Math.abs(parseFloat(speed / 1000)).toFixed(1) + " s"
  )
  : speedTimer.innerText = "Maximum speed";
}



const resetCardsButton = document.getElementById("resetAllCards");
const resetBoardButton = document.querySelector("#resetCardBoard");
let gameCard = document.querySelector("#gameCard");

const initializeVars = () => {
    speed = 3000;
    gameList = [];
    bolaEnJuego.innerText = "00";
    speedTimer.innerText = "0 s";
}

resetBoardButton.onclick = function() {
  resetGame(this.id);
}

resetCardsButton.onclick = function() {
  resetGame(this.id);
}

const resetGame = (buttonId = "") => {
  buttonId == "resetCardBoard" 
  ?
    (
      switchClass(true, "#list li","ballOut", "ballReset"),
      initializeVars()    
    ) 
  : "";
  
  buttonId == "resetAllCards"
  ?
  (
    removeElements(["#gameCard"], gameCard.childElementCount),
    gameCard.style = "border-color:#ffffff"
  ) 
  : "";

  // switchClass(true, "#list li","ballOut", "ballReset");
  // speed = 3000;
  // gameList = [];
  // bolaEnJuego.innerText = "00";
  // speedTimer.innerText = "0 s";
  // removeElements(["#gameCard"], gameCard.childElementCount);
  // gameCard.style = "border-color:#ffffff";
}


// resetButton.onclick = () => {
//   resetGame();
// }


const sacaBolas = (speed) => {
  for (let i = 0; i < inner.length; i++){
    clearInterval(interval);
    interval = setInterval(function() { ball(); }, speed);
  }
}

buttonBall.onclick = function(){
  this.innerText === "Saca Bola" ?
        (
          sacaBolas(speed),
          this.innerText = "Stop Bola",
          speedTimer.innerText = (speed / 1000).toFixed(1) + " s"
        )
        : stopBolas();
}


// gets a ramdon ball everytime without repeating. 
function ball() {
  let ball;
  inner.length > 0
    ? 
    (
      ball = Math.floor(Math.random() * (inner.length -1)),
      bolaEnJuego.innerText = (inner[ball] <10) 
        ?  `0${inner[ball]}` 
        : `${inner[ball]}`,
        switchClass(false, `#list li.li${inner[ball]}`, "ballReset", "ballOut"),
      // document.querySelector(`.li${ball}`).classList.add("ballOut"),,
      inner.splice(ball,1)
    ): bolaEnJuego.innerText = `00`;      
}

// random of a number from root to number
const rand = (root, num) => {
    return Math.floor(num + Math.random() * (root + 1 - num));
}

// array where the line numbers will be contained
let cardLine = [];


// creates a line for the game card
const line = (cardNum,lineNum) => {
    
    let ul = create('ul',`gameCardLine${lineNum}`);
    /***********************
     * ANOTHER POSSIBILITY *
     **********************/    
    // let n;
    // let li
    // for(let i=1; i<=9; i++){
    //   for (let j= (i-2); j<=i; j++){
    //     n = rand((i * 10)- 9, i * 10);
    //     li = n < 10 ? create('li', `li${num}-${i}`,`0${n}`) : create('li', `li${num}-${i}`,`${n}`),
    //     ul.appendChild(li);
    //     console.log(i,j,n);   
    //   }
    // }
    
    /*********************
     * ORIGINAL FUNCTION *
     *********************/
     let blank = 1;
     let nOB = 1;

    for (let i=1; i <= 9; i++){
      let n = rand(i * 10, (i * 10)- 9);     
      let li;
      let _empty = rand(0,3);
      if ((_empty === 1)&& !(blank > 4)){
        // try not to add more than 2 blanks per line
        // let prevI = i - 1;
        // if(nOB === 1 && i === prevI ){
        //   console.log('do Nothing', nOB);
        //   nOB = 0;
        // } else {
        li  = create('li',`li${cardNum}-${lineNum}-${i}`,"00");
        li.style.color = "#ffffff";
        ul.appendChild(li);
        blank++;
        //nOB++;
        continue;
      } else if(nOB < 6){
        if( n < 10){
          if(!cardLine.includes(n)) {
            cardLine.push(n);
            li  = create('li',`li${cardNum}-${lineNum}-${i}`,`0${n}`);
            ul.appendChild(li);
            nOB ++;
          } else {
              i--;
              continue;
          }
        }
        if( n >=10) {
            if(!cardLine.includes(n)){
              cardLine.push(n);
              li  = create('li',`li${cardNum}-${lineNum}-${i}`,n);
              ul.appendChild(li);
              nOB ++;
            } else {
                i--;
                continue;
            }     
        }        
      } else {
        i--;
        continue;
      }               
    }
    return ul;        
}

// generates game cards with 3 lines

const carton = (cardNum) => {
  let container = createId("div","cardContainer" + cardNum, "cardContainer");
  let singleCard = createId("div","singleCard" + cardNum, "singleCard");

  for (let i = 1; i<= 3; i++){
      singleCard.appendChild(line(cardNum, i));
  } 
  let resetCard = create("button", "resetCardButton","R");
  let lineCard = create("button", "lineCardButton","L");
  let bingoCard = create("button", "bingoCardButton", "B");
  let buttonContainer = createId("div", "cardButtonContainer" + cardNum, "cardButtonContainer");
  buttonContainer.appendChild(resetCard);
  buttonContainer.appendChild(lineCard);
  buttonContainer.appendChild(bingoCard);

  container.appendChild(singleCard);
  container.appendChild(buttonContainer);
  gameCard.appendChild(container);
  if (cardLine.length >= 30){
    cardLine = [];
  }
}
let clicks = 0;
function clickCount() {
  return clicks += 1;
}
// select the button which generates game cards
document.querySelector("#carton").onclick = () => {
  gameCard.style = "border-color:#444343";
  let cardNum = clickCount();
  carton(cardNum);

}

//buttons animation
const buttons = document.querySelectorAll("button");
buttons.forEach(btn => { 
  btn.addEventListener('click', function(e) {
    let x = e.clientX - e.target.offsetLeft;
    let y = e.clientY - e.target.offsetTop;

    let ripples = document.createElement('span');
    ripples.style.left = x + "px";
    ripples.style.top = y + "px";
    this.appendChild(ripples);

    setTimeout(() => {
      ripples.remove()
    }, 1000);
  })
});

const singleCard = document.querySelector("#gameCard");
singleCard.onclick = (e) => {
  console.log(e.target.id);
  let eT = e.target;
  eT.id === "gameCard" || eT.tagName !== "LI" || eT.innerText === "00"  ? "" : switchClass(false,`.${e.target.classList[0]}`,"ballReset","matchedNumber");
}
