const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');


fs.readdir(folderPath,
  { withFileTypes: true },
  (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        const filePath = path.join(folderPath, file.name);
        fs.stat(filePath, (err, stats) => {
          if (err) {
            console.error(err);
            return;
          }
          if (stats.isFile()) {
            console.log(`${file.name.split('.').join(' - ')} - ${stats.size}b`);
          };
        });
      });
    };
  });
