const mongoose = require('mongoose')

const connectDatabase = ()=>{
  mongoose.connect(process.env.DB_LOCAL_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
  }).then(con=>{
    console.log(`MongoDB Database Connected with Host:${con.connection.host}`)
  })
}

module.exports = connectDatabase