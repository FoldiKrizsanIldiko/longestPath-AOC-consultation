const fs = require("fs");

const path = "test.txt";
let data = fs.readFileSync(path, "utf-8");

data = data.split("\r\n").map((row) => row.split(""));

//console.log(data);

const start = [0, data[0].indexOf(".")];
const end = [data.length - 1, data[data.length - 1].indexOf(".")];

findShortestPath(data, start, end);

function findShortestPath(matrix, start, end) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let visited = Array.from({ length: rows }, () =>
    Array(cols).fill({ d: 0, path: 0, s: [], cf:[] })
  );
  //visited = visited.map((row,i)=>row.map((el,j)=>matrix[i][j]=="#"?"#":el));

  visited[start[0]][start[1]] = { d: 0, path: 1, s: [1],cf:[0] };
  const queue = [{ position: start, distance: 0, path: 1, s: [1],cf:[1] }];

 // for (let i = 0; i < 20; i++) {
    while (queue.length > 0) {
    let { position, distance, path, s,cf} = queue.shift();
    // Szomszédokhoz való lépés

    let neighbors = [
      [position[0] - 1, position[1]],
      [position[0] + 1, position[1]],
      [position[0], position[1] - 1],
      [position[0], position[1] + 1],
    ];

neighbors= neighbors.filter(el=>{
    let [row,col]=el;
    return (
      row >= 0 &&
      row < rows &&
      col >= 0 &&
      col < cols &&
     // !visited[row][col].s.includes(path) && //ez valyon akkor is jó, ha nem true van ráírva
      matrix[row][col] != "#" &&
      visited[row][col].d < distance + 1 &&
      cf.every((el) => !visited[row][col].s.includes(el))
    );
})
    let add = 0;
 neighbors.length>1 && (add=1);
    for (const neighbor of neighbors) {
      const [row, col] = neighbor;
    //   if (
    //     row >= 0 &&
    //     row < rows &&
    //     col >= 0 &&
    //     col < cols &&
    //     !visited[row][col].s.includes(path) && //ez valyon akkor is jó, ha nem true van ráírva
    //     matrix[row][col] != "#" &&
    //     visited[row][col].d < distance + 1 &&
    //     cf.every((el) => !visited[row][col].s.includes(el))
    //   ) {
        visited[row][col] = {
          d: distance + 1,
          path: path + add,
          s: [...visited[row][col].s, path + add],
          cf: cf.includes(path + add) ? cf : [...cf, path + add],
        }; 
        queue.push({
          position: [row, col],
          distance: distance + 1,
          path: path + add,
          s: [...visited[row][col].s, path + add],
          cf: cf.includes(path + add) ? cf : [...cf, path + add],
        });
        add++;
    //  }
    }
  }
  fs.writeFileSync(
    "visited" + path,
    visited
      .map((row) => row.map((el) => `d:${el.d} p:${el.path} s:${el.s} cf:${el.cf}  `).join("\t"))
      .join("\r")
  );
  console.log(
    `The longest path from start to stop id ${
      visited[end[0]][end[1]].d
    } steps far`
  );
  return visited;
}
