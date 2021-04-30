const router = require('express').Router()
const cloudinary = require('cloudinary')
const auth = require('../authentication/auth')
const authAdmin = require('../authentication/auth-admin')
const fs = require('fs')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

router.post('/upload', auth, authAdmin, (req, res) => {

    try {
        
        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({msg: 'No files were uploaded.'})
        
        const file = req.files.file;

        if(file.size > 1024*1024) {

            removeTemporaryFile(file.tempFilePath)

            return res.status(400).json({msg: "Size too large"})
        }

        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){

            removeTemporaryFile(file.tempFilePath)

            return res.status(400).json({msg: "File format is incorrect."})
        }

        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "e-commerce"}, async(error, result)=> {

            if(error) 
                throw error;

            removeTemporaryFile(file.tempFilePath)

            res.json({public_id: result.public_id, url: result.secure_url})
        })

    } 
    catch (error) {
        return res.status(500).json({msg: error.message})
    }
})

router.post('/delete', auth, authAdmin, (req, res) => {

    try {

        const {public_id} = req.body;

        if(!public_id) 
            return res.status(400).json({msg: 'No images Selected'})

        cloudinary.v2.uploader.destroy(public_id, async(error, result) => {

            if(error) 
                throw error;

            res.json({msg: "Deleted Image"})
        })

    } 
    catch (error) {
        return res.status(500).json({msg: error.message})
    }
    
})

const removeTemporaryFile = (path) => {

    fs.unlink(path, error => {
        
        if(error) 
            throw error;
    })
}

module.exports = router;