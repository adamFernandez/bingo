const minus = document.getElementById("minus");
const plus = document.getElementById("plus");
let speed = 1000;
const speedTimer = document.getElementById("speedTimer");
speedTimer.innerText = 0;
let seconds = 0;


//reducing timer speed
minus.onclick = () => {
  speed < 5000 ?
  (
    speedDown(),
    clearInterval(interval),
    interval = setInterval(function() { ball(); }, speed),
    seconds += +0.5,
    speedTimer.innerText = seconds + " s",
    console.log(speedTimer.innerText,speed)
  )
  : speedTimer.innerText = "Minimum speed";
}


//adding timer speed
plus.onclick = () => {
  speed > 500 ?
  (
    speedUp(),
    clearInterval(interval),
    interval = setInterval(function() { ball(); }, speed),
    seconds -= +0.5,
    speedTimer.innerText = parseFloat(seconds) + " s",
    console.log(speedTimer.innerText, speed)
  )
  : speedTimer.innerText = "Maximum speed";
}


// ELEMENT MANIPULATION

//remove a given number elements from an array of elements

const removeElements = (elements = [], cardNum) => {
  for (let i = 0; i < cardNum; i++){
      elements.forEach((e) => { document.querySelector(e).lastElementChild.remove(); });
      //elements.forEach((e) => { Array.from(document.querySelectorAll(e)).forEach((el) => { el.lastChild.remove(); }) });
  }
}

// Toggle on checkbox checked elements in an array
// -id: checkbox id // -elements: array of elements to show or hide // -label: label id to manipulate 
// -message: default of Add or Remove + message.value (default(Add) + "Image caption")
const processCheckBox = (selector,elements = [],label,message) => {
  let el = document.querySelector(selector);
  el.onclick = () => {
  let removeMsg = `Remove ${message}`;
  let addMsg = `Add ${message}`;
  
  el.checked ?
  ( 
    elements.forEach((e) => { Array.from(document.querySelectorAll(e)).forEach((el) => { el.style.display = ""; }) }),
    document.querySelector(label).innerText = removeMsg
  )
    :
  (
    elements.forEach((e) => { Array.from(document.querySelectorAll(e)).forEach((el) => { el.style.display = "none"; }) }),
    document.querySelector(label).innerText = addMsg
  )
}    
}

// checks if checkboxes are checked and returns their value
function checkBoxesChecked(checkBoxes = []){
let result = [];
checkBoxes.forEach((ch)=> { document.querySelector(ch).checked ? result.push(true) : result.push(false); });
return result;
}

// hide a group of elements of the same kind
function hideElements(selector) {
  document.querySelectorAll(selector).forEach((e) => { e.style.display = "none"; });
}

// shows a group of elements
function showElements(selector, way = "block") {
  document.querySelectorAll(selector).forEach((e) => { e.style.display = way; });
}

// writes messages to a group of elements
function writeText(elements = [],message){
  elements.forEach((el) => { Array.from(document.querySelectorAll(el)).forEach((e) => { e.innerText = message; }); });
}

// remove or adds a class on checkbox element checked and change its label text
const replaceClass = (id,element,_class,label, message) => {
  let _label = document.querySelector(label);
  let addMsg = `Show ${message}`;
  let removeMsg = `Hide ${message}`;
  let el = document.querySelectorAll(element);
  !id.checked ?
    (
      el.forEach((e) => { e.classList.add(_class); }),
      _label.innerText = addMsg 
    ) :
    (
      el.forEach((e) => {  e.classList.remove(_class); }),
      _label.innerText = removeMsg

    )
       
}

// replace an oldClass with a newClas given an elementId group
function switchClass(_element,oldClass, newClass) {
  el = document.querySelectorAll(_element);
  el.forEach((e) => { 
    e.classList.contains(newClass) 
    ? e.classList.remove(oldClass) 
    : (e.classList.add(newClass), e.classList.remove(oldClass)); })
}

// Adds a class to an element group if a given className is already contained.  
function addClass(_element, className, classContained) {
  let el = document.querySelectorAll(_element);
  el.forEach((e) => { 
    e.classList.contains(classContained) 
    ? e.classList.add(className) 
    : (e.classList.add(classContained)); });
}
