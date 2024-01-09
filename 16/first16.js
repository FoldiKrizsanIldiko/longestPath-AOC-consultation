const fs = require("fs");
let path = "input.txt";
let data = fs.readFileSync(path, "utf-8");

data = data.split("\r\n").map((row) => {
  return row.split("");
});

//console.log(data);
let newTable = [...data].map((row) => row.map((e) => (e = [])));
let moves = { "^": [-1, 0], "v": [1, 0], "<": [0, -1], ">": [0, 1] };

let moveLeftRight = {
  ".": [">"],
  "|": ["^", "v"],
  "-": [">"],
  "\\": ["v"],
  "/": ["^"],
};
let moveRightLeft = {
  ".": ["<"],
  "|": ["^", "v"],
  "-": ["<"],
  "\\": ["^"],
  "/": ["v"],
};
let moveUpDown = {
  ".": ["v"],
  "|": ["v"],
  "-": [">", "<"],
  "\\": [">"],
  "/": ["<"],
};

let moveDownUp = {
  ".": ["^"],
  "|": ["^"],
  "-": [">", "<"],
  "\\": ["<"],
  "/": [">"],
};

let whatisOnNextstepAndWhereToGo = {
  ">": moveLeftRight,
  "<": moveRightLeft,
  "^": moveDownUp,
  v: moveUpDown,
};
//mi legyen a vége, mikör lőjem ki a vonalat?
let queue = []; //ebbe push amikor kanyar van, és shift amikor veszem ki
let currentdirection = "v"; //ebből indulok ki // HARDCODE!!!!!!
let done = false;
let turn = 1;
let i = 0;
let j = 0;


do {
   // console.log(`Current direction is ${currentdirection}`);
 if (!newTable[i][j].includes(currentdirection))
   newTable[i][j].push(currentdirection); //beleírom a táblába a jelet
  let nextStep = moves[currentdirection]; //a koordináták hozzáadása amerre majd megyek
 // console.log(nextStep);
  //console.log(checkEdges(i + nextStep[0], j + nextStep[1]));
  if (!checkEdges(i + nextStep[0], j + nextStep[1])) {
    //megnézem benne van-e a táblába a kövi lépés
    let chOfnextStep = data[i + nextStep[0]][j + nextStep[1]]; //mi van a kövi lépésen a data táblába
   // console.log(`Current direction is : 68 line ${currentdirection}`);
   // console.log(`whatisOn... ${data[2][10]}`);
    let currentdirectionArray =
      whatisOnNextstepAndWhereToGo[currentdirection][chOfnextStep]; //felveszem a jelet amit kell a kövi lépés alapján
   // console.log(`Current direction is  :${currentdirection}`);
    if (currentdirectionArray.length > 1) {
      //ha ez egy jel akkor semmi
      queue.push({
        direction: currentdirectionArray[1],
        coord: [i + nextStep[0], j + nextStep[1]],
      }); // ha több jel akkor tebb el a koord későbbre
    }
    currentdirection=currentdirectionArray[0];
  //  console.log(queue);
  //  console.log(
  //    !newTable[i + nextStep[0]][j + nextStep[1]].includes(currentdirection)
 //   );
    if (
      !newTable[i + nextStep[0]][j + nextStep[1]].includes(currentdirection)
    ) {
      newTable[i + nextStep[0]][j + nextStep[1]].push(currentdirection); //ide még kell egy ellenőrzé, hogy van-e már ilyen jel benne //pusholni kell
   //   console.log(newTable[i + nextStep[0]][j + nextStep[1]]);
      i = i + nextStep[0]; //átlépek
      j = j + nextStep[1]; //átlépek
    } else {
      if (queue.length == 0) {
        done = true;
      } else {
        let nextLine = queue.shift();
        currentdirection = nextLine.direction;
        i = nextLine.coord[0];
        j = nextLine.coord[1];
      }
    }
    
  } else {
    if (queue.length == 0) {
      done = true;
    } else {
      let nextLine = queue.shift();
      currentdirection = nextLine.direction;
      i = nextLine.coord[0];
      j = nextLine.coord[1];
    }
  } //ha kiszaladtam, akkor vigyem tovább a kövi szálat
//  console.log(turn);
  turn++;
//  console.log(newTable);
  fs.writeFileSync(
    "result.txt",
    newTable.map((row) => row.map((el) => el.join("-")).join("\t")).join("\r")
  );
} while (!done);


function checkEdges(i, j) {
 
  if (i < 0 || i > data.length-1 || j < 0 || j > data[0].length-1) {
 //    console.log(`i is: ${i} , j is : ${j}  these are good`);
    return true;
  } else return false;
}

let counter=0;
newTable.forEach(row=>{
    row.forEach(e=>{
        if(e.length!=0){
            counter++;
        }
    })
})

console.log(`Final result, number of energized field is : ${counter}`)