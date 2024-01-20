const fs = require('fs');
const path = require('path');

const assetsSource = path.join(__dirname, 'assets');
const assetsPath = path.join(__dirname, 'project-dist', 'assets');

let stylesData = []
const styleSource = path.join(__dirname, 'styles');
const stylePath = path.join(__dirname, 'project-dist', 'style.css');

const indexSource = path.join(__dirname, 'template.html');
const indexPath = path.join(__dirname, 'project-dist', 'index.html');

fs.access(assetsPath, fs.constants.F_OK, (err) => {
  if (!err) {
    fs.rm(assetsPath, { recursive: true}, err => {
      if (err) {
        console.log(err);
      } else {
        // copyStyles()
        copyAssets();
      }
    });
  } else {
    // copyStyles()
    copyAssets();
  }
});

function copyAssets() {
  fs.mkdir(assetsPath,
    { recursive: true },
    (err) => {
      if (err) {
        return console.error(err);
      }
    });
    fs.readdir(assetsSource,
      { withFileTypes: true },
      (err, folders) => {
        if (err)
          console.log(err);
        else {
          folders.forEach(folder => {
            const assetsFolderFrom = path.join(assetsSource, folder.name);
            const assetsFolderTo = path.join(assetsPath, folder.name);
            fs.mkdir(assetsFolderTo, { recursive: true }, (err) => {
              if (err) {
                console.error(err);
              } else {
                fs.readdir(assetsFolderFrom,
                { withFileTypes: true },
                (err, files) => {
                  if (err)
                    console.log(err);
                  else {
                    files.forEach(el => {
                      const fileSource = path.join(assetsFolderFrom, el.name);
                      const filePath = path.join(assetsFolderTo, el.name);
                      fs.copyFile(fileSource, filePath, (err) => {
                            if (err) {
                              console.log("Error Found:", err);
                            }
                        });
                    });
                  };
                });
              }
            });
        });
        console.log('Assets copied successfully.');
        copyStyles();
      };
    });
}

function copyStyles() {
  fs.readdir(styleSource,
    { withFileTypes: true },
    (err, files) => {
      if (err)
        console.log(err);
      else {
        files.forEach(file => {
          const filePath = path.join(styleSource, file.name);
          const stats = fs.statSync(filePath);
          if (stats.isFile() && file.name.includes('.css')) {
            const content = fs.readFileSync(filePath, 'utf-8');
            stylesData.push(content);
          };
        });
        fs.writeFile(stylePath, stylesData.join('\n'), (error) => {
          if (error) {
            console.error(error);
          } else {
            console.log('Styles data written to file');
          }
        });
      };
    });
}
function copyIndex() {
  fs.readdir(indexSource,
    { withFileTypes: true },
    (err, files) => {
      if (err)
        console.log(err);
      else {
        files.forEach(file => {
          const filePath = path.join(indexSource, file.name);
          const stats = fs.statSync(filePath);
          if (stats.isFile() && file.name.includes('.css')) {
            const content = fs.readFileSync(filePath, 'utf-8');
            stylesData.push(content);
          };
        });
        fs.writeFile(stylePath, stylesData.join('\n'), (error) => {
          if (error) {
            console.error(error);
          } else {
            console.log('Styles data written to file');
          }
        });
      };
    });
}