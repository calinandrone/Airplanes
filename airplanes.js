let mySky = document.getElementsByClassName("sky");
for (let i = 0; i < 100; i++) {
    let newDiv0 = document.createElement("div");
    newDiv0.className = "skysquare";
    mySky[0].appendChild(newDiv0);
    
    let newDiv1 = document.createElement("div");
    newDiv1.className = "skysquare";
    mySky[1].appendChild(newDiv1);
}


