const fs = require("fs");
const path = "input.txt";

let data = fs.readFileSync(path, "utf-8");

data = data.split("\r\n").map((row) => row.split(""));
let origData = data.map((row) =>
  !row.includes("S") ? row : row.map((el) => (el == "S" ? "." : el))
);

let counter = 0;
//fs.writeFileSync("result" + path, data.map((row) => row.join("")).join("\r"));

let fourDirection = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
]; //down, up, right, left

//megkeresem S-t és végignézem a fourDirection ha nem # akkor írok oda 1. Ezzel tudom folytatni.. egészen 6-ig.
//Végül megszámolom a hatosokat?

for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].length; j++) {
    if (data[i][j] == "S") {
      data[i][j] = 0;
      break;
    }
  }
}
let numberOfTurns = 500;


//IDE KELL MEGÍRNI, HOGY HA KICSI A TÁBLA AKKOR BŐVÍTSE KI!!!!!!!

for (let turn = 0; turn < numberOfTurns; turn++) {
  let medCount = 0;
  cicle: for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] == turn) {
        if (
          i == data.length - 1 ||
          i == 0 ||
          j == 0 ||
          j == data[i].length - 1
        ) {
          expandTheTable(turn);
          //  turn--;
          //  break cicle;
          i = i + origData.length;
          j = j + origData[0].length;
        }
        // fs.writeFileSync(
        //   "result" + path,
        //   data.map((row) => row.join("")).join("\r")
        // );
        // console.log(data[0]);
        fourDirection.forEach((dir) => {
          if (data[i + dir[0]][j + dir[1]] != "#") {
            data[i + dir[0]][j + dir[1]] = turn + 1;
          }
        });
      }
    }
  }
  data.forEach((row) => {
    row.forEach((el) => {
      el == turn + 1 && medCount++;
    });
  });

  fs.appendFileSync("resultapp" + path, medCount.toString() + "\n");
}

data.forEach((row) => {
  row.forEach((el) => {
    el == numberOfTurns && counter++;
  });
});
console.log(counter);

function expandTheTable(num) {
  let howManyElementToLR = origData[0].length;
  let howManyElementToUpDown = origData.length;

  let tabletoLR = data.map((row) => row.slice(0, howManyElementToLR));
  tabletoLR = tabletoLR.map((row) => {
    return row.map((el) => (el != "#" ? "." : el));
  });
  //console.log(tabletoLR);

  for (let i = 0; i < data.length; i++) {
    data[i] = [...tabletoLR[i], ...data[i], ...tabletoLR[i]];
  }
  let a = data.slice(0, howManyElementToUpDown);
  let tableForUD = [...a];

  tableForUD = tableForUD.map((row) => {
    return row.map((el) => (el != "#" ? "." : el));
  });

  data = [...tableForUD, ...data, ...tableForUD];
  for (let i = 0; i < data.length; i++) {
    data[i] = [...data[i]];
  }

  console.log(`The table is expanded in ${num} turn`);
}
//fs.writeFileSync("result" + path, data.map((row) => row.join("")).join("\r"));

//fs.writeFileSync("result" + path, data.map((row) => row.join("")).join("\r"));
