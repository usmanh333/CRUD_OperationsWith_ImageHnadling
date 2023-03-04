let express = require('express');
let app = express();
var cors = require('cors');
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded(
  { extended:true }
))
app.use(bodyParser.json());
app.use(express.json())
require('./database/config')
const Cards = require('./model/Cards')
let color = require('colors');
require('dotenv').config(); //To Create Environment variable
const PORT = process.env.PORT || 5000

const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const imageName = `${uuidv4()}.${file.originalname.split('.').pop()}`;
    cb(null, imageName);
  }
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB file size limit
  }
});


// getting data by filename
app.get('/cardsdata/uploads/:imageName', (req, res) => {
  const { imageName } = req.params;
  const imagePath = `uploads/${imageName}`;
  res.sendFile(imagePath, { root: __dirname });
});

//   -------------------------------------------------------------------------------------


// getting all cards posts
app.get('/cardsdata', async(req, res) =>{
    const allCards = await Cards.find()
    res.json(allCards)
})


// posting cards 
app.post('/cards', upload.single('upload'), async (req, res) => {
  const { title, desc } = req.body;
  // checking file
  if (!req.file) {
    res.status(400).json({ msg: "BAD REQUEST" });
    return;
  }
  const cards = new Cards({
    title: title,
    desc: desc,
    image: req.file.filename,
  });
  try {
    await cards.save();
    res.json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
  }
});


// getting cards post by a ID
app.get('/cardsdata/:id', async (req, res)=>{
    const postById = await Cards.findById(req.params.id)
    res.json(postById)
})


//  Updating cards data
app.put('/cardsdata/:id', upload.single('image'), async (req, res) => {
  try {
    // Get the card by ID
    const card = await Cards.findById(req.params.id);

    // Update the card data
    card.title = req.body.title;
    card.desc = req.body.desc;
    card.image = req.file.filename; // Use the filename of the uploaded file

    // Save the updated card
    await card.save();

    // Send the updated card object back to the client
    res.status(200).json(card);
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Delete card post by ID
app.delete('/cardsdata/:id', async(req, res) => {
    const removeCard = await Cards.deleteOne({_id : req.params.id}) // remove is deprecated now we are using deleteone
    res.send(removeCard)
})

// Server is running
try {
    app.listen(PORT, ()=>{
        console.log(`The Server is listening on port : ${process.env.PORT} and mode is ${process.env.MODE}`.bgMagenta)
    })
} catch (error) {
    console.log("The server is not listening on port", error)
}
