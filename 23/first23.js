const fs=require('fs');

const path="test.txt";
let data = fs.readFileSync(path, 'utf-8');

data=data.split("\r\n").map(row=>row.split(""));

//console.log(data);

const start=[0,data[0].indexOf(".")];
const end = [data.length - 1, data[data.length - 1].indexOf(".")];

findShortestPath(data, start, end);


function findShortestPath(matrix, start, end) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let visited = Array.from({ length: rows }, () =>
    Array(cols).fill({ d: 0, path: 0 })
  );
  //visited = visited.map((row,i)=>row.map((el,j)=>matrix[i][j]=="#"?"#":el));

  visited[start[0]][start[1]] = { d: 0, path: 1 };
  const queue = [{ position: start, distance: 0, path:1 }];

 // for(let i=0;i<200;i++){
  while (queue.length > 0) {
    let { position, distance,path } = queue.shift();
    // Szomszédokhoz való lépés

    let neighbors = [
      [position[0] - 1, position[1]],
      [position[0] + 1, position[1]],
      [position[0], position[1] - 1],
      [position[0], position[1] + 1],
    ];

    matrix[position[0]][position[1]] == "<" && (neighbors =[neighbors[2]] );
    matrix[position[0]][position[1]] == ">" && (neighbors =[neighbors[3]] );
    matrix[position[0]][position[1]] == "^" && (neighbors = [neighbors[0]]);
    matrix[position[0]][position[1]] == "v" && (neighbors =[neighbors[1]] );
let add=0;
    for (const neighbor of neighbors) {
        
      const [row, col] = neighbor;
      if (
        row >= 0 &&
        row < rows &&
        col >= 0 &&
        col < cols &&
        visited[row][col].path != path && //ez valyon akkor is jó, ha nem true van ráírva
        matrix[row][col] != "#" &&
        visited[row][col].d<distance+1
      ) {
        // console.log(
        //   `visited ${visited[row][col].path}  my path: ${path + add}`
        // );
        visited[row][col] = { d: distance + 1, path: path + add }; //nem true kell legyen, hanem valamilyen jelzés, hogy hanyadik útvonalon vagyok
        // fs.writeFileSync(
        //   "visited.txt",
        //   visited.map((row) => row.join("\t")).join("\r")
        // );
        queue.push({
          position: [row, col],
          distance: distance + 1,
          path: path + add,
        });
        add++;
      }
     
    }
  }
  fs.writeFileSync(
    "visited"+path,
    visited.map((row) => row.map(el=>JSON.stringify(el)).join("\t")).join("\r")
  );
  console.log(`The longest path from start to stop id ${visited[end[0]][end[1]].d} steps far`)
  return visited;
}