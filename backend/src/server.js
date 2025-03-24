require('dotenv').config();
const express = require("express");
const cors = require("cors");
const router = require('./routes');

const app = express();


app.use(cors({
  origin : 'http://localhost:5173',
  credentials : true,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders : "Content-Type,Authorization"
}));
app.use(express.json());
const PORT = process.env.PORT || 3000; 


app.use('/api/v1',router);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  });

app.listen(PORT, ()=>{
    console.log(`sever is running on http://localhost:${PORT}`);
})
