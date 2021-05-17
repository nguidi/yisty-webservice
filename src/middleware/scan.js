//  Expected response:
// [
//   { 'id': 1,
//     'name': 'Azucar',
//     'result': false
//   },
//   { 'id': 2,
//     'name': 'Grasas animales',
//     'result': true
//   },
//   { 'id': 3,
//     'name': 'Colorante',
//     'result': undefined
//   }
// ];

async function streamToString(stream) {
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
}

async function doScan(worker, image) {
    try {
        const { data: { text } } = await worker.recognize(image);
        return splitIngredients(text).join();
    } catch (e) {
        console.log(e);
    }
}

function splitIngredients(ingredients) {
    let separators = ['\\,', '\\;'];
    let regexp = new RegExp(separators.join('|'), 'g');
    let ingredientList = String(ingredients).split(regexp);
    return ingredientList;
}

module.exports = (app) => {
    return async(req, res) => {
        let scannedText = '';
        const worker = app.get('TesseractWorker');

        try {
            scannedText = await streamToString(req).then(image => {
                return doScan(worker, image);
            });
            res.writeHead(200, { 'Content-Type': 'text/plain' }).end(scannedText);
        } catch (e) {
            res.status(500).send('se rompio');
            console.log(e);
        }
    };
};
