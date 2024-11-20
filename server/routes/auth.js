const router = require("express").Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const multer = require("multer")

const User = require("../models/User")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/")
    }, 

    filename: function (req, file, cb) {
        cb(null, file.originalname) 
    }
})

const upload = multer({storage})

/* User register */

router.post("/register", upload.single('profileImage'), async (req, res) => {
    try{
      
      const { firstName, lastName, email, passWord} = req.body
      const profileImage = req.file

      if (!profileImage) {
        return res.status(400).send("No file uploaded")
      }

/* path to upload profile photo */
      const profileImagePath = profileImage.path

      /* CHeck if user exists */

      const existingUser = await User.findOne({email})
      if (existingUser) {
         return res.status(409).json({message: "user already exists!"})

      }

      /* HAsh the password */

      const salt = await bcrypt.genSalt()
      const hashedPassword = await bcrypt.hash(passWord, salt)


      /* create a new usesr */

      const newUser  = new User ({
        firstName,
        lastName,
        email,
        passWord: hashedPassword,
        profileImagePath
        
    })

    /* Save the new User */

    await newUser.save()

    /* Send a message */
    res.status(200).json({message: "User registered successfully!, user: newUser"})

    } catch(err) {
        console.log(err)
        res.status(400).json({message: "Registration failed!", error: err.message});
        
    }
})


module.exports = router