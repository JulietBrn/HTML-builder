const fs = require('fs');
const path = require('path');

const fromPath = path.join(__dirname, 'files');
const toPath = path.join(__dirname, 'files-copy');

fs.access(toPath, fs.constants.F_OK, (err) => {
  if (!err) {
    fs.rm(toPath, { recursive: true}, err => {
      if (err) {
        console.log(err);
      } else {
        copyFiles();
      }
    });
  } else {
    copyFiles();
  }
});

function copyFiles() {
  fs.mkdir(toPath,
    { recursive: true },
    (err) => {
      if (err) {
        return console.error(err);
      }
    })
    fs.readdir(fromPath,
      { withFileTypes: true },
      (err, files) => {
        if (err)
          console.log(err);
        else {
          files.forEach(file => {
            const fileFrom = path.join(fromPath, file.name);
            const fileTo = path.join(toPath, file.name);
            fs.copyFile(fileFrom, fileTo, (err) => {
              if (err) {
                console.log("Error Found:", err);
              }
          })
          });
        };
      });
}