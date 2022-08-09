const express = require('express');
const markersAndOptions = require('../models/markersAndOptions');
const multer = require("multer")
const path = require('path');

const router = express.Router()

const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, path.join(__dirname, '../options/'));
      },
      filename(req, file, cb) {
        cb(null, file.originalname);
      }
    }),
    limits: {
      fileSize: 100000000 // max file size 1MB = 1000000 bytes
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
        return cb(
          new Error(
            'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
          )
        );
      }
      cb(undefined, true); // continue with upload
    }
  });

// Get all posts
router.get("/options", async (req, res) => {
	const content = await markersAndOptions.find()
	res.send(content)
})

router.post(
    '/options',
    upload.single('file'),
    async (req, res) => {
      try {
        const { optionName, description, isMarker } = req.body;
        const { path } = req.file;
        const markersAndOptionz = new markersAndOptions({
          optionName,
          description,
          file_path : path,
          isMarker
        });
        await markersAndOptionz.save();
        res.send('file uploaded successfully');
      } catch (error) {
        res.status(400).send('Error while uploading file. Try again later.');
      }
    },
    (error, req, res, next) => {
      if (error) {
        res.status(500).send(error.message);
      }
    }
  );
  

module.exports = router