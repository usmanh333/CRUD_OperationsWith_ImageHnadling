let mongoose = require('mongoose')
mongoose.set('strictQuery', false)
let color = require('colors')

try {
    mongoose.connect('mongodb://127.0.0.1:27017/Posts', ()=>{
    console.log("DB connection established".bgYellow)
})
} catch (error) {
    console.log("DB connection error", error)
}