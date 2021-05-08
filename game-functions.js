import Game from "./game.js";

let game = new Game();
let lastTime = 0;
const board = document.getElementById("board")

export const render = function(time) {
    if (game.getTrain1().isDead){
        $(".message").append("Player 1 Died. Player 2 Wins!")
        $(".newplay").append(`<button class="newgame" onClick="window.location.reload()">Play Again</button>`)
        return 
    }
    if (game.getTrain2().isDead){
        $(".message").append("Player 2 Died. Player 1 Wins!")
        $(".newplay").append(`<button class="newgame" onClick="window.location.reload()">Play Again</button>`)
        return 
    }
    window.requestAnimationFrame(render);
    const lastRender = (time - lastTime) / 1000;
    if (lastRender < 1 / game.getTrain1().speed){
        return
    }
    lastTime = time;
    updateGame();
    drawGame();
}
window.requestAnimationFrame(render);

export const updateGame = function(){
    for (let i = game.getTrain1().body.length-1; i > 0; i--){
        game.getTrain1().body[i].x = game.getTrain1().body[i-1].x;
        game.getTrain1().body[i].y = game.getTrain1().body[i-1].y;
    }
    game.getTrain1().body[0].x += game.getTrain1().curDirection.x;
    game.getTrain1().body[0].y += game.getTrain1().curDirection.y;

    for (let i = game.getTrain2().body.length-1; i > 0; i--){
        game.getTrain2().body[i].x = game.getTrain2().body[i-1].x;
        game.getTrain2().body[i].y = game.getTrain2().body[i-1].y;
    }
    game.getTrain2().body[0].x += game.getTrain2().curDirection.x;
    game.getTrain2().body[0].y += game.getTrain2().curDirection.y;

    game.updateTrain();
    game.updateTrainCar1();
    game.updateTrainCar2();
    game.isOver();

}

export const drawGame = function(){
    // for (let i=0; i < 25; i++){
    //     const trainElement = document.createElement('div');
    //     trainElement.classList.add("")
    //     board.appendChild(trainElement);
    // }
    board.innerHTML = '';
    game.drawTrain(board);
    game.drawTrainCar1(board);
    game.drawTrainCar2(board);
}

window.addEventListener('keydown', function (event){
    switch (event.key) {
        case 'ArrowRight':
            if (game.getTrain2().curDirection.x !== 0){
                break;
            }
            if (game.getTrain2().over === false){
            game.moveTrain2('right');
            }
            break;
        case 'ArrowLeft':
            if (game.getTrain2().curDirection.x !== 0){
                break;
            }
            if (game.getTrain2().over === false){
            game.moveTrain2('left');
            }
            break;
        case "ArrowDown":
            if (game.getTrain2().curDirection.y !== 0){
                break;
            }
            if (game.getTrain2().over === false){
            game.moveTrain2('down');
            }
            break;
        case 'ArrowUp':
            if (game.getTrain2().curDirection.y !== 0){
                break;
            }
            if (game.getTrain2().over === false){
            game.moveTrain2('up');
            }
            break;

        case 'd':
            if (game.getTrain1().curDirection.x !== 0){
                break;
            }
            if (game.getTrain1().over === false){
            game.moveTrain1('right');
            }
            break;
        case 'a':
            if (game.getTrain1().curDirection.x !== 0){
                break;
            }
            if (game.getTrain1().over === false){
            game.moveTrain1('left');
            }
            break;
        case 's':
            if (game.getTrain1().curDirection.y !== 0){
                break;
            }
            if (game.getTrain1().over === false){
            game.moveTrain1('down');
            }
            break;
        case 'w':
            if (game.getTrain1().curDirection.y !== 0){
                break;
            }
            if (game.getTrain1().over === false){
            game.moveTrain1('up');
            }
            break;
    }
})

