const exec = require("child_process").exec;

args = process.argv.slice(2);
fileName = args[0];
csvName = args[1];

console.log("Running migrations");
console.log(fileName)
console.log(csvName)

exec(`python3 downloadDataset.py ${fileName} ${csvName}`, (error, stdout, stderr) => {
  if (!error) {
    child = exec("npm run readCsv");
    child.stdout.pipe(process.stdout);
    child.on("exit", () => {
      process.exit();
    });
  } else {
    console.log(error);
  }
});
