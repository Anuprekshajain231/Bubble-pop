let bubbles = ['one','two','three','four','five'];
let windowWidth = window.innerWidth;
let body = document.body;
let windowHeight = window.innerHeight;
let scores = document.querySelectorAll('.score');
let Pop = 0;
let total = 10;
let currentBubble = 0;
let gameOver = false;
let shadow = document.querySelector('.shadow');
let startbtn = document.querySelector('.start-btn');

function createBubble(){
    let div = document.createElement('div');
    let rand = Math.floor(Math.random() * bubbles.length);
    div.className = 'bubble bubble-' + bubbles[rand];
    rand = Math.floor(Math.random() * (windowWidth - 100));
    div.style.left = rand + 'px';
    div.dataset.number = currentBubble;
    currentBubble++;
    document.body.appendChild(div);
    animatebubble(div);
}

function animatebubble(elem){
    let position = 0;
    let random = Math.floor(Math.random() * 6 - 3);
    let interval = setInterval(frame, 12 - Math.floor(Pop / 10) + random);
    
    function frame(){
        if(position >= (windowHeight + 150 ) && (document.querySelector(
            '[data-number ="'+ elem.dataset.number +'"]') !==null)){
                clearInterval(interval);
                gameOver = true;
            }
            else{
                position++;
                elem.style.top = `${windowHeight - position}px`;
            }
    }
}   

function deletebubble(elem){
   elem.remove();
    Pop++;
    scoreUpdate();
}

function scoreUpdate(){
    for(let i = 0; i < scores.length; i++){
        scores[i].textContent = Pop;
    }
}

function startGame(){
    restartgame();
    let timeout = 0;
    let loop = setInterval(function (){
        timeout = Math.floor(Math.random() * 1000 - 80);
        if(gameOver !== true && Pop !== total){
            createBubble();
        }
        else if(Pop !== total){
            clearInterval(loop);
            shadow.style.display = 'flex';
            shadow.querySelector('.loser').style.display = 'block';
        }
        else{
            clearInterval(loop);
            shadow.style.display = 'flex';
            shadow.querySelector('.winner').style.display = 'block';
        }
    },1000 + timeout);
    
}
function restartgame(){
    let forRemoving = document.querySelectorAll('.bubble');
    for(let i = 0; i< forRemoving.length; i++){
        forRemoving[i].remove();
    }
    gameOver = false;
    Pop = 0;
    scoreUpdate();
}
document.addEventListener('click', function(event){
    if(event.target.classList.contains('.bubble')){
        deletebubble(event.target);
    }
});
document.querySelector('.restart').addEventListener('.click', function(){
    shadow.style.display = 'none';
    shadow.querySelector('.winner').style.display = 'none';
    shadow.querySelector('.loser').style.display = 'none';
    startGame();
});
document.querySelector('.cancel'),addEventListener('click', function () {
        shadow.style.display = 'none';
    });
startbtn.addEventListener('click',function(){
    startGame();
    document.querySelector('.main-game').style.display = 'none';
});