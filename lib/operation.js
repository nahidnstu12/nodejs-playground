//Data Library functions for CRUD

//dependency
const fs = require("fs");
const path = require("path");

// scafold
const lib = {};

// base directory
lib.basedir = path.join(__dirname + "/../.data/");

// write data file
lib.write = (dir, filename, data, callback) => {
  fs.open(
    `${lib.basedir}/${dir}/${filename}.json`,
    "wx",
    (err, fileDescriptor) => {
        if(!err && fileDescriptor){
            const stringData = JSON.stringify(data)
            fs.writeFile(fileDescriptor, stringData, (err2)=>{
                if(!err2){
                    fs.close(fileDescriptor,err3 => {
                        if(!err3){
                            callback(false)
                        }else{
                            callback("Error! Cloasing new file")
                        }
                    })
                }else{
                    callback("Error! writing new file")
                }
            })
        }else{
            callback("There is an error! Maybe file already exists")
        }
    }
  );
};


module.exports = lib