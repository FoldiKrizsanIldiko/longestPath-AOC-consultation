const fs = require("fs");

let path = "test.txt";
let data = fs.readFileSync(path, "utf-8");

data = data.split("\r\n").map((row) => row.split(""));
//console.log(data);

let shortest = findPath(
  data,
  [0, 0],
  [data.length - 1, data[0].length - 1]
);
console.log(shortest);

findPathmax(data, [0, 0], [data.length - 1, data[0].length - 1]);


function findPath(matrix, start, end) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const queue = [{ position: start, distance: 0, sum: [+matrix[start[0]][start[1]]] , beenAt:[[0,0]] }];

  while (queue.length > 0) {
    let { position, distance ,sum ,beenAt} = queue.shift();
    // Szomszédokhoz való lépés
    // const neighbors = [
    //   [position[0] - 1, position[1]],
    //   [position[0] + 1, position[1]],
    //   [position[0], position[1] - 1],
    //   [position[0], position[1] + 1],
    // ];
    let neighbors=getValidNeighbors(position,beenAt,rows, cols);


    for (const neighbor of neighbors) {
      const [row, col] = neighbor;
      if (
        !visited[row][col]
      ) {
        visited[row][col] = true;
        let dist=distance+1;
        let ss = [...sum, +matrix[row][col]];
        queue.push({
          position: [row, col],
          distance: dist,
          sum: ss,
          beenAt: [...beenAt,[row,col]]
        });
      }
      if (row == end[0] && col == end[1]){
       // console.log(distance+1);
       // console.log(sum.reduce((a,v)=>a+v)+3);
         return sum.reduce((a, v) => a + v) + +matrix[end[0]][end[1]]; //hardcore
      }
    }
  }
  
}

//végig kell mindet számolni és jegyezni az útvonal koordinátáit, így lehet elkerülni az ugyanoda lépést

function findPathmax(matrix, start, end) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let results = [];
  const queue = [
    { position: start, distance: 2, beenAt: [[0, 0]] }, //szerintem jegyezzük meg az eddig bejárt koordinátákat és abból ki tudom szedni ha egymás után 3 van i vagy j akkor fodulni kell
  ];
  //for (let i = 0; i < 30; i++) {
     while (queue.length > 0) {
        queue.sort((a,b)=>a.distance<b.distance?-1:1);
    const { position, distance, beenAt } = queue.pop();
    const neighbors = getValidNeighbors(position, beenAt,rows,cols);
    console.log(
      `pos: ${position} dist: ${distance} been : ${beenAt.join("(")}`
    );
    for (const neighbor of neighbors) {
      const [row, col] = neighbor;
      let addBeenAt = [...beenAt, [row, col]];
     // console.log(shortest);
     // console.log(distance);
if(distance<=shortest){
      queue.push({
        position: [row, col],
        distance: distance + +matrix[row][col],
        beenAt: addBeenAt,
      });}

      if (row == end[0] && col == end[1]) {
        results.push(distance);
        console.log(distance);
      }
    }
  }

  console.log(results);
  

  
}
function getValidNeighbors(position, beenAt,rows, cols) {
  const [row, col] = position;
  const possibleNeighbors = [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
  ];

  let result = possibleNeighbors.filter(
    ([newRow, newCol]) =>
      newRow >= 0 &&
      newRow < rows &&
      newCol >= 0 &&
      newCol < cols &&
      beenAt.every((el) => el.join("") != [newRow, newCol].join("")) && //array != array akkor sem igen :)
      consecutiveMoves([newRow, newCol], beenAt) //ez lesz a harmadik, tehát negyedik nem lehet ide kell egy function ez true kell legyen
  );
//   console.log(
//     `mit is fog jóváhagyni? ebből a poziból: ${position} mehet ide: ${result}`
//   );
  return result;
}

function consecutiveMoves(position, beenAt) {
  if (beenAt.length >= 3) {
    let lastThree = beenAt.slice(-3, beenAt.length); // [0,0],[0,1],[0,2]
    let [first, second, last] = lastThree;
    //console.log(`1: ${first}, 2: ${second} 3: ${last} posit: ${position}`);
    //i növekszik, i csökken
    //j növekszik, j csökken
    if (
      first[0] + 1 == second[0] &&
      second[0] + 1 == last[0] &&
      position[0] == last[0] + 1
    )
      return false; //0+1 ==0
    if (
      first[1] + 1 == second[1] &&
      second[1] + 1 == last[1] &&
      position[1] == last[1] + 1
    )
      return false; // 0+1 == 1 1+1 == 2 3== 2+1
    if (
      first[0] == second[0] - 1 &&
      second[0] == last[0] - 1 &&
      position[0] == last[0] - 1
    )
      return false;
    if (
      first[1] == second[1] - 1 &&
      second[1] == last[1] - 1 &&
      position[1] == last[1] - 1
    )
      return false;
  }
  return true;
}