const ImageKit =  require('@imagekit/nodejs')
const { toFile } = require("@imagekit/nodejs")
const client = new ImageKit({
    privateKey:process.env.IMAGE_KIT
})
async function createPostController(req,res) {
    console.log(req.body)
    console.log(req.file)

    const file = await client.files.upload({
        file:await toFile(Buffer.from(req.file.buffer),'file'),
        fileName:"Test"
    })
    res.send(file)
}

module.exports = {createPostController}