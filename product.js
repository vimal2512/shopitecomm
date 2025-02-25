const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter product name"],
        trim:true,
        maxLength:[100,"product name cannot exceed 100 characters"]
    },
    price:{
        type:Number,
        required:[true,"please enter product price"],
        maxLength:[5,"product name cannot exceed 5 characters"],
        default:0.0
    },
    description:{
        type:String,
        required:[true,"please enter product description"],
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,'please select category for this product'],
        enum:{
            values:[
                'Electronics',
                'Camera',
                'Laptop',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message:"please select correct category for products"
        }
    },
    seller:{
        type:String,
        required:[true,'please enter product seller']
    },
    stock:{
        type:Number,
        required:[true,"please enter product stock"],
        maxLength:[5,'product name cannot exceed 5 characters'],
        default:0
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Product',productSchema)