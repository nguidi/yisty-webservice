async function streamToString(stream) {
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks)));
    });
}

async function doScan(worker, image) {
    try {
        const { data: { text } } = await worker.recognize(image);
        return text;
    } catch (e) {
        console.log(e);
    }
}

module.exports = (app) => {
    return async(req, res) => {
        let scannedText = "";
        const worker = app.get('TesseractWorker');

        try {
            scannedText = await streamToString(req).then(image => {
                return doScan(worker, image);
            });
            res.writeHead(200, { "Content-Type": "text/plain" }).end(scannedText);
        } catch (e) {
            console.log(e);
        }
    };
};
