const fs=require('fs').promises;
const path = require("path");
const paths = {
    dataFile: path.join(__dirname, "..", "data", "files.json"),
    uploads: path.join(__dirname, "..", "uploads")
};
module.exports=paths;
async function readFiles() {
    const val= await fs.readFile(paths.dataFile,'utf8');
    return JSON.parse(val);
}
async function writeFiles(files) {
    await fs.writeFile(
        paths.dataFile,
        JSON.stringify(files, null, 4)
    );
}
module.exports={
    readFiles,
    writeFiles
};