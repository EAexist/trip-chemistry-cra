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
                .resize(width, height, { fit: "inside" }) // width, height
                .toFile(`${path}/${file.split('.')[0]}${suffix}.${file.split('.')[1]}.`);
        }
    });
}

// const rename = ( path ) => {
//     fs.readdirSync(path).forEach(file => {
//         if( file.includes("-medium")) {
//             console.log(file);
//             fs.rename( file, file.replace("-medium", "" ))
//         }
//     });
// }

resize( 'icon', 256, 256, '-medium' );
// resize( 'icon', 512, 512, '-large' );

// resize( 'logos', 256, 256, '-small' );
// resize( 'test/schedule', 128, 128, '-medium' );
// resize( 'logos', 512, 512, '-medium' );

// resize( 'test', 480, 480, '-medium' );