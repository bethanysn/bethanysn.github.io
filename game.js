
export {Game as default};
let Game = function() {

    let train1 = {
        id: 1,
        score: 0,
        curDirection: {x:0, y:0},
        speed: 15,
        expand: 2,
        isDead: false,
        over: false,
        body: [{x: 4, y: 12}]
    }

    let train2 = {
        id: 2,
        score: 0,
        curDirection: {x:0, y:0},
        speed: 15,
        expand: 2,
        isDead: false,
        over: false,
        body: [{x: 22, y: 12}]
    }

    let trainCar1 = {x: 9, y: 12};
    let trainCar2 = {x: 17, y: 12};

    this.moveTrain1 = function(direction){
        if (direction === "up"){
            train1.curDirection = {x:0, y:-1};
        } else if (direction === "down"){
            train1.curDirection = {x:0, y:1};
        } else if (direction === "left"){
            train1.curDirection = {x:-1, y:0};
        } else if (direction === "right"){
            train1.curDirection = {x:1, y:0};
        }
    }

    this.moveTrain2 = function(direction){
        if (direction === "up"){
            train2.curDirection = {x:0, y:-1};
        } else if (direction === "down"){
            train2.curDirection = {x:0, y:1};
        } else if (direction === "left"){
            train2.curDirection = {x:-1, y:0};
        } else if (direction === "right"){
            train2.curDirection = {x:1, y:0};
        }
    }

    this.updateTrain = function(){
        document.getElementById('p1Score').innerHTML = train1.score;
        document.getElementById('p2Score').innerHTML = train2.score;
    }

    this.drawTrain = function(board){
        train1.body.forEach(element => {
            const trainElement = document.createElement('div');
            trainElement.style.gridRowStart = element.y;
            trainElement.style.gridColumnStart = element.x;
            trainElement.classList.add("train1")
            board.appendChild(trainElement);
        })
        train2.body.forEach(element => {
            const trainElement = document.createElement('div');
            trainElement.style.gridRowStart = element.y;
            trainElement.style.gridColumnStart = element.x;
            trainElement.classList.add("train2")
            board.appendChild(trainElement);
        })
    }

    this.getTrain1 = function(){
        return train1;
    }

    this.getTrain2 = function(){
        return train2;
    }

    this.updateTrainCar1 = function(){
        if (this.hitNewCar1(trainCar1)){
            this.addTrainCar1();
            train1.score += 20;
            trainCar1 = {x: Math.floor(Math.random()*24) +1, y: Math.floor(Math.random()*24) + 1};
            while (this.hitNewCar1(trainCar1)){
                trainCar1 =  {x: Math.floor(Math.random()*24) +1, y: Math.floor(Math.random()*24) + 1};
            }
        }
    }

    this.updateTrainCar2 = function(){
        if (this.hitNewCar2(trainCar2)){
            this.addTrainCar2();
            train2.score += 20;
            trainCar2 = {x: Math.floor(Math.random()*24) +1, y: Math.floor(Math.random()*24) + 1};
            while (this.hitNewCar2(trainCar2)){
                trainCar2 = {x: Math.floor(Math.random()*24) +1, y: Math.floor(Math.random()*24) + 1};
            }
        }
    }

    this.drawTrainCar1 = function(board){
        const trainCarElement = document.createElement('div');
        trainCarElement.style.gridRowStart = trainCar1.y;
        trainCarElement.style.gridColumnStart = trainCar1.x;
        trainCarElement.classList.add("trainCar1");
        board.appendChild(trainCarElement);
    }

    this.drawTrainCar2 = function(board){
        const trainCarElement = document.createElement('div');
        trainCarElement.style.gridRowStart = trainCar2.y;
        trainCarElement.style.gridColumnStart = trainCar2.x;
        trainCarElement.classList.add("trainCar2");
        board.appendChild(trainCarElement);
    }

    this.isOver = function() {
        if (train1.body[0].x < 1 || train1.body[0].y < 1
            || train1.body[0].x > 24 || train1.body[0].y > 24){
                train1.over = true;
                train1.isDead = true;
        }
        if (train2.body[0].x < 1 || train2.body[0].y < 1
            || train2.body[0].x > 24 || train2.body[0].y > 24){
                train2.over = true;
                train2.isDead = true;
        }
        for (let i=3; i < train1.body.length; i++){
            if (train1.body[0].x === train1.body[i].x &&
                train1.body[0].y === train1.body[i].y){
                    train1.over = true;
                    train1.isDead = true;
            }
        }
        for (let i=3; i < train2.body.length; i++){
            if (train2.body[0].x === train2.body[i].x &&
                train2.body[0].y === train2.body[i].y){
                    train2.over = true;
                    train2.isDead = true;
            }
        }

        for (let i=0; i < train2.body.length; i++){
            if (train1.body[0].x === train2.body[i].x &&
                train1.body[0].y === train2.body[i].y){
                    train1.over = true;
                    train1.isDead = true;
            }
        }

        for (let i=0; i < train1.body.length; i++){
            if (train2.body[0].x === train1.body[i].x &&
                train2.body[0].y === train1.body[i].y){
                    train2.over = true;
                    train2.isDead = true;
            }
        }
    }

    this.addTrainCar1 = function() {
        for (let i = 0; i < train1.expand; i++){
            train1.body.push({ ...train1.body[train1.body.length - 1]})
        }
    }

    this.addTrainCar2 = function() {
        for (let i = 0; i < train2.expand; i++){
            train2.body.push({ ...train2.body[train2.body.length - 1]})
        }
    }

    this.hitNewCar1 = function(location){
        if (train1.body[0].x === location.x 
            && train1.body[0].y === location.y) {
            return true;
        }  else {
            return false;
        }
    }

    this.hitNewCar2 = function(location){
        if (train2.body[0].x === location.x 
            && train2.body[0].y === location.y) {
            return true;
        }  else {
            return false;
        }
    }

    }