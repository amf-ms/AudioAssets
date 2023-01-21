const fs = require("fs");
const path = require("path");

const folderPath = "./cc-music";
const jsonFilePath = "./cc-music-playlist.json";

const readDirRecursive = (folder) => {
  const key = path.basename(folder)
  let results = {}
  results[key] = {}
  const files = fs.readdirSync(folder);

  files.forEach((file) => {
    const filePath = path.join(folder, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results[key] = readDirRecursive(filePath);
    } else {
      if (path.extname(file) === ".json") {
        results[key][(path.parse(file).name)] = JSON.parse(fs.readFileSync(filePath, 'ascii'));
      }
    }
  });

  return results;
};

const folderContents = readDirRecursive(folderPath);

fs.writeFileSync(jsonFilePath, JSON.stringify(folderContents, null, 4) + `\n`);
console.log(`Wrote folder contents to ${jsonFilePath}`);
