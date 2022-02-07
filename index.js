const app = new PIXI.Application({
    resizeTo: window,
    resolution: devicePixelRatio,
});
app.view.width = innerWidth
app.view.height = innerHeight
let speed = 0.8;
const amount = 10
let animSpeed = 3;
let rotationSpeed = 0.1
pos = {
    x: innerWidth / 2,
    y: innerHeight / 2,
}
class cubis {
    constructor(speed, rotateX, rotateY) {
        this.points = [{
            x: 200,
            y: 200,
            pi: Math.PI * 3 / 4
        }, {
            x: 300,
            y: 200,
            pi: Math.PI / 4
        }, {
            x: 300,
            y: 300,
            pi: Math.PI / 4
        }, {
            x: 200,
            y: 300,
            pi: Math.PI * 3 / 4
        }, {
            x: 300,
            y: 300,
            pi: Math.PI * 5 / 4
        }, {
            x: 200,
            y: 300,
            pi: Math.PI * 7 / 4

        }, {
            x: 300,
            y: 200,
            pi: Math.PI * 7 / 4

        }, {
            x: 200,
            y: 200,
            pi: Math.PI * 5 / 4

        }, ]
        this.pos = pos
        this.deg = 0
        this.speed = 0
        this.incline = 0
        this.g = (4 + Math.random() * (10 - 4))*animSpeed
        this.randX = rotateX
        this.randY = rotateY
        this.textures = []
        this.lines = []
        this.lines3d = []
        this.incP = -1 + Math.random() * (1 + 1)
        this.rotationSpeed = Math.random() * 0.1

    }
}
cubicsSize = 65/devicePixelRatio;
incline = 0.5;
let cubics = []

function drawCoords() {
    for (let i = 0; i < amount; i++) {
        cubics[i] = new cubis(Math.random() * 10, Math.random() * 10, Math.random() * 2)
        for (let a = 0; a < 8; a++) {
            let starTexture = new PIXI.Graphics();
            starTexture.beginFill(0xffffff, 1);
            starTexture.drawCircle(0, 0, 1);
            starTexture.endFill();
            cubics[i].textures[a] = starTexture;
            if (i > 0) {
                //app.stage.addChild(cubics[i].textures[a])
            }
            cubics[i].textures[a].x = cubics[i].points[a].x
            cubics[i].textures[a].y = cubics[i].points[a].y
        }

    }
}
drawCoords();
function rotateDots(i, a, up) {
    let p = up ? 1 : 1;
    let c = Math.sin((p * (cubics[i].deg) + p * cubics[i].points[a].pi)) * Math.cos(cubics[i].deg) * cubicsSize
    return c;
}
app.ticker.add((delta) => {
    for (let i = 0; i < amount; i++) {
        if (cubics[i].deg < 2 * Math.PI) {
            cubics[i].deg += cubics[i].rotationSpeed * delta
        } else {
            cubics[i].deg = 0
        }
        cubics[i].g -= 0.1*animSpeed/2
        cubics[i].speed -= cubics[i].g
        cubics[i].incline += cubics[i].incP
        for (let a = 0; a < 8; a++) {
            if (a < 2 || a > 5) {
                cubics[i].textures[a].x = Math.cos(cubics[i].deg + cubics[i].points[a].pi) * cubicsSize + innerWidth / (2*devicePixelRatio) + cubics[i].incline
                cubics[i].textures[a].y = innerHeight/2 + rotateDots(i, a, false) + (cubicsSize / 1.5) * Math.sin(cubics[i].deg) + cubics[i].speed
            } else {
                cubics[i].textures[a].x = Math.cos(cubics[i].deg + cubics[i].points[a].pi) * cubicsSize + innerWidth / (2*devicePixelRatio) + cubics[i].incline
                cubics[i].textures[a].y =  innerHeight/2 + rotateDots(i, a, true) + (cubicsSize / 1.5) * Math.sin(cubics[i].deg + Math.PI) + cubics[i].speed
            }
        }

        for (let a = 0; a < 7; a++) {
            var line = new PIXI.Graphics();
            app.stage.removeChild(cubics[i].lines[a]);
            line.lineStyle(2, 0xffffff);
            line.moveTo(cubics[i].textures[a].x, cubics[i].textures[a].y);
            line.lineTo(cubics[i].textures[a + 1].x, cubics[i].textures[a + 1].y);
            cubics[i].lines[a] = line;
            app.stage.addChild(cubics[i].lines[a]);
        }
        for (let a = 0; a < 3; a++) {
            app.stage.removeChild(cubics[i].lines3d[a]);
            var line = new PIXI.Graphics();
            line.lineStyle(2, 0xffffff);
            line.moveTo(cubics[i].textures[a].x, cubics[i].textures[a].y);
            line.lineTo(cubics[i].textures[7 - a].x, cubics[i].textures[7 - a].y);
            cubics[i].lines3d[a] = line
            app.stage.addChild(cubics[i].lines3d[a]);

        }
        for (let i = 0; i < amount; i++) {
            app.stage.removeChild(cubics[i].linesNull);
            var line = new PIXI.Graphics();
            line.lineStyle(2, 0xffffff);
            line.moveTo(cubics[i].textures[7].x, cubics[i].textures[7].y);
            line.lineTo(cubics[i].textures[4].x, cubics[i].textures[4].y);
            line.moveTo(cubics[i].textures[0].x, cubics[i].textures[0].y);
            line.lineTo(cubics[i].textures[3].x, cubics[i].textures[3].y);
            // line.moveTo(cubics[i].textures[0].x, cubics[i].textures[0].y);
            // line.lineTo(cubics[i].textures[4].x, cubics[i].textures[4].y);
            // line.moveTo(cubics[i].textures[2].x, cubics[i].textures[2].y);
            // line.lineTo(cubics[i].textures[6].x, cubics[i].textures[6].y);
            // line.moveTo(cubics[i].textures[1].x, cubics[i].textures[1].y);
            // line.lineTo(cubics[i].textures[3].x, cubics[i].textures[3].y);
            // line.moveTo(cubics[i].textures[4].x, cubics[i].textures[4].y);
            // line.lineTo(cubics[i].textures[2].x, cubics[i].textures[2].y);
            cubics[i].linesNull = line
            app.stage.addChild(cubics[i].linesNull);
        }
        for (let a = 0; a < 8; a++) {
            if (cubics[i].textures[a].y > innerHeight + 100) {
                cubics[i].speed = 0;
                cubics[i].textures[a].y = innerHeight*100
                cubics[i].g = 7 + Math.random() * (14 - 7);
                cubics[i].deg = 0
                cubics[i].speed = 0
                cubics[i].incline = 0
                cubics[i].incP = -5 + Math.random() * (5 + 5)
                cubics[i].rotationSpeed = Math.random() * 0.1
            }
        }
    }

});
document.body.appendChild(app.view);