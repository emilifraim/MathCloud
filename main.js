var canvasBg = document.getElementById('canvasBg');
var ctxBg = canvasBg.getContext('2d');

var canvasMenu = document.getElementById('canvasMenu');
var canvasMu = canvasMenu.getContext('2d');

var canvasLetterA = document.getElementById('canvasLetterA');
var ctxA = canvasLetterA.getContext('2d');

var canvasStar = document.getElementById('canvasStar');
var ctxStar = canvasStar.getContext('2d');

var canvasScore = document.getElementById('canvasScore');
var ctxScore = canvasScore.getContext('2d');
ctxScore.fillStyle = "hsla(0,0%,0%,0.5)";
ctxScore.font = "bold 20px Arial";

var mouseX = 0;
var mouseY = 0;

var btnPlay = new Button(290,490,210,330);
var A1 = new LetterA();
//var star1 = new Star();
var gameWidth = canvasBg.width;
var gameHeight = canvasBg.height;
var isPlaying = true; 

var inMenu = false; 
var btnAdd = new Button(55,335,160,315);
var btnSub= new Button(446,738,160,315);
var btnMul = new Button(55,335,335,490);
var btnDiv = new Button(446,738,335,490);

var requestAnimFrame = window.requestAnimationFrame || 
                       window.webkitRequestAnimationFrame ||
                       window.mozRequestAnimationFrame ||
                       window.msRequestAnimationFrame ||
                       window.oRequestAnimationFrame;
           
//empty list 
var starsArr = [];
var spawnAmount = 5;// basically 2 stars 

var imgSprite = new Image();
imgSprite.src = 'Html5Game.png';
imgSprite.addEventListener('load',init,false);

var rectObject = [];
var QuesAns = [];
var vv = 0;
var counter = 0;
    
//moving Background 
var bgDrawX1 = 0;
var bgDrawX2 = 1350;    //full image size 

var Correct = new CorrectIncorrect(870,1020);
var Incorrect = new CorrectIncorrect(170,1212);

var stopClouds = false;

var operator = "none";
var Addition = false;
var Subtraction = false;
var Multiplication  = false;
var Division = false;

 var user = document.getElementById("user");


function hideText(){
    user.style.display= "none";
    user.style.visibility = "hidden";
}

function ShowText(){
    user.style.display= "inline";
    user.style.visibility = "visible";
}


function moveBg(){
    bgDrawX1 -= 1.5;
    bgDrawX2 -= 1.5;
    if(bgDrawX1 <= -1350){
        bgDrawX1 = 1350;
    }else if(bgDrawX2 <= -1350){
        bgDrawX2 = 1350;
    }
    drawBg();
}

//end of moving Background
    
    
// main functions 

function init(){  
    //we want to create stars before the program runs 
    //spawnStar(spawnAmount);
    
    spawnRect(spawnAmount);
    drawMenu();
    
    document.addEventListener('click',mouseAddition ,false);
    document.addEventListener('click',mouseSubtraction ,false);
    document.addEventListener('click',mouseMultiplication ,false);
    document.addEventListener('click',mouseDivision,false);    
    document.addEventListener('click',mouseClicked,false);
}

function playGame(){
    drawBg();
    startLoop();  
    UpdateScore();
    document.addEventListener('keydown',checkKeyDown,false);   
    document.addEventListener('keyup',checkKeyUp,false)
}



function spawnStar(number){
    for(var i =0; i < number; i++){
        starsArr[starsArr.length] = new Star();
    }
}

function drawAllStars(){
    clearCtxStar();
    for(var i = 0; i < starsArr.length; i++){
        starsArr[i].drawStar();
    }
}


function spawnRect(number){
    var yyy =40;
    for(var i=0; i<number; i++){
        rectObject[rectObject.length] = new Rectangle(i,yyy);
        yyy+=90;
    }
}

function drawAllRect(){
    //ctxA.clearRect(0,0,gameWidth,gameHeight);
    for(var i = 0; i < rectObject.length; i++){
        rectObject[i].draw();
    }
}

function recycleAllStars(){
    var yyy =40;
    for(var i=0; i<5; i++){
        rectObject[i].drawX = 820;
        rectObject[i].drawYy = yyy;
        yyy += 90;
        rectObject[i].DontRecycle = false;
    }
}

function recycleAllBullts(){
    for(var i=0; i<20; i++){
        A1.bullets[i].drawX = -20;
    }
}

function CreateAllQues(){
    for(var i = 0; i < 20; i++){
        QuesAns[QuesAns.length] = new QuestionAnswers();
    }
}


function loop(){
    if(isPlaying){
       moveBg();
       A1.drawA(counter);
       //star1.drawStar();      
       //drawAllStars();
       if(!stopClouds){
           drawAllRect();
       }
       requestAnimFrame(loop);
    }  
}

function startLoop(){
    isPlaying = true;
    loop();
}

function stopLoop(){
    isPlaying = false;;
}

function drawMenu(){
    var scrX = 0;
    var scrY = 0;
    var drawX = 0;
    var drawY = 0;
    //first grab the pictyre from srcX scrY down to gameWidth,gameHeight 
    //then draw picture on canvas frim drawX drawY to gameWidth,gameHeight 
    ctxBg.drawImage(imgSprite,scrX,scrY,gameWidth,gameHeight,drawX,drawY,gameWidth,gameHeight);
    
}
var ccc;
function drawMenu2(){
    var scrX = 0;
    var scrY = 1600;
    var drawX = 0;
    var drawY = 0;
    //first grab the pictyre from srcX scrY down to gameWidth,gameHeight 
    //then draw picture on canvas frim drawX drawY to gameWidth,gameHeight 
    ctxBg.drawImage(imgSprite,scrX,scrY,gameWidth,gameHeight,drawX,drawY,gameWidth,gameHeight);
 
    
    
    
}

function drawBg(){
    var scrX = 0;
    var scrY = 504;
    var drawX = 0;
    var drawY = 0;
    //first grab the pictyre from srcX scrY down to gameWidth,gameHeight 
    //then draw picture on canvas frim drawX drawY to gameWidth,gameHeight 
    clearCtxBg();
    ctxBg.drawImage(imgSprite,scrX,scrY,1350,gameHeight,bgDrawX1,drawY,1350,gameHeight);
    ctxBg.drawImage(imgSprite,scrX,scrY,1350,gameHeight,bgDrawX2,drawY,1350,gameHeight);
}

function clearCtxBg(){
    ctxBg.clearRect(0,0,gameWidth,gameHeight);
}

function UpdateScore(){
    ctxScore.clearRect(0,0,gameWidth,gameHeight);
    ctxScore.fillText("Score: "+ A1.score,680,30);
    ctxScore.fillText("UserName: "+user.value,30,30); 
}
// end of main function


// Letter A functions and constructor 

function LetterA(counter){
    this.scrX = 23;
    this.scrY = 1060;
    this.width = 160;
    this.height = 110;
    this.speed = 2;
    this.drawX = 10;
    this.drawY = 200;
    this.noseX = this.drawX + 80; // where the bullets coming from
    this.noseY = this.drawY + 50; // where the bullets coming from
    
    //Canvas boundaries for the ...
    this.leftX = this.drawX;
    this.rightX = this.drawX + this.width;
    this.topY = this.drawY;
    this.bottomY = this.drawY + this.height;
    
    this.isUpKey = false;
    this.isDownKey = false;
    this.isRightKey = false;
    this.isLeftKey = false;
    this.isSpacebar = false;
    this.isShooting = false;
    // empty list for bullets in the LetterA constructor 
    this.bullets = [];
    this.currentBullet = 0;
    this.counter = 0;
    
    this.solutions = [];
    
    for(var i =0; i < 20; i++){
        this.bullets[this.bullets.length] = new Bullet();
    }
    
    this.score = 0;

}

LetterA.prototype.drawA = function(){
    clearCtxA();
    this.UpdateCoors();
    //first grab the pictyre from srcX scrY down to gameWidth,gameHeight 
    //then draw picture on canvas frim drawX drawY to gameWidth,gameHeight
    this.checkDirection();
    //defines this.noseX and this.noseY everytime it draws 
    this.checkShooting();
    this.drawAllBullets();
    
    ctxA.drawImage(imgSprite,this.scrX,this.scrY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);
    ctxA.fillStyle = "blue";
    ctxA.font = "bold 30px Arial";
    ctxA.fillText(QuesAns[this.counter].num1+" "+operator+" "+QuesAns[this.counter].num2+" = ?", this.drawX+20, this.drawY+65);
};

LetterA.prototype.UpdateCoors = function(){
    this.noseX = this.drawX + 80; // where the bullets coming from
    this.noseY = this.drawY + 50; // where the bullets coming from
    this.leftX = this.drawX;
    this.rightX = this.drawX + this.width;
    this.topY = this.drawY;
    this.bottomY = this.drawY + this.height;
};

LetterA.prototype.checkDirection = function(){ // chancge the variable of thhe updatecore function 
    if(this.isUpKey && this.topY > 0){
        this.drawY -= this.speed;
    }
    if(this.isRightKey && this.rightX < gameWidth){
        this.drawX += this.speed;
    }
    if(this.isDownKey && this.bottomY < gameHeight){
        this.drawY += this.speed;
    }
    if(this.isLeftKey && this.leftX > 0){
        this.drawX -= this.speed;
    }
};

LetterA.prototype.drawAllBullets =function() {
    for(var i = 0; i < this.bullets.length; i++){
        if(this.bullets[i].drawX >= 0){
            this.bullets[i].drawBullet();
        }
        if(this.bullets[i].explosion.hasHit){
            this.bullets[i].explosion.drawExplosion();
            
        }
    }
    if(Correct.hasHit){
        Correct.drawCorrect();
    }
    if(Incorrect.hasNotHit){
        Incorrect.drawIncorrect();
    }
};

LetterA.prototype.checkShooting = function() {
    if(this.isSpacebar && !this.isShooting){
        this.isShooting = true;
        this.bullets[this.currentBullet].fire(this.noseX,this.noseY);
        this.currentBullet++;
        if(this.currentBullet >= this.bullets.length){
            this.currentBullet = 0;
        }
    }else if(!this.isSpacebar){
        this.isShooting = false;
    }
};

LetterA.prototype.UpdateScore =function(points) {
    this.score += points;
    UpdateScore();
};

function clearCtxA(){
    ctxA.clearRect(0,0,gameWidth,gameHeight);
}
  
// end of Letter A functions and constructor 
/////////////////////////////////////////////////////////////////////
function Rectangle(c,y){
    this.scrX = 288;
    this.scrY = 1028;
    this.drawX = 820;
    this.drawY = y;
    this.stepX = 1;
    this.stepY = 0;
    this.width = 172;
    this.height = 110;
    this.c = c;
    this.rewardPoints = 5;
    this.penaltyPoints = -3;
    this.DontRecycle = false;
    this.number = 5;
}
      
Rectangle.prototype.draw = function(){
    ctxA.drawImage(imgSprite,this.scrX,this.scrY,this.width,this.height,this.drawX,this.drawY,this.width-25,this.height-25);
    ctxA.fillStyle = "blue";
    ctxA.font = "bold 50px Arial";
    ctxA.fillText(QuesAns[A1.counter].ArrSolutions[this.c], this.drawX+50, this.drawY+65);  
    if(!this.DontRecycle)this.drawX -= this.stepX;   
    this.checkEscaped();
};

//checkes escaped stars
Rectangle.prototype.checkEscaped = function(){
    if(this.drawX + this.width <= 0){
        this.recycleStar();
    }
};
//recycle escaped stars
Rectangle.prototype.recycleStar = function(){
    this.drawX = 820;
    this.drawY = rectObject[this.c].drawY;
};

function clearCtxRect(){
    ctxA.clearRect(0,0,gameWidth,gameHeight);
}
// end of star functions and constructor 
  
//////////////////////////////////////////////////////////////////  


////////////////////////////////////////////////////////////////////////////
function QuestionAnswers(){
    if(Addition){
        this.num1 = Math.floor((Math.random()*15)+0);
        this.num2 = Math.floor((Math.random()*15)+0);
        this.answer = this.num1+this.num2;  
        operator = "+"
    }
    
    if(Subtraction){
        this.num1 = Math.floor((Math.random()*15)+0);
        this.num2 = Math.floor((Math.random()*this.num1)+0);
        this.answer = this.num1-this.num2;  
        operator = "-";
    }
    
    if(Multiplication){
        this.num1 = Math.floor((Math.random()*15)+0);
        this.num2 = Math.floor((Math.random()*15)+0);
        this.answer = this.num1*this.num2;  
       operator = "*";
    }
    
    if(Division){
        this.num1 = Math.floor((Math.random()*15)+0);
        this.num2 = Math.floor((Math.random()*15)+0);
        this.dividend = this.num1 * this.num2;   
        this.num1 = this.dividend;
  
        this.answer = this.num1 / this.num2;  
        operator = "/";
    }
    
    this.ArrSolutions = [];
    
    for(var i=0;i<4;i++){
        this.ArrSolutions[i] = Math.floor((Math.random()*this.answer)+0);
    }
    this.ArrSolutions[i] = this.answer;

    for (var i = this.ArrSolutions.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = this.ArrSolutions[i];
        this.ArrSolutions[i] = this.ArrSolutions[j];
        this.ArrSolutions[j] = temp;
    } 
    
    for(var i=0;i<5;i++){
        console.log("["+i+"] = "+this.ArrSolutions[i]);
    }
}
/////////////////////////////////////////////////////////////////////////////
//
// Bullet functions and constructor 

function Bullet(){
    this.scrX = 225;
    this.scrY = 1080;
    this.width = 30;
    this.height = 20;
    this.speed = 3;
    this.drawX = -20;
    this.drawY = 0;
    this.explosion = new Explosion();
}

Bullet.prototype.drawBullet = function(){
    this.drawX += this.speed;
    ctxA.drawImage(imgSprite,this.scrX,this.scrY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);
    this.CheckHitStar();
    if(this.drawX > gameWidth){
        this.recycleBullet();// recycles the bullets 
    }
};

Bullet.prototype.fire = function(startX,startY){
    this.drawX = startX;
    this.drawY = startY;
};

Bullet.prototype.recycleBullet = function(){
    this.drawX = -20;
};

Bullet.prototype.CheckHitStar = function(){
    for(var i = 0; i < rectObject.length; i++){
        if(this.drawX >= rectObject[i].drawX &&
           this.drawX <= rectObject[i].drawX + rectObject[i].width &&
           this.drawY >= rectObject[i].drawY-30 &&
           this.drawY <= rectObject[i].drawY + rectObject[i].height ){       
               //position of the explostion
               this.explosion.drawX = rectObject[i].drawX - (this.explosion.width/2);
               this.explosion.drawY = rectObject[i].drawY;
               this.explosion.hasHit = true;
               this.recycleBullet();
               rectObject[i].recycleStar(); 
               if(QuesAns[A1.counter].answer === QuesAns[A1.counter].ArrSolutions[i]){
                   A1.counter++;
                   A1.UpdateScore(rectObject[i].rewardPoints);
                   recycleAllStars();
                   recycleAllBullts();
                   Correct.hasHit = true;
               }else{         
                   A1.UpdateScore(rectObject[i].penaltyPoints);
                   rectObject[i].DontRecycle = true;
                   Incorrect.hasNotHit = true;
               }
        }
    }
    DontRecycle = false;
};
// end of bullet functions and constructor 

// Explosion functions and constructor 
function Explosion(){
    this.scrX = 0;
    this.scrY = 1225;
    this.width = 98;
    this.height = 70;
    this.drawX = 0;
    this.drawY = 0;
    this.hasHit = false;
    this.currentFrame = 0;
    this.tottaleFrames = 10;//how long the explosion is going to br shown on the screen 
}

Explosion.prototype.drawExplosion = function(){
    if(this.currentFrame <= this.tottaleFrames){
        ctxA.drawImage(imgSprite,this.scrX,this.scrY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);
        this.currentFrame++;
    }else{
        this.hasHit = false;
        this.currentFrame = 0;
    }
};
// end of Explosion functions and constructor 


// Star functions and constructor 

function CorrectIncorrect(sX,sY){
    this.scrX = sX;//521 881
    this.scrY = sY;//1040 1040
    this.width = 400;
    this.height = 330;
    this.width2 = 300;
    this.height2 = 230;
    this.speed = 2;
    this.drawX = 230;
    this.drawY = 150;
    this.hashit = false;
    this.hasNothit = false;
    this.currentFrame = 0;
    this.tottaleFrames = 40;
}

CorrectIncorrect.prototype.drawCorrect = function(){
    if(this.currentFrame <= this.tottaleFrames && this.hasHit){
        clearCtxInfo();
        stopClouds = true;
        ctxStar.drawImage(imgSprite,this.scrX,this.scrY,this.width,this.height,this.drawX,this.drawY,this.width2,this.height2);
        this.currentFrame++;
        if(this.currentFrame <= 12){
            this.width2+=5;
            this.height2+=5;
        }
    }else{
        stopClouds = false;
        this.width2=300;
        this.height2=230;
        this.hasHit = false;
        this.currentFrame = 0;
        clearCtxInfo();
    }
};

CorrectIncorrect.prototype.drawIncorrect = function(){
    if(this.currentFrame <= this.tottaleFrames && this.hasNotHit){
        clearCtxInfo();
        stopClouds = true;
        ctxStar.drawImage(imgSprite,this.scrX,this.scrY,this.width,this.height,this.drawX,this.drawY,this.width2,this.height2);
        this.currentFrame++;
        if(this.currentFrame <= 12){
            this.width2+=4;
            this.height2+=4;
        }
    }else{
        stopClouds = false;
        this.width2=300;
        this.height2=230;
        this.hasNotHit = false;
        this.currentFrame = 0;
        clearCtxInfo();
    }
};
function clearCtxInfo(){
    ctxStar.clearRect(0,0,gameWidth,gameHeight);
}
// end of star functions and constructor 

//(55,490,210,330)
// Button functions and constructor 
function Button(xL,xR,yT,yB) {
    this.xLeft = xL;
    this.xRight = xR;
    this.yTop = yT;
    this.yBottom = yB;
}

Button.prototype.checkCliked = function() {
        if(this.xLeft <= mouseX && mouseX <= this.xRight && this.yTop <= mouseY && mouseY <= this.yBottom){
            console.log("hit the point");
            return true;
        }
};
// end of Button functions and constructor 


// event functions

function checkKeyDown(e){
    //for different browsers, if one is not available then it will use a different one 
    var keyId = e.keyCode || e.which; 
    if(keyId === 38 || keyId === 87){ //means up arrow or w key
        A1.isUpKey = true;
        e.preventDefault();
    }
    if(keyId === 39 || keyId === 68){ //means right arrow or d key
        A1.isRightKey = true;
        e.preventDefault();
    }
    if(keyId === 40 || keyId === 83){ //means down arrow or s key
        A1.isDownKey = true;
        e.preventDefault();
    }
    if(keyId === 37 || keyId === 65){ //means left arrow or a key
        A1.isLeftKey = true;
        e.preventDefault();
    }
    if(keyId === 32){ //means spacebar arrow or a key
        A1.isSpacebar = true;
        e.preventDefault();
    }
}

function checkKeyUp(e){
    var keyId =  e.keyCode || e.which; //for different browsers 
    if(keyId === 38 || keyId === 87){ //means up arrow or w key
        A1.isUpKey = false;
        e.preventDefault();
    }
    if(keyId === 39 || keyId === 68){ //means right arrow or d key
        e.preventDefault();
        A1.isRightKey = false;
    }
    if(keyId === 40 || keyId === 83){ //means down arrow or s key
        e.preventDefault();
        A1.isDownKey = false;
    }
    if(keyId === 37 || keyId === 65){ //means left arrow or a key
        e.preventDefault();
        A1.isLeftKey = false;
    }
    if(keyId === 32){ //means spacebar arrow or a key
        A1.isSpacebar = false;
        e.preventDefault();
    }
}

function mouseClicked(e){
    var rect = canvasBg.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    if(!inMenu){
        if(btnPlay.checkCliked()){
            //document.removeEventListener('click',mouseClicked,false);
            //or a different way with isPlaying 
            inMenu = true;
            drawMenu2();
            isPlaying = false;
            ShowText();
        }
    }
}

function mouseAddition(e){
    var rect = canvasBg.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    if(!isPlaying){
        if(btnAdd.checkCliked()){
            //document.removeEventListener('click',mouseClicked,false);
            //or a different way with isPlaying 
            Addition = true;
            CreateAllQues();
            playGame();
            hideText();
            
        }
    }
}

function mouseSubtraction(e){
    var rect = canvasBg.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    if(!isPlaying){
        if(btnSub.checkCliked()){
            //document.removeEventListener('click',mouseClicked,false);
            //or a different way with isPlaying 
            Subtraction = true;
            CreateAllQues();
            playGame();
            hideText();
        }
    }
}

function mouseMultiplication(e){
    var rect = canvasBg.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    if(!isPlaying){
        if(btnMul.checkCliked()){
            //document.removeEventListener('click',mouseClicked,false);
            //or a different way with isPlaying 
            Multiplication  = true;
            CreateAllQues();
            playGame();
            hideText();
        }
    }
}

function mouseDivision(e){
    var rect = canvasBg.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    if(!isPlaying){
        if(btnDiv.checkCliked()){
            //document.removeEventListener('click',mouseClicked,false);
            //or a different way with isPlaying 
            Division = true;
            CreateAllQues();
            playGame();
            hideText();
        }
    }
}


// enf of event functions 
