const express = require('express');
const cors = require('cors');
const path = require('path')
const fs = require('fs');
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads")
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const uploads = multer({ storage })

const app = express();

app.use(cors());

app.get('/', (req, res) => res.json({ msg : 'app running'}));

app.use(express.static('uploads'));

app.get('/api/files', (req, res) => {
    // finds the directory and stores it
    const uploadsDirectory = path.join('uploads');
    // reads the files in the directory
    fs.readdir(uploadsDirectory, (err, files) => {
        if(err){
            return res.json({ msg : err })
        }

        // if there are no files in the directory return a message
        if(files.length === 0){
            return res.json( { msg : 'No files uploaded !'});
        }

        // returns an array of all the filenames in the uploads directory
        return res.json({ files })
    })
});

app.post('/api/files', uploads.single('file'), async (req, res) => {
    const image = req.file.path;
    res.json({ msg : 'file successfully created'})
})

const PORT = 3200;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));