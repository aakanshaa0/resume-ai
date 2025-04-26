const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const pdfRoutes = require('./routes/pdfRoutes');

const app = express()

//Middlewares
app.use(helmet());
app.use(express.json({limit: "10mb"}))
app.use(express.urlencoded({extended: true, limit: "10mb"}))

//Cors
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
)


//Routes
app.use("api/v1/pdf", pdfRoutes);

//Handling 404 Error
app.all("*", (req, res) => {
    res.status(404).json({
        message: `Can't find ${req.originalUrl} on this server.`
    })
    
})

module.exports = app;