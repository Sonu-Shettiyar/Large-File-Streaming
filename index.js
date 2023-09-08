

const busboy = require('connect-busboy');

const path = require('path');

const fs = require('fs-extra');

const stream = require('stream');

const express = require('express');

const mongoose = require('mongoose');

const mime = require('mime');

require('dotenv').config();

const app = express();



const connection = mongoose.connect(process.env.MongoUrl);



const studentData = mongoose.Schema({

    name: String,

    age: Number,

    imagePath: String,



});



const StudentModel = mongoose.model('students', studentData);



app.use(express.json());



app.use(busboy({

    highWaterMark: 2 * 1024 * 1024 * 1024,

}));



const uploadPath = path.join(__dirname, 'uploads');

fs.ensureDir(uploadPath);



app.post('/upload', (req, res) => {

    req.pipe(req.busboy);



    req.busboy.on('file', async (fieldname, file, filename) => {

        const uploadDir = path.join(uploadPath, filename.filename);



        console.log(`Upload of '${filename.filename}' started`);



        const fstream = fs.createWriteStream(uploadDir);



        file.pipe(fstream);





        fstream.on('close', async () => {

            console.log(`Upload of '${filename.filename}' finished`);









            const student = new StudentModel({

                name: 'jai-veeru',

                imagePath: path.join(uploadPath, `${filename.filename}`),

                age: 70,



            });





            await student.save();



            res.redirect('back');

        });

    });

});



app.get('/', (req, res) => {

    res.writeHead(200, { 'Content-Type': 'text/html' });

    res.write('<form action="upload" method="post" enctype="multipart/form-data">');

    res.write('<input type="file" name="fileToUpload"><br>');

    res.write('<input type="submit">');

    res.write('</form>');

    return res.end();

});







app.get('/download/:id', async (req, res) => {

    const id = req.params.id;



    try {



        const student = await StudentModel.findOne({ '_id': id });



        if (!student) {

            return res.status(404).send('File Not Found');

        }



        const filePath = student.imagePath;





        res.setHeader('Content-Disposition', `attachment; filename="${student.name}${path.extname(filePath)}"`);





        const contentType = mime.getType(filePath) || 'application/octet-stream';

        res.setHeader('Content-Type', contentType);



        const fileStream = fs.createReadStream(filePath);

        fileStream.pipe(res);



        fileStream.on('close', () => {

            console.log(`Download of '${student.name}${path.extname(filePath)}' finished`);

        });

    } catch (error) {

        console.error('Error downloading the file:', error);

        res.status(500).send('Internal Server Error');

    }

});











app.listen(process.env.Port, async () => {

    await connection

    console.log(`Server is running at port ${process.env.Port}`);

});





