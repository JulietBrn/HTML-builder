const fs = require('fs');
const path = require('path');

const folderSource = path.join(__dirname, 'styles');
const folderPath = path.join(__dirname, 'project-dist', 'bundle.css');

let arr = []

fs.readdir(folderSource,
  { withFileTypes: true },
  (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        const filePath = path.join(folderSource, file.name);
        const stats = fs.statSync(filePath);
        if (stats.isFile() && file.name.includes('.css')) {
          const content = fs.readFileSync(filePath, 'utf-8');
          arr.push(content);
        };
      });
      fs.writeFile(folderPath, arr.join('\n'), (error) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Data written to file');
        }
      });
    };
  });