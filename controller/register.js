const customError = require('../errors')
const {StatusCodes} = require('http-status-codes')
const fs = require('fs')
const csv = require('csv-parser')
const path = require('path')
const user = require('../model/schema')

const SignUp = async(req,res) =>{
  const {fname,lname,level,matric,semester} = req.body

  if(!fname || !lname || !level || !matric || !semester){
    throw new customError.NotFoundError('User Information not provided')
  }

  const users = await user.create(req.body)

  res.status(StatusCodes.CREATED).json({msg:`Thank you ${fname} your information have been registered`,data:{fname,lname,matric}})


}




const attendance = async(req, res) =>{
 
  if(!req.files){
    throw new customError.BadRequestError('please upload file')
  }

const result = []
const newResult = [];

 
const csvFile = req.files.file

const filePath = path.join(__dirname,'../public/uploads/' + `${csvFile.name}`)

  await csvFile.mv(filePath)

  fs.createReadStream(`${filePath}`)
    .pipe(csv({}))
    
    .on('data',(data) => {
      result.push(data)
      return result;
    })
    .on('end',async() => {

      const users = await user.find().exec();
    

      result.forEach(async(e) => {
        newResult.push({
          fname: e.OtherNames,
          matric: e.UniqueID,
          level: e.Level
        })
      })
      
      const userMatric = [];
      users.forEach((item) =>{
        userMatric.push(item.matric)
      })

      const filteredUser = [];
      newResult.forEach((item)=>{
        if(!userMatric.includes(item.matric)){
          filteredUser.push(item)
        }else{
          return 'Not found'
        }
      })

      res.status(StatusCodes.OK).json({Absentees:filteredUser,nbhits:filteredUser.length})

    })

   
}


module.exports = {SignUp,attendance}