const fs = require('fs');
const path = require('path');
const readline = require('readline');

const greeting = 'Hi, please enter some text: ';
const buy = 'Bye-bye! You are awesome!';

const filePath = path.join(__dirname, 'text.txt');
let writtenStream = fs.createWriteStream(filePath, { flags: 'a' });
const readStream = fs.createReadStream(filePath);

let rl = readline.createInterface(process.stdin, process.stdout);

console.log(greeting);
function askForInput() {
  rl.question('', (answer) => {
    if (answer === 'exit') {
      console.log(buy);
      rl.close();
      process.exit();
    }
    writtenStream.write(`${answer} `);
    askForInput();
  });
}

askForInput();

rl.on('SIGINT', () => {
  console.log(buy);
  rl.close();
  process.exit();
});