console.log('hello')
let user = JSON.parse(localStorage.getItem("thisUser"))
//Animation to falling the instractions down when you come to the game
let instraction = setInterval(frame1, 85);
let pos = 0;
let goingDown = document.getElementById(`instractions`)
function frame1() {
  if (pos == 10) {
    clearInterval(instraction);
  }
  else {
    pos++;
    goingDown.style.top = pos + 'vh';
  }
}
let words1 = ['מעיל', 'כובע', 'חולצה', 'נעליים', 'חצאית', 'גרביים', 'מכנסיים', 'מגפיים', 'אפודה', 'סוודר', 'כפפות', 'קפוצון', 'סווטשר', 'חליפה', 'גלימה', 'וסט', 'חגורה', 'מגבעת', 'עניבה', 'צעיף', 'קסקט', 'שכמיה', 'שמלה', 'כפכפים'];
let words2 = ['גלידה', 'לחם', 'עוף', 'תפוח', 'סלט', 'פיצה', 'פלאפל', 'מרק', 'אפרסק', 'שניצל', 'תפוז', 'אורז', 'לימון', 'פירה', 'המבורגר', 'שווארמה', 'ביסלי', 'באגט', 'במבה', 'ציפס', 'פסטה', 'חלב', 'בשר', 'זיתים', 'חציל', 'אורז', 'ביצה', 'דגים', 'לביבה', 'פשטידה', 'קקאו', 'דלעת', 'כרובית']
let words3 = ['הוריקן', 'טורנדו', 'גאות', 'שפל', 'צונאמי', 'גייזר', 'ברק', 'רעם', 'מערבולת', 'מטאור', 'קשת', 'לגונות', 'עובש', 'תסיסה', 'חמצון', 'סערה', 'טייפון', 'ציקלון', 'שלג', 'פיורדים'];
let word, counterLeter, countWordsFrom10 = 0, cuontgames = 8, countFruit, countFruitPop;
let whichLevel = [];
let flagFruit = "true";
let flagtimmer = "true";
let flagFinishLevel = "false";
let nameOfUser = document.querySelector("#nameUser");
nameOfUser.textContent = `משחק כעת: ${user.name}`;
//Everything that happen whem you start game!!
function newGame(eventArgs) {
  noInstractions();
  if ((flagFruit === "true") || (counterLeter == word.length) || (flagtimmer === "true")) {
    flagFruit = "false";
    flagtimmer = "false";
    flagFinishLevel = "false"
    counterLeter = 0;
    countFruit = 7;
    countFruitPop = 7;
    word = randWord(eventArgs);
    clearBoard();
    creatWord();
    creatFruits();

    if (seeTimmer) {
      clearInterval(seeTimmer);
    }
    time = nowTimmer;
    myTimer();

    document.querySelector('#countWordsFrom10').textContent = countWordsFrom10;
  }
}
document.querySelector('#clue').addEventListener('click', clue);
document.querySelector('#btnInstractions').addEventListener('click', btnInstraction);
document.querySelector('#level1').addEventListener('click', myArr);
document.querySelector('#level2').addEventListener('click', myArr);
document.querySelector('#level3').addEventListener('click', myArr);
document.querySelector('#level1Finish').addEventListener('click', afterFinishLevel);
document.querySelector('#level2Finish').addEventListener('click', afterFinishLevel);
document.querySelector('#level3Finish').addEventListener('click', afterFinishLevel);
document.querySelector('#letters').addEventListener('click', clickLeter);
document.querySelector('#newWord').addEventListener('click', newGame);
//Random Word from the array
function randWord() {
  let myIndexWord = Math.floor(Math.random() * whichLevel.length);
  return whichLevel[myIndexWord];
}
//choose which array to take according the user's choice
function myArr(eventArgs) {
  let whichcategory = document.querySelector("#hThisLevel")
  if (eventArgs.target.dataset.level == "1") {
    whichLevel = words1;
    whichcategory.textContent = "פרטי לבוש";
    nowTimmer = 60;
  }
  if (eventArgs.target.dataset.level == "2") {
    whichLevel = words2;
    whichcategory.textContent = "מאכלים";
    nowTimmer = 55;
  }
  if (eventArgs.target.dataset.level == "3") {
    whichLevel = words3;
    whichcategory.textContent = "תופעות טבע";
    nowTimmer = 45;
  }
  let btns = document.querySelectorAll(".btn");
  for (let i = 0; i < btns.length; i++) {
    btns[i].style.display = "block";
  }
  newGame();
}
//creat letter's divs
function creatWord() {
  let board = document.querySelector('#word');
  for (let i = 0; i < word.length; i++) {
    board.append(createletterDiv(i));
  }
}
//creat div for the word
function createletterDiv(i) {
  let newDiv = document.createElement('div');
  newDiv.className = "card";
  newDiv.id = `leter${i}`;
  return newDiv;
}
//what happened when I click no a letter
function clickLeter(eventArgs) {
  let notClick = eventArgs.target.dataset.flag;
  if ((eventArgs.target.localName === "button") && (notClick == "false")) {
    eventArgs.target.dataset.flag = "true";
    changeColor(eventArgs);
    checkLeter(eventArgs);

  }
}
//cheking the letter you click now
function checkLeter(eventArgs) {
  let flagSuccess = false;
  let check = eventArgs.target.dataset.value;
  for (let i = 0; i < word.length; i++) {
    if (check == word[i]) {
      let divLeter = document.querySelector(`#leter${i}`);
      divLeter.textContent = check;
      counterLeter++;
      flagSuccess = true;
    }
  }
  if (flagSuccess != true)
    downlendFruit();
  else {
    if (counterLeter == word.length) {
      cantClickTheLetter()
      successWord();
      finishWord();
    }
    else
      successLeter();
  }
}
//change the color of the botton after click
function changeColor(eventArgs) {
  eventArgs.target.style.backgroundColor = "#A5D9F3";
}
//what happen when you success to guess real letter
function successLeter() {
  var audioEl1 = document.createElement("audio");
  audioEl1.src = "../audio/success letter-1-6297.mp3";
  audioEl1.autoplay = "true";
  document.body.appendChild(audioEl1);
}
//what happen when you success to guess whole word!
function successWord() {
  var audioEl2 = document.createElement("audio");
  audioEl2.src = "../audio/sucsesWord.mp3";
  audioEl2.autoplay = "true";
  document.body.appendChild(audioEl2);
  countWordsFrom10++;
}
//specific audio when fruit fall down
function voiceFruit() {
  var audioEl4 = document.createElement("audio");
  var audioEl3 = document.createElement("audio");
  audioEl4.src = "../audio/falling.mp3";
  audioEl3.src = "../audio/fruit boom.wav";
  audioEl4.autoplay = "true";
  document.body.appendChild(audioEl4);
  audioEl3.autoplay = "true";
  document.body.appendChild(audioEl3);
}
//clean the board after you success to guess word
function clearBoard() {
  nonPopFruit();
  noneNewWord();
  let board = document.querySelector('#word');
  let clearFruit = document.querySelector('#fruit');
  returnletters();
  board.innerHTML = " ";
  clearFruit.innerHTML = " ";
}
//what happened when you click on worng letter
function downlendFruit() {
  ftuitFall();
  countFruit = countFruit - 1;
  if (countFruit == 0) {
    cantClickTheLetter();
    findOut();
    finishWord();
    gameOverVoice();
  }
  else
    voiceFruit();
}
//Animation that falling the fruiys down (after the last function) 
function ftuitFall() {
  let elem = document.getElementById(`fruit${countFruit}`)
  var pos = 0;
  let heightOrange = window.innerHeight - elem.offsetTop - elem.offsetHeight;
  let id = setInterval(frame, 1);
  function frame() {
    heightOrange--;
    if (heightOrange === 0) {
      clearInterval(id);
      elem.className = "hide";
      popSee();
    }
    else {
      pos++;
      elem.style.top = pos + 'px';
    }
  }
}
//specific audio when your game over
function gameOverVoice() {
  var audioEl2 = document.createElement("audio");
  audioEl2.src = "../audio/game over.wav";
  audioEl2.autoplay = "true";
  document.body.appendChild(audioEl2);
}
//change the button's color to the starting color... when you start new word.And let click on them again.
function returnletters() {
  let le = document.querySelectorAll(".letter");
  for (let i = 0; i < le.length; i++) {
    le[i].style.backgroundColor = "#ebd0b7";
    le[i].dataset.flag = "false";
  }
  let clue1 = document.querySelector("#clue")
  clue1.dataset.flag = "false";
  clue1.style.color = "black";
}
//creat fruits on the tree with images
function creatFruits() {
  let fruitPlace = document.querySelector("#fruit");
  let row = 0;
  let coulm = 0;
  for (let i = countFruit; i > 0; i--) {
    let newFruit = document.createElement("img");
    newFruit.src = "../images/fruit.png";
    newFruit.className = "fruit";
    newFruit.id = `fruit${i}`;
    fruitPlace.append(newFruit);
  }
  let fruit1 = document.querySelector("#fruit1");
  fruit1.style.gridColumn = `${2}/${3}`;
  fruit1.style.gridRow = `${1}/${2}`;
  let fruit2 = document.querySelector("#fruit2");
  fruit2.style.gridColumn = `${1}/${2}`;
  fruit2.style.gridRow = `${2}/${3}`;
  let fruit3 = document.querySelector("#fruit3");
  fruit3.style.gridColumn = `${4}/${5}`;
  fruit3.style.gridRow = `${2}/${3}`;
  let fruit4 = document.querySelector("#fruit4");
  fruit4.style.gridColumn = `${3}/${4}`;
  fruit4.style.gridRow = `${3}/${4}`;
  let fruit5 = document.querySelector("#fruit5");
  fruit5.style.gridColumn = `${5}/${6}`;
  fruit5.style.gridRow = `${4}/${5}`;
  let fruit6 = document.querySelector("#fruit6");
  fruit6.style.gridColumn = `${2}/${3}`;
  fruit6.style.gridRow = `${5}/${6}`;
  let fruit7 = document.querySelector("#fruit7");
  fruit7.style.gridColumn = `${4}/${5}`;
  fruit7.style.gridRow = `${5}/${6}`;
}
//find you the whole word when you d'ont success to guess the word
function findOut() {
  for (let i = 0; i < word.length; i++) {
    let checking = document.querySelector(`#leter${i}`)
    checking.textContent = word[i];
  }
}
//Cover the option to click on new word
function noneNewWord() {
  let afterNewWord = document.getElementById(`bottonNewWord`);
  afterNewWord.style.display = "none";
}
//Cover the option to see the word's instractions when you click
function noInstractions() {
  let myInstractions = document.querySelector(`#instractions`);
  myInstractions.style.display = "none";
}
//Diss cover the option to see the word's instractions when you click
function btnInstraction() {
  if (flagFinishLevel == "true") {
    let myInstractions = document.querySelector(`#instractions`);
    myInstractions.style.display = "block";
    myInstractions.style.top = "10vh";
  }
}
let time, seeTimmer, nowTimmer;
//Timmer for each new word
function myTimer() {
  let timmer = document.getElementById("timmer")
  seeTimmer = setInterval(() => {
    let second = time % 60;
    let minutes = Math.floor(time / 60);
    let zero = "";
    if (second < 10)
      zero = "0"
    timmer.innerHTML = "0" + minutes + ":" + zero + second;
    if (time === 0) {
      clearInterval(seeTimmer);
      findOut();
      finishWord();
      gameOverVoice();
      cantClickTheLetter()
      flagtimmer = "true";
    }
    time--;
  }, 1000)
}
//what happened when you finish/not success the word
function finishWord() {
  let btn = document.querySelector(`#bottonNewWord`);
  btn.style.display = "flex";
  flagFinishLevel = "true";
  let leterrs = document.querySelector(`#letters`)
  clearInterval(seeTimmer);
  cuontgames--;
  if (cuontgames == 0) {
    finishLevel();
  }

}
//what happened when you finishthe level you were in it
function finishLevel() {
  let btns = document.querySelectorAll(".btn")
  for (let i = 0; i < btns.length; i++) {
    btns[i].style.display = "none";
  }
  let massageFinishLevel = document.querySelector("#finishLevel");
  massageFinishLevel.style.display = "block";
  let vidoePlace = document.querySelector("#videoFinishLevel");
  if (countWordsFrom10 < 4) {
    let imageWin = document.querySelector("#videoWin");
    imageWin.style.display = "none";
    let gameOverVideo = document.querySelector("#videoGameOver");
    gameOverVideo.style.display = "block";
  }
  else {
    let imageWin1 = document.querySelector("#videoWin");
    imageWin1.style.display = "block";
    let gameOverVideo1 = document.querySelector("#videoGameOver");
    gameOverVideo1.style.display = "none";
  }
  let score = document.querySelector("#massageScore");
  let massage = document.querySelector("#massageToYou");
  massage.textContent = `שלום  ${user.name} ,הצלחת לנחש ${countWordsFrom10} מילים בשלב זה`;
  if (user.highScore < countWordsFrom10) {
    user.highScore = countWordsFrom10;
    localStorage.setItem(user.password, JSON.stringify(user));
    localStorage.setItem("thisUser", JSON.stringify(user));
  }
  score.textContent = `השיא שלך הוא: ${user.highScore} מילים נכונות מתוך 8`
  countWordsFrom10 = 0;
  cuontgames = 8;
}
//what happened when you chose another level
function afterFinishLevel(eventArgs) {
  let massageFinishLevel = document.querySelector("#finishLevel");
  massageFinishLevel.style.display = "none";
  myArr(eventArgs);
}
//Can give you a clue during the game
function clue(eventArgs) {
  if (flagFinishLevel == "false") {
    let i;
    let clueDiv;
    let notClick = document.querySelector("#clue");
    if ((notClick.dataset.flag == "false")) {
      notClick.dataset.flag = "true";
      notClick.style.color = "#FF4B4B";
      do {
        i = Math.floor(Math.random() * word.length);
        clueDiv = document.querySelector(`#leter${i}`);
      } while ((clueDiv.textContent !== ""))
      let check = word[i];
      for (let i = 0; i < word.length; i++) {
        if (check == word[i]) {
          let divLetter = document.querySelector(`#leter${i}`);
          divLetter.textContent = check;
          counterLeter++;
        }
      }
      if (counterLeter == word.length) {
        successWord();
        finishWord();
      }
    }
  }
}
//Pop tjhe pruits after they falled from the tree
function popSee() {
  let pop = document.querySelector(`#pop${countFruitPop}`)
  pop.style.display = "block";
  countFruitPop--;
  if (countFruitPop == 0)
    flagFruit = "true";
}
//Dont see the pop fruits when you start new word
function nonPopFruit() {
  let pops = document.querySelectorAll('.allPops');
  for (let i = 0; i < pops.length; i++) {
    pops[i].style.display = "none";
  }
}
//Don't let to click on the lettrs after you lose/success
function cantClickTheLetter() {
  let le = document.querySelectorAll(".letter");
  for (let i = 0; i < le.length; i++) {
    le[i].style.backgroundColor = "#ebd0b7";
    le[i].dataset.flag = "true";
  }

}


















