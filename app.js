const express = require('express');
const app = express();
const db = require('./models');
const CORS = require('cors');
const bcrypt = require('bcrypt');
const { where } = require('sequelize');
const multer = require('multer');
const path = require('path');

app.use( express.static(path.join(__dirname,'uploads')))
app.use("/uploads", express.static(path.join(__dirname,'uploads')))

// app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.json());

// const upload = multer({dest:'uploads/'})


app.use(CORS({
  origin: '*',
  optionsSuccessStatus: 200 
}))
// Define routes
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });


// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage });


app.post('/upload' , upload.single('img'), (req,res)=>{
  try{
    res.send("hello")
    console.log(req.body,"---------------")
    console.log(req.file)
  }catch(err){
    console.log(err)
  }
})



// Create user
// app.post('/users', async (req, res) => {
//   try {
//     const { firstName, lastName, email, password, dob, gender, contact } = req.body;

//     if (!firstName || !lastName || !email || !password || !dob || !gender || !contact) {
//       return res.status(400).json({ message: 'Please provide all required fields' });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await db.UserTest.create({ firstName, lastName, email, password: hashedPassword, dob, gender, contact });

//     res.status(201).json(user);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });


// app.post('/users', upload.single('img'), async (req, res) => {
//   try {
//       const { firstName, lastName, email, password, dob, gender, contact } = req.body;
//     console.log(req.body, req.file,"dkjsdklfjkldj")
//       // Validate the input
//       if (!firstName || !lastName || !email || !password || !dob || !gender || !contact) {
//           return res.status(400).json({ message: 'Please provide all required fields' });
//       }

//       const hashedPassword = await bcrypt.hash(password, 10);
//       // const imgPath = req.file ? req.file.path : null; // Get the image path
//       // console.log(imgPath)
//       const user = await db.UserTest.create({ 
//           firstName, 
//           lastName, 
//           email, 
//           password: hashedPassword, 
//           dob, 
//           gender, 
//           contact,
//           // img: imgPath // Save image path in the database
//       });

//       res.status(201).json(user);
//   } catch (err) {
//       res.status(500).json({ message: err.message });
//   }
// });



app.post('/users', upload.single('img'), async (req, res) => {
  try {
      const { firstName, lastName, email, password, dob, gender, contact } = req.body;

      // Validate the input
      if (!firstName || !lastName || !email || !password || !dob || !gender || !contact) {
          return res.status(400).json({ message: 'Please provide all required fields' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const imgPath = req.file ? req.file.path : null; // Get the image path

      const user = await db.UserTest.create({ 
          firstName, 
          lastName, 
          email, 
          password: hashedPassword, 
          dob, 
          gender, 
          contact,
          img: imgPath // Save image path in the database
      });

      res.status(201).json(user);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});




// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await db.UserTest.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await db.UserTest.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update user
app.put('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await db.UserTest.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { firstName, lastName, email, password, dob, gender, contact } = req.body;

    hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await user.update({ firstName, lastName, email, password: hashedPassword, dob, gender, contact });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// login user

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await db.UserTest.findOne({ where: { email: email } })
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    } else {
      res.status(200).json({ message: 'Login successful'});

    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

// Delete user
// app.delete('/users/:id', async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const user = await db.UserTest.findByPk(userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     await user.destroy();
//     res.json({ message: 'User deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
