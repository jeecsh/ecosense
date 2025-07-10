import express from 'express';
import readingRoute from './routes/readings'

const app= express();
const port = 5000;

// middleware to parses json 
app.use(express.json());

// routes 
    app.get ('/', (req , res )=>{
        res.send('hello world');
    })
app.use('/readings',readingRoute);

// start the server 
app.listen (port, ()=>
console.log("lestinig on port 5000")
);