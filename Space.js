


//--------Movement of the Space Ship-----------\\


document.onkeydown = function(e) {
    console.log(e.keyCode);
    if (e.keyCode === 37) {
        console.log("left");
        hero.left = hero.left - 10;
        moveHero()
    }
    // else if (e.keyCode === 40) {
    //     consolelog("down");
    // }
    else if (e.keyCode === 39) {
        console.log("right");
        hero.left = hero.left +10;
        moveHero()
    }
    else if (e.keyCode === 32) {
        console.log("fire")
        missiles.push({
            left:hero.left +15 ,
            top: hero.top
        })
        drawMissiles()
    }
    // else if (e.keyCode === 38) {
    //     consolelog("up");
    // }
}


//-----Arrays for Missiles and enemies-------\\
//*left them empty for missiles because the for loop will push the missiles when called. which you can see at the bottom of Space Ship Controls*\\
//*as for enemies i put the ammount of enemies in this array but i also put them in certain locations of the screen which resulted in it being in two rows in front of but also distant from the Space Ship*\\

let missiles = [];
let enemies = [
    {left: 200, top:100},
    {left: 300, top:100},
    {left: 400, top:100},
    {left: 500, top:100},
    {left: 600, top:100},
    {left: 700, top:100},
    {left: 800, top:100},
    {left: 900, top:100},
    {left: 200, top:175},
    {left: 300, top:175},
    {left: 400, top:175},
    {left: 500, top:175},
    {left: 600, top:175},
    {left: 700, top:175},
    {left: 800, top:175},
    {left: 900, top:175},
];

//---Hero variable---\\
let hero = {
    top:700,
    left:550
};


//*the moveHero function operates on the "hero" which is the Space Ship, by equaling the hero "space ship" picture to the "hero.left + "px" this will allow the program to move the picture 
//to the new spot via button input. The ammount it moves is determined in the Space Ship controls which is in the top. 

function moveHero() {
    document.getElementById("hero").style.left = hero.left + "px";
}


//*this brings out the missiles at the location you press the button to fire. The reason the missile starts at the Space Ships location is because of the Space Ship controls. I gave it initial values for
//*the starting locations.


//*the for loop has an iteration that essentially has no max value or "limit". The loop pulls out the picture from the css via ID and also for the div class part I put the array and within the array 
//*I put the missile iteration so now it'll push out the missiles. This only draws it out, it does not move them.

function drawMissiles() {
    document.getElementById("missiles").innerHTML = "";
    for(let missile = 0; missile < missiles.length; missile++) {
        document.getElementById("missiles").innerHTML += 
        `<div class='missile' style='left:${missiles[missile].left}px;
        top:${missiles[missile].top}px;'></div>`;
    }
}


//*This moves the Missiles by also using a for loop within a function. I just set the missile array = to the displacement formula which is "enemies[enemy].top -5"
//*the -5 is essentially the velocity of the beams.


function moveMissiles() {
    for(let missile = 0; missile < missiles.length; missile++) {
        missiles[missile].top = missiles[missile].top - 5;
    }
}


//*drawEnemies draws out the enemy "picture" the same way draw missiles does. This also does not move the "enemies"

function drawEnemies(){
    document.getElementById("enemies").innerHTML = "";
    for(let enemy = 0; enemy < enemies.length;enemy++) {
        document.getElementById("enemies").innerHTML += 
        `<div class='enemy' style='left:${enemies[enemy].left}px;
        top:${enemies[enemy].top}px;'></div>`;
    }
}

//*This works the same as moveMissiles function, just replace the missiles/missile variable within the array to the enemies/enemy variable.

function moveEnemies() {
    for(let enemy = 0; enemy < enemies.length; enemy++) {
        enemies[enemy].top = enemies[enemy].top +0.5;
    }
}

//*this is used to make the enemies and the missiles disappear, what it does is basically when/if the missile intersects with the perimeter of the object then it splice them.
//*setting them "</=/>" to each other basically tells it that when they both reach the outermost point for both then they will be spliced. 
//*adding the  "+50"to the top and bottom formulas basically gives it the perimeter of the enemies, the value came from the height and width of my alien img from my css.

function collisionDetection() {
    for(let enemy = 0; enemy < enemies.length; enemy++) {
        for(let missile = 0; missile < missiles.length; missile++) {
            if( 
            (missiles[missile].top <= enemies[enemy].top + 50) &&
            (missiles[missile].top >= enemies[enemy].top) &&
            (missiles[missile].left >= enemies[enemy].left) &&
            (missiles[missile].left <= enemies[enemy].left + 50))
            {
                enemies.splice(enemy, 1);
                missiles.splice(missile, 1);
            }
            console.log("boom!")
        }
    }
}


//*this is the function that allows the game to run one cycle, I have not been able to make it repeat itself due to time restraints.

function gameLoop() {
    setTimeout(gameLoop, 10)
    moveMissiles();
    drawMissiles();
    moveEnemies();
    drawEnemies();
    collisionDetection();
}
gameLoop();
