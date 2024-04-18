// import sharp from 'sharp';
// import fs from 'fs';

const sharp = require("sharp");
const fs = require("fs");

const resize = ( directory, width, height, suffix ) => {
    const path = `./public/images/${directory}`
    fs.readdirSync(path).forEach(file => {
        if(( !file.includes("medium")) && ( !file.includes("large") ) && ( !file.includes("small") ) ){
            console.log(file);
            sharp(`${path}/${file}`)
                .resize(width, height, { fit: "outside" }) // width, height
                .toFile(`${path}/${file.split('.')[0]}${suffix}.${file.split('.')[1]}.`);
        }
    });
}

// resize( 'icon', 256, 256, '-small' );
// resize( 'icon', 512, 512, '-large' );

// resize( 'logos', 256, 256, '-small' );
// resize( 'info', 128, 128, '-small' );
resize( 'info', 384, 384, '-xlarge' );

// resize( 'test', 480, 480, '-medium' );