//requiring path and fs modules
const path = require("path");
const fs = require("fs");
//joining path of directory
const dataFilename = "data.json";
const directoryPath = path.join(__dirname, "text");
let data = {};

//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
  //handling error
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }
  //listing all files using forEach
  files.forEach(function (file) {
    // Do whatever you want to do with the file
    const text = fs.readFileSync(`${directoryPath}/${file}`, "utf8");
    const key = file.split(".")[0];
    const array = text
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s);

    console.log(key, array);
    data = { ...data, [key]: array };
  });

  const json = JSON.stringify(data);
  fs.writeFileSync(path.join(__dirname, dataFilename), json);
});
