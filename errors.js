// const ErrorHandler = require('../utils/errorHandler')

const ErrorHandler = require("../utils/errorhandler")

module.exports=(err,req,res,next)=>{
    err.statusCode = err.statusCode || 500

   if(process.env.NODE_ENV === 'DEVELOPMENT'){
    res.status(err.statusCode).json({
        success:false,
        error:err,
        errMessage:err.message,
        stack:err.stack
    })
   }

   if(process.env.NODE_ENV === 'PRODUCTION'){
    let error = {...err}
    error.message = err.message 

    //wrong mongoose object ID Error
    if(err.name === 'CastError'){
        const message = `Resource not found.Invalid: ${err.path}`
        error = new ErrorHandler(message,400)
    }

    //Handling Mongoose validation Error

    if(err.name === 'validationError'){
        const message = Object.values(err.values).map(value=>value.message)
        error = new ErrorHandler(message,400)
    }

    res.status(error.statusCode).json({
        success:false,
        message:error.message || 'internal server error'
    })
   }
   
}


// import ErrorHandler from "../utils/errorHandler.js";

// const errorMiddleware = (err, req, res, next) => {
//   err.statusCode = err.statusCode || 500;

//   if (process.env.NODE_ENV === "DEVELOPMENT") {
//     return res.status(err.statusCode).json({
//       success: false,
//       error: err,
//       errMessage: err.message,
//       stack: err.stack,
//     });
//   }

//   if (process.env.NODE_ENV === "PRODUCTION") {
//     let error = { ...err };
//     error.message = err.message;

//     // Handle Mongoose invalid ObjectId error
//     if (err.name === "CastError") {
//       const message = `Resource not found. Invalid: ${err.path}`;
//       error = new ErrorHandler(message, 400);
//     }

//     // Handle Mongoose validation error
//     if (err.name === "ValidationError") {
//       const message = Object.values(err.errors)
//         .map((value) => value.message)
//         .join(", ");
//       error = new ErrorHandler(message, 400);
//     }

//     res.status(error.statusCode || 500).json({
//       success: false,
//       message: error.message || "Internal Server Error",
//     });
//   }
// };

// export default errorMiddleware;
