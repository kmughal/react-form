const fs = require("fs");
const path = require("path");

const sourceFolder = path.resolve("./dist");
const destinationFolder = path.resolve("./public/dist");

copy(sourceFolder, destinationFolder);

function copy(thingsToCopyPath, destinationFolder) {
  const pathIsDirectory = isDirectory(thingsToCopyPath);
  if (pathIsDirectory) {
    const allStuff = fs.readdirSync(thingsToCopyPath, { encoding: "utf-8" });
    for (let a of allStuff) {
      if (a.startsWith(".git") || a.includes("node_modules")) {
        continue;
      }
      let fullPath = path.resolve(thingsToCopyPath, a);
      let destinationPath = path.resolve(destinationFolder, a);
      if (isDirectory(fullPath)) {
        if (!fs.existsSync(destinationPath))
          fs.mkdirSync(destinationPath, { recursive: true });
        copy(fullPath, destinationPath);
      } else fs.copyFileSync(fullPath, destinationPath);
    }
  }
}

function isDirectory(thingsToCopyPath) {
  return fs.statSync(thingsToCopyPath).isDirectory();
}
