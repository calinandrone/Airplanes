let sky = document.getElementsByClassName("sky");

for (let i = 0; i < 100; i++) {
    sky[0].appendChild(createSkySquare(i, 1));
    sky[1].appendChild(createSkySquare(i, 3));
}

let myPlanes = [], planeSquares = [], range, x , y, sid;
let skySquares = Array.from(document.getElementsByClassName("skysquare1"));
let button = document.querySelector("button");
let select = document.querySelector("select");

function createSkySquare (i, a) {
    let newDiv = document.createElement("div");
    newDiv.className = "skysquare" + a;
    newDiv.id = 100 * a + i;
    return newDiv;
}

function createPlaneSquares (option, sid) {
    x = Math.round(((sid / 10) - Math.floor(sid / 10)) * 10);
    let b = Math.floor(sid / 10);
    y = Math.round(((b / 10) - Math.floor(b / 10)) * 10);
    let rangeNorth = ((x > 0 && x < 9) && (y >= 0 && y < 7)), rangeSouth = ((x > 0 && x < 9) && (y > 2 && y <= 9)),
        rangeEast = ((x > 2 && x <= 9) && (y > 0 && y < 9)), rangeWest = ((x >= 0 && x < 7) && (y > 0 && y < 9));

    if (option == "north" && rangeNorth) {
        console.log("north");
        planeSquares = [document.getElementById(sid), document.getElementById(sid + 9), document.getElementById(sid + 10),
                    document.getElementById(sid + 11), document.getElementById(sid + 20), document.getElementById(sid + 29),
                    document.getElementById(sid + 30), document.getElementById(sid + 31)];
        range = rangeNorth;
    } else if (option == "south" && rangeSouth) {
        console.log("south");
        planeSquares = [document.getElementById(sid), document.getElementById(sid - 9), document.getElementById(sid - 10),
            document.getElementById(sid - 11), document.getElementById(sid - 20), document.getElementById(sid - 29),
            document.getElementById(sid - 30), document.getElementById(sid - 31)];
        range = rangeSouth;
    } else if (option == "east" && rangeEast) {
        console.log("east");
        planeSquares = [document.getElementById(sid), document.getElementById(sid - 1), document.getElementById(sid - 2),
            document.getElementById(sid - 3), document.getElementById(sid - 11), document.getElementById(sid + 9),
            document.getElementById(sid - 13), document.getElementById(sid + 7)];
        range = rangeEast;
    } else if (option == "west" && rangeWest) {
        console.log("west");
        planeSquares = [document.getElementById(sid), document.getElementById(sid + 1), document.getElementById(sid + 2),
            document.getElementById(sid + 3), document.getElementById(sid - 9), document.getElementById(sid + 11),
            document.getElementById(sid - 7), document.getElementById(sid + 13)];
        range = rangeWest;
    } else console.log("mouse out of range");
        
    console.log("planeSquares range", planeSquares, range);
}

function setBgGray() {
    for (let ps of planeSquares) ps.style = 'background-color: #aaa'
}
function setBgEmpty() {
    for (let ps of planeSquares) ps.style = 'background-color: rgba(96, 139, 168, .1)'
}
function setPlane() {

}

function createPlane (square) {
    let plane = {
                head: square,
                body: planeSquares
                };         
    myPlanes.push(plane);
    //if (myPlanes.length = 3) button.disabled = true;
}

for (let square of skySquares) {
    square.addEventListener("mouseenter", () => {
                            sid = Number(square.id);
                            for (let option of Array.from(select.options)) {
                                if (option.selected) createPlaneSquares(option.value, sid);
                            } 
                        });
}

button.addEventListener("click", () => {
                console.log("clicked");
                
                    if (range) {
                        console.log("if range");
                        for (let square of skySquares) {
                        square.addEventListener("mouseenter", setBgGray);
                        square.addEventListener("mouseleave", setBgEmpty);
                        square.addEventListener("click", () => {for (let ps of planeSquares) ps.style = 'background-color: skyblue';
                                    square.removeEventListener("mouseenter", setBgGray);
                                    square.removeEventListener("mouseleave", setBgEmpty);
                                    createPlane(square);});
                        }
                    }
                
});
