const fs = require("fs");
const path = "input.txt";

let data = fs.readFileSync(path, "utf-8");

data = data.split("\r\n").map((row) => row.split(""));

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
     data[i][j]=0;
      break;
    }
  }
}


for(let turn=0;turn<64;turn++){
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (data[i][j] == turn) {
          fourDirection.forEach(dir=>{
            if(data[i+dir[0]][j+dir[1]]!="#"){
                data[i + dir[0]][j + dir[1]]=turn+1;
            }
          })
        }
      }
    }
}

let counter=0;

data.forEach(row=>{
    row.forEach(el=>{
        el==64 && counter++;
    })
})
console.log(counter);
//fs.writeFileSync("result"+path,data.map(row=>row.join("")).join("\r"))
