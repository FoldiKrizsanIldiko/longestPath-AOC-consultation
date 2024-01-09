const fs = require("fs");

const path = "input.txt";
let data = fs.readFileSync(path, "utf-8");

data = data.split("\r\n").map((row) => row.split(""));
const start = [0, data[0].indexOf(".")];
const end = [data.length - 1, data[data.length - 1].indexOf(".")];

findShortestPath(data, start, end);

function findShortestPath(matrix, start, end) {
  let results = [];
  const rows = matrix.length;
  const cols = matrix[0].length;
  let Origvisited = Array.from({ length: rows }, () => Array(cols).fill(false));

  Origvisited[start[0]][start[1]] = true;
  //console.log(`Ind table  ${independedTable(Origvisited)}`)
  const queue = [
    { position: start, distance: 0, visited: independedTable(Origvisited) },
  ];

  //  for (let i = 0; i < 20; i++) {
  while (queue.length > 0) {
    let { position, distance, visited } = queue.pop();
    // Szomszédokhoz való lépés
    //console.log(` 34 row ${visited}`);
    let neighbors = [
      [position[0] - 1, position[1]],
      [position[0] + 1, position[1]],
      [position[0], position[1] - 1],
      [position[0], position[1] + 1],
    ];

    neighbors = neighbors.filter((el) => {
      let [row, col] = el;
      return (
        row >= 0 &&
        row < rows &&
        col >= 0 &&
        col < cols &&
        // !visited[row][col].s.includes(path) && //ez valyon akkor is jó, ha nem true van ráírva
        matrix[row][col] != "#" &&
        !visited[row][col]
      );
    });

    for (const neighbor of neighbors) {
      const [row, col] = neighbor;

      visited[row][col] = true;
      queue.push({
        position: [row, col],
        distance: distance + 1,
        visited: independedTable(visited),
      });

      if (row == end[0] && col == end[1]) {
        results.push(distance + 1);
        console.log(distance+1);
        // fs.appendFileSync(
        //   "visited" + path,
        //   visited.map((row) => row.join("\t")).join("\r")
        // );
      }
    }
  }

  console.log(
    `The longest path from start to stop is ${results.reduce((a, v) =>
      a < v ? v : a
    )} steps `
  );
}

function independedTable(table) {
  let newTable = [];
  table.forEach((row) => {
    let newRow = [];
    row.forEach((el) => newRow.push(el));
    newTable.push(newRow);
  });
  return newTable;
}

let a = [
  [true, true],
  [true, true],
];

let b = independedTable(a);
