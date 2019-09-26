const express = require('express');
const multer = require('multer');
const cors = require('cors');
const upload = multer({ dest: 'uploads' })
const https = require('https')
const fs = require('fs')

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
        if(error){
            console.log(error)
        }
    })
})

const key = fs.readFileSync('/usr/local/nginx/conf/2_shenfeng1945.cn.key','utf8');
var cert = fs.readFileSync('/usr/local/nginx/conf/1_shenfeng1945.cn_bundle.crt','utf8');
var options = {
    key: key,
    cert: cert
};

https.createServer(options, app).listen( process.env.PORT || 3000 ,function(){
    console.log('APP listening on port' + ' ' + (process.env.PORT || 3000))
})
