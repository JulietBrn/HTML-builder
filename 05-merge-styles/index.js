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
        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) {
            console.error("Error reading file:", err);
            return;
          }
          fs.stat(filePath, (err, stats) => {
            if (err) {
              console.error(err);
            }
            if (stats.isFile() && file.name.includes('.css')) {
              arr.push(data);
            };
            if (arr.length === files.filter(f => f.isFile() && f.name.includes('.css')).length) {
              fs.writeFile(folderPath, arr.join('\n'), 'utf8', (err) => {
                if (err) {
                  console.error("Error writing file:", err);
                };
              });
            }
          });
        });
      });
    };
  });
