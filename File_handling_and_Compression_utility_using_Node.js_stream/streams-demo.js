const fs = require("fs");
const zlib = require("zlib");

// 1. Reading a File Without Streams
function readWithoutStream() {
  console.log("\n--- Reading Without Stream ---");

  fs.readFile("sample.txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log("File content (all at once):\n", data);
  });
}

// 2. Reading a File With Streams
function readWithStream() {
  console.log("\n--- Reading With Stream ---");

  const readStream = fs.createReadStream("sample.txt", { encoding: "utf8" });

  readStream.on("data", (chunk) => {
    console.log("Received chunk:", chunk);
  });

  readStream.on("end", () => {
    console.log("Finished reading file in chunks.");
  });

  readStream.on("error", (err) => {
    console.error("Error:", err);
  });
}


// 3. Copy a File Using Pipe (Streams)
function copyFileWithStream() {
  console.log("\n--- Copying File Using Stream ---");

  const readStream = fs.createReadStream("sample.txt");
  const writeStream = fs.createWriteStream("copied-sample.txt");

  // pipe reads and writes automatically
  readStream.pipe(writeStream);

  writeStream.on("finish", () => {
    console.log("File copied successfully -> copied-sample.txt");
  });
}

// 4. Compress a File Using Transform Stream
function compressFile() {
  console.log("\n--- Compressing File ---");

  fs.createReadStream("sample.txt")
    .pipe(zlib.createGzip()) // transform stream
    .pipe(fs.createWriteStream("sample.txt.gz"))
    .on("finish", () => {
      console.log("File compressed successfully -> sample.txt.gz");
    });
}


// RUN DEMOS
readWithoutStream();
setTimeout(readWithStream, 1000); // delay so output is clear
setTimeout(copyFileWithStream, 2000);
setTimeout(compressFile, 3000);
