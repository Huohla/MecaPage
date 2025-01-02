
const {promises: fsPromises} = require('fs');

// * ✅ read file ASYNCHRONOUSLY
async function asyncReadFile(filename) {
  try {
    const contents = await fsPromises.readFile(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    console.log(arr);

    return arr;
  } catch (err) {
    console.log(err);
  }
}

asyncReadFile('words.txt').then((words)=>{
	console.log(words)
	asyncArrayToFile("wordsArray.txt",words);
})

async function asyncArrayToFile(filename,content) {
  try {
		console.log(typeof content)
		stringContent = "["+content.map(word => "'"+word+"'")+"]";
    await fsPromises.writeFile(filename, stringContent, 'utf-8');
		console.log("Generated file")
    return arr;
  } catch (err) {
    console.log(err);
  }
}
