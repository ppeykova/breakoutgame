var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var r = 10;
var x = canvas.width/2;
var y = canvas.height-20;
var x1 = 2;
var y1 = -2;
var pheight = 12;
var pwidth = 75;
var paddleX = (canvas.width-pwidth)/2;
var row = 3;
var column = 6;
var bwidth = 57;
var bheight = 17;
var bpadding = 5;
var offtop = 40;
var offleft = 20;

var bricks = [];
for (var c = 0; c < column; c++) {
    bricks[c] = [];
    for (var rb = 0; rb < row; rb++) {
        bricks[c][rb] = { x: 0, y: 0, status: 1 };
    }
}

function View() {
    drawPaddle = function () {
        context.beginPath();
        context.rect(paddleX, canvas.height-pheight - 16, pwidth, pheight);
        context.fillStyle = "#397dd2";
        context.fill();
        context.stroke();
    },
    drawBall = function () {
        context.beginPath();
        context.arc(x, y, r, 0, Math.PI*2);
        context.fillStyle = "#ddd13c";
        context.fill();
        context.lineWidth = 0;
        context.stroke();
    },
    drawBricks = function () {
        for (var c = 0; c < column; c++) {
            for (var rb = 0; rb < row; rb++) {
                if (bricks[c][rb].status === 1) {
                    var brickX = (c * (bwidth + bpadding)) + offleft;
                    var brickY = (rb * (bheight + bpadding)) + offtop;
                    bricks[c][rb].x = brickX;
                    bricks[c][rb].y = brickY;
                    context.beginPath();
                    context.rect(brickX, brickY, bwidth, bheight);
                    if((rb === 0) && (c === 0 || c === 4) || (rb === 1 && (c === 2 || c === 5 )) || (rb === 2 && (c ===  2 || c === 5 ))){
                    context.fillStyle = "#ddd13c";
                    context.fill();
                    context.closePath();
                    } else if((rb === 0) && (c === 1 || c ===  5) || (rb === 1 && (c === 1)) || (rb === 2 && (c === 3 || c === 6 ))){
                        context.fillStyle = "#dd235a";
                        context.fill();
                        context.closePath();
                    } else if((rb === 0) && (c === 2) || (rb === 1 && (c === 0 || c === 6 )) || (rb === 2 && (c === 1))){
                    context.fillStyle = "#397dd2";
                    context.fill();
                    context.closePath();
                    } else {
                        context.fillStyle = "#23af22";
                        context.fill();
                        context.closePath();
                    }
                }
            }
        }
    },
    collisionDetection = function () {
        var check = false;
        for (var c = 0; c < column; c++) {
            for (var rb = 0; rb < row; rb++) {
                var b = bricks[c][rb];
                if (b.status === 1) {
                    check = true;
                    if (x > b.x && x < b.x + bwidth && y > b.y && y < b.y + bheight) {
                        y1 = -y1;
                        b.status = 0;
                    }
                }
            }
        }
        if(!check) {
            setTimeout(function () {window.alert("You win the game!")}, 20);
            window.location.reload();
            clearInterval(View);
        }
    },
    moveBall = function () {
    if(x + x1 > canvas.width-r || x + x1 < r) {
        x1 = -x1;
    }
    if(y + y1 < r) {
        y1 = -y1;
    }
    else if(y + y1 > canvas.height-r - 20) {
        if(x + 2*r - 1 > paddleX && x - r < paddleX + pwidth) {
            y1 = -y1;
        }
        else {
            alert("Game over...");
            x = 0;
            y = 0;
            window.location.reload();
            clearInterval(View); // Needed for Chrome to end game
        }
    }

        x += x1;
        y += y1;
    },
    canvasPaint = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawPaddle();
    drawBall();
    collisionDetection();
    moveBall();

    };

    this.init = function () {
        console.log("Initialising view...");
        canvas = document.getElementById("myCanvas");
        canvas.width = window.innerWidth ;
        canvas.height = window.innerHeight;
        canvasPaint();

        setInterval(canvasPaint, 10);

        if (window.DeviceOrientationEvent){
            window.addEventListener("deviceorientation", function(event){
                var x = event.gamma;
                if((x < 0 && paddleX + x > 0) || (x > 0 && paddleX < canvas.width - pwidth)) {
                paddleX += x;
                }
            });
        }
    };
}