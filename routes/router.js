const express = require('express')
const router = express.Router()


const {SignUp,attendance} = require('../controller/register')



router.route('/signup').post(SignUp)
router.route('/check').post(attendance)



module.exports = router