const bcrypt=require("bcryptjs")
const users = []

module.exports = {
    login: (req, res) => {
      let {username,password}=req.body
      let checkUser = users.filter((user)=>user.username===username)
      if(checkUser.length!==0){
          let validPassword=bcrypt.compareSync(password,checkUser[0].hashedPass)
          let newObj={
            username:checkUser[0].username
          }
          if(validPassword){
              return res.status(200).send(newObj)
              
          }else{
              return res.status(401).send("Password incorrect")
          }
      }else{
          return res.status(401).send("No user found by that name.")
      }
    },
    register: (req, res) => {
      let {username,password}=req.body
      let salt=bcrypt.genSaltSync(10)
      let hashedPass=bcrypt.hashSync(password,salt)
         console.log(hashedPass)
         let newUser = {
          username:username,
          hashedPass:hashedPass
         }
        users.push(newUser)
        res.status(200).send(newUser)
    }
}