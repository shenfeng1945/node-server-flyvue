const express = require('express');
const multer = require('multer');
const cors = require('cors');
const upload = multer({ dest: 'uploads' })

const app = express();

app.get('/', (req,res) =>{
    res.send('hello world')
})
app.options('/upload',cors());
app.post('/upload', cors(), upload.single('avatar'), (req, res) => {
    res.json({key: req.file.filename})
})

app.get('/preview/:key', cors(), (req, res) => {
    let { key } = req.params;
    res.sendFile(`uploads/${key}`,{
        root: __dirname,
        headers: {
            'Content-Type': 'image/jepg'
        }
    },(error) => {
        console.log(error)
    })
})

app.listen( process.env.PORT || 3000 ,function(){
    console.log('APP listening on port' + ' ' + (process.env.PORT || 3000))
})
