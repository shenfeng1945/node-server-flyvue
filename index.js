const express = require('express');
const multer = require('multer');
const cors = require('cors');
const upload = multer({ dest: 'uploads' })

const app = express();

app.options('/upload',cors());
app.post('/upload', cors(), upload.single('avatar'), (req, res, next) => {
    res.json({key: req.file.filename})
})

app.get('/preview/:key', cors(), (req, res, next) => {
    let { key } = req.params;
    res.sendFile(`uploads/${key}`,{
        root: __dirname,
        headers: {
            'Content-Type': 'image/jepg'
        }
    },(error) => {
        res.status(404).send('Not Found')
    })
})

app.listen( process.env.PORT || 3000 ,function(){
    console.log('APP listening on port' + ' ' + process.env.PORT || 3000)
})