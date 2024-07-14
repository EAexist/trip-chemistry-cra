// import sharp from 'sharp';
// import fs from 'fs';

const sharp = require("sharp");
const fs = require("fs");

const resize = ( directory, width, height, suffix, name ) => {
    const path = `./public/images/${directory}`
    fs.readdirSync(path).forEach(file => {
        if(( !file.includes("medium")) && ( !file.includes("large") ) && ( !file.includes("small") ) ){
            console.log(file);
            sharp(`${path}/${file}`)
                .resize(width, height, { fit: "inside" }) // width, height
                .toFile(`${path}/${file.split('.')[0]}${suffix}.${file.split('.')[1]}.`);
        }
    });
    // fs.readdirSync(path).forEach(file => {
    //     if(( file.includes("medium")) ){
    //         console.log(file);
    //         sharp(`${path}/${file}`)
    //             .resize(width, height, { fit: "inside" }) // width, height
    //             .toFile(`${path}/${file.split('.')[0].split('-medium')[0]}${suffix}.${file.split('.')[1]}.`);
    //     }
    // });
}

// const rename = ( path ) => {
//     fs.readdirSync(path).forEach(file => {
//         if( file.includes("-medium")) {
//             console.log(file);
//             fs.rename( file, file.replace("-medium", "" ))
//         }
//     });
// }

// resize( 'icon', 20, 20, '-small' );
// resize( 'icon', 256, 256, '-medium');
resize( 'animated-icons', 512, 512, '-large');
// resize( 'icon', 512, 512, '-large', 'app' );

// resize( 'logos', 256, 256, '-small' );
// resize( 'logos', 512, 512, '-medium' );
// resize( 'logos', 512, 512, '-medium' );

// resize( 'test/schedule', 512, 512, '-medium' );

// resize( 'city', 512, 512, '-small' );