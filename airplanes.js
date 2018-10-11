let sky = document.getElementsByClassName("sky");

for (let i = 0; i < 100; i++) {
    sky[0].appendChild(createSkySquare(i, 1));
    sky[1].appendChild(createSkySquare(i, 3));
}

let myPlanes = [], planeSquares = [], freeSkySquares = [], range, x , y, sid, doc;
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
        if (overlapCheck(ps)) for (let ps of planeSquares)
                ps.removeEventListener("click", setPlane);
        if (!overlapCheck(ps)) 
                ps.style = 'background-color: #aaa';
    }
           
} 

function setBgEmpty() {
    for (let ps of planeSquares) {
            if (overlapCheck(ps)) for (let ps of planeSquares)
                    ps.removeEventListener("click", setPlane);
            if (!overlapCheck(ps))
                    ps.style = 'background-color: rgba(96, 139, 168, .1)'
    }
}

function setPlane() {
    if (range) {
        for (let ps of planeSquares) {
            if (!overlapCheck(ps)) {
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
                if (!overlapCheck(ps)) createPlane(skySquares[sid - 100]);
    }
}

function createPlane (square) {
    let plane = {
                head: square,
                body: planeSquares
                };         
    myPlanes.push(plane);
    if (myPlanes.length == 3) button.disabled = true;

}
function overlapCheck (ps) {
    let i = 0;
    if (myPlanes.length == 0) return false;
    else if (myPlanes.length == 1 ) {
        let check = (myPlanes[0].body.some((elem) => elem.id == ps.id ));
        return check;
        
    } else if (myPlanes.length == 2) {
        let concat = myPlanes[0].body.concat(myPlanes[1].body);
        let check = (concat.some((elem) => elem.id == ps.id ));
        return check;

    } else return true;
}

function freeSky() {
    freeSkySquares = [];
    for (let square of skySquares) {
        for (let option of Array.from(select.options)) {
            if (option.selected) createPlaneSquares(option.value, square.id);
            console.log(planeSquares);
        }
        if (OverlapCheck()) freeSkySquares.push(square);
    }
}

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
                    for (let square of skySquares) {
                        square.addEventListener("mouseenter", setBgGray);
                        square.addEventListener("mouseleave", setBgEmpty);
                        square.addEventListener("click", setPlane);
                    }
                                });
