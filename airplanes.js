let sky = document.getElementsByClassName("sky");

for (let i = 0; i < 100; i++) {
    sky[0].appendChild(createSkySquare(i, 1));
    sky[1].appendChild(createSkySquare(i, 3));
}

//player planes variables:
let myPlanes = [], planeSquares = [], range, x , y, sid, doc,
skySquares = Array.from(document.getElementsByClassName("skysquare1")),
button = document.querySelector("button"), select = document.querySelector("select");

//computer planes variables:
let computerSky = Array.from(document.getElementsByClassName("skysquare2")),
computerPlanes = [];


// functions:
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
        planeSquares = [document.getElementById(sid), document.getElementById(sid + 9), document.getElementById(sid + 10),
                    document.getElementById(sid + 11), document.getElementById(sid + 20), document.getElementById(sid + 29),
                    document.getElementById(sid + 30), document.getElementById(sid + 31)];
        range = rangeNorth;
    } else if (option == "south" && rangeSouth) {
        planeSquares = [document.getElementById(sid), document.getElementById(sid - 9), document.getElementById(sid - 10),
            document.getElementById(sid - 11), document.getElementById(sid - 20), document.getElementById(sid - 29),
            document.getElementById(sid - 30), document.getElementById(sid - 31)];
        range = rangeSouth;
    } else if (option == "east" && rangeEast) {
        planeSquares = [document.getElementById(sid), document.getElementById(sid - 1), document.getElementById(sid - 2),
            document.getElementById(sid - 3), document.getElementById(sid - 11), document.getElementById(sid + 9),
            document.getElementById(sid - 13), document.getElementById(sid + 7)];
        range = rangeEast;
    } else if (option == "west" && rangeWest) {
        planeSquares = [document.getElementById(sid), document.getElementById(sid + 1), document.getElementById(sid + 2),
            document.getElementById(sid + 3), document.getElementById(sid - 9), document.getElementById(sid + 11),
            document.getElementById(sid - 7), document.getElementById(sid + 13)];
        range = rangeWest;
    } else {
        doc = document.getElementById(sid);
        doc.removeEventListener("mouseenter", setBgGray);
        doc.removeEventListener("mouseleave", setBgEmpty);
        doc.removeEventListener("mouseenter", planePreview);
        doc.removeEventListener("click", setPlane);
    }
}

function setBgGray() {
    for (let ps of planeSquares) {
        if (overlapCheck("player", ps)) for (let ps of planeSquares)
                ps.removeEventListener("click", setPlane);
        if (!overlapCheck("player", ps)) 
                ps.style = 'background-color: #aaa';
    }
           
} 

function setBgEmpty() {
    for (let ps of planeSquares) {
            if (overlapCheck("player", ps)) for (let ps of planeSquares)
                    ps.removeEventListener("click", setPlane);
            if (!overlapCheck("player", ps))
                    ps.style = 'background-color: rgba(96, 139, 168, .1)'
    }
}

function setPlane() {
    if (range) {
        for (let ps of planeSquares) {
            if (!overlapCheck("player", ps)) {
                if (myPlanes.length == 0) {ps.style = 'background-color: rgba(179, 140, 119, .8)';}
                else if (myPlanes.length == 1) {ps.style = 'background-color: rgba(154, 182, 119, .8)';}
                else if (myPlanes.length == 2) {ps.style = 'background-color: rgba(120, 139, 181, .8)';}
            }
        }

        for (let square of skySquares) {
            square.removeEventListener("mouseenter", setBgGray);
            square.removeEventListener("mouseleave", setBgEmpty);
            square.removeEventListener("mouseenter", planePreview);
            square.removeEventListener("click", setPlane);
        }
        
        for (let ps of planeSquares) 
                if (!overlapCheck("player", ps)) createPlane("player", skySquares[sid - 100]);
    }
    select.disabled = false;
}

function createPlane (whose, square) {
    let plane = {
                head: square,
                body: planeSquares
                }; 
    if (whose == "player") myPlanes.push(plane);
    if (whose == "computer") computerPlanes.push(plane);
    if (myPlanes.length == 3) {
        button.disabled = true;
        document.getElementById("mp").style = 'background-color: skyblue; color: white';
    }
}

function overlapCheck (whose, ps) {
    let planes =[];
    if (whose == "player") planes = myPlanes;
    if (whose == "computer") planes = computerPlanes;
    if (planes.length == 0) return false;
    else if (planes.length == 1 ) {
        let check = (planes[0].body.some((elem) => elem.id == ps.id ));
        return check;
        
    } else if (planes.length == 2) {
        let concat = planes[0].body.concat(planes[1].body);
        let check = (concat.some((elem) => elem.id == ps.id ));
        return check;

    } else return true;
}

function randomDirection() {
    let rnd = Math.random();
    if (rnd < 0.25) return "north";
    else if (rnd < 0.5) return "south";
    else if (rnd < 0.75) return "east";
    else return "west";
}

function randomHead() {
    let rnd;
    do {
        rnd = Math.round(400 * Math.random());
    }
    while (rnd <= 300 || rnd >= 399);
    return rnd;
}

function createComputerPlanes() {
    do {
        let head = randomHead();
        let direction = randomDirection();
        let squareHead = document.getElementById(head);
        createPlaneSquares(direction, head);
        for (let ps of planeSquares) {
            if (!overlapCheck("computer", ps)) 
                        createPlane("computer", squareHead);
        }
        
    } while (computerPlanes.length < 3 );
}

function checkComputerPlanesOverlap() {
    for (let ps0 of computerPlanes[0].body) {
        for (let ps1 of computerPlanes[1].body) {
            if (ps0.id == ps1.id) {
                //console.log('0 and 1', ps0, ps1);
                return true;
            }
            
        }

        for (let ps2 of computerPlanes[2].body) {
            if (ps0.id == ps2.id) {
                //console.log('0 and 2', ps0, ps2);
                return true;
            }
        }
    }
    for (let ps1 of computerPlanes[1].body) {
        for (let ps2 of computerPlanes[2].body) {
            if (ps1.id == ps2.id) {
                //console.log('1 and 2',ps1, ps2);
                return true;
            }
        }
    }
    return false;
}   

function showComputerPlanes() {
    for (let i=0; i<computerPlanes.length; i++) {
    let color;
    if (i == 0) color = 'red';
    if (i == 1) color = 'green';
    if (i == 2) color = 'blue';
    for (let sq of computerPlanes[i].body) 
        sq.style = 'background-color: ' + color;
    }
}
// no more functions!

for (let square of skySquares) {
        function planePreview () {
            sid = Number(square.id);
            for (let option of Array.from(select.options)) {
                if (option.selected) createPlaneSquares(option.value, sid);
            } 
        }
    square.addEventListener("mouseenter", planePreview);
}

button.addEventListener("click", () => {
                    select.disabled = true;
                    for (let square of skySquares) {
                        square.addEventListener("mouseenter", setBgGray);
                        square.addEventListener("mouseleave", setBgEmpty);
                        square.addEventListener("click", setPlane);
                    }});

//create computer planes:

createComputerPlanes();
do {
    if (checkComputerPlanesOverlap()) {
        computerPlanes = [];
        createComputerPlanes();
    } 
} while (checkComputerPlanesOverlap());
document.getElementById("cp").style = 'background-color: skyblue; color: white';

// Show computer plane - to be comented out
showComputerPlanes();
// Show computer plane - to be comented out 


