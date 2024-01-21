const fs = require('fs');
const path = require('path');

/* assets */
const assetsSource = path.join(__dirname, 'assets');
const assetsPath = path.join(__dirname, 'project-dist', 'assets');

/* styles */
let stylesData = []
const styleSource = path.join(__dirname, 'styles');
const stylePath = path.join(__dirname, 'project-dist', 'style.css');

/* templates */
const indexSource = path.join(__dirname, 'template.html');
const indexPath = path.join(__dirname, 'project-dist', 'index.html');
const compPath = path.join(__dirname, 'components');


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

      };
      copyStyles();
      copyIndex();
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
          fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
              console.error("Error reading file:", err);
            }
            fs.stat(filePath, (err, stats) => {
              if (err) {
                console.error(err);
              }
              if (stats.isFile() && file.name.includes('.css')) {
                stylesData.push(data);
              };
              if (stylesData.length === files.filter(f => f.isFile() && f.name.includes('.css')).length) {
                fs.writeFile(stylePath, stylesData.join('\n'), 'utf8', (err) => {
                  if (err) {
                    console.error("Error writing file:", err);
                  };
                });
              };
            });
          });
        });
      };
    });
  };

function copyIndex() {
  fs.readFile(indexSource, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
    }
    let filesCount = 0;
    fs.readdir(compPath,
    { withFileTypes: true },
    (err, files) => {
      if (err)
        console.log(err);
      else {
        files.forEach(file => {
          const filePath = path.join(compPath, file.name);
          fs.readFile(filePath, 'utf8', (err, tempData) => {
            if (err) {
              console.error("Error reading file:", err);
            }
            fs.stat(filePath, (err, stats) => {
            if (err) {
              console.error(err);
            }
            if (stats.isFile() && file.name.includes('.html')) {
              let templ = `${file.name.replace('.html', '')}`;
              data = data.replace(`{{${templ}}}`,`${tempData}`);
              filesCount += 1;
            };
            if (filesCount === files.filter(f => f.isFile() && f.name.includes('.html')).length) {
              fs.writeFile(indexPath, data, 'utf8', (err) => {
                if (err) {
                  console.error("Error writing file:", err);
                }
              });
            };
          });
          });
        });
      };
    });
  });
}
