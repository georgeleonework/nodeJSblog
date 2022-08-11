const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog3.txt', {encoding: 'utf8'});
const writeStream = fs.createWriteStream('./docs/blog4.txt');

// readStream.on('data', (chunk) => {
//     console.log('----- NEW CHUNK -----');
//     console.log(chunk);
//     writeStream('\nNEWCHUNK\n');
//     writeStream.write(chunk);

// });

//piping
readStream.pipe(writeStream);

//taking whatever we're reading and then piping and writing it into it's own new file 