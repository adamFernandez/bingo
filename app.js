let app = document.getElementById("app");
let list= document.getElementById("list");
let bolaEnJuego = document.getElementById("bolaEnJuego");
bolaEnJuego.innerHTML = "00";
let inner = [];
let innerArray = document.getElementById("innerArray");
let bolasFuera = document.getElementById("bolasFuera");

for (i=1; i<=30;i++) {
  inner.push(i);
}
//inner.splice(inner[0],1])
list.innerHTML = ``;

for (i=1;i<=inner.length;i++) {
    if (i < 10 && i > 0 ){
      list.innerHTML += `<li id=\"${i}\">0${i}</li>`;
    } else if (i % 10 === 0) {
        list.innerHTML += `<li id=\"${i}\">${i}</li></ul><ul>`;
    }  else {
        list.innerHTML += `<li id=\"${i}\">${i}</li>`;
    }
}

const  ball = () => {
    if (inner.length > 0){
    let ball = Math.floor(Math.random() * (inner.length -1)) ;
        if (inner[ball] <10 && inner[ball] > 0) {
            bolaEnJuego.innerHTML = `0${inner[ball]}`;
            } else {
            bolaEnJuego.innerHTML = `${inner[ball]}`;
      }
    //bolaEnJuego.innerHTML = `${inner[ball]}`;
            //bolasFuera.innerHTML = inner[ball];
            document.getElementById(inner[ball]).style = "border: 2px solid red;border-radius: 50px 50px;background-color:#ffffcc;";
            inner.splice(ball,1);
          //innerArray.innerHTML = inner;
  } else {
      bolaEnJuego.innerHTML = `00`;
  }
}

let gameCard = document.getElementById("gameCard");
gameCard.style.display = "none";

const rand = (root, num) => {
    return Math.floor(root + Math.random() * (num + 1 - root));
}

let cardLine = [];
let cardLine2 = [];
let cardLine3 = [];


const numOrBlank = () => {
    let nOb = rand(3,0);
    return nOb;
}


const line = () => {
    let blank = 0;
    let ul = create('ul','gameCard');
    for (let i=1; i <= 9; i++){
      let n = rand(i * 10, (i * 10)- 9);      
      let li = create('li',`li${i}`);
      if ((numOrBlank()== 1)&& (blank <= 3)){
          li.innerHTML = "00";
          li.style.color = "#ffffff";
          ul.appendChild(li);
          blank++;
          continue;
      } else {
        if( n < 10){
            if(!cardLine.includes(n)) { 
              cardLine.push(n);
              li.innerHTML = `0${n}`;
              ul.appendChild(li);
            } else {
                i--;
                continue;
            }
        }
        if( n >=10) { 
            if(!cardLine.includes(n)){
              cardLine.push(n);
              li.innerHTML = n;            
              ul.appendChild(li);
            } else {
                i--;
                continue;
            }      
        }
      }   
    }
    
    gameCard.appendChild(ul);
    
}

const carton = (lines = 3) => {
    gameCard.style.display = "block";
    let card = document.querySelectorAll(".gameCard");
    let cards = Array.from(card);
    //let div = create("div","card");
    for (let i = 1; i<= lines; i++){
        line();
    }   
    cards.forEach( (c)=> {c.style.marginBottom = 5;});
    //gameCard.appendChild(div);
}

const create = (_element, _class) => {
  let el = document.createElement(_element);
  el.setAttribute('class', _class);
  return el;
}

//1 2 3 4 5 6 7 8 9
