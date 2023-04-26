require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');


/**DB connection config */
// mongoose.connect('mongodb://localhost/keka');
// const db = mongoose.connection;
// db.on('error', (error) => {
//     console.error(`Db connection Error: ${error}`);
// });
// db.once('open', () => {
//     console.log(`Db connection Sucessful`);
// });



// Connect to the database
// construct the database URI and encode username and password.
//const dbURI = `mongodb://${process.env.DB_LOCALHOST}:${process.env.DB_LOCALHOST_PORT}`; // local
const dbURIAtlas = "mongodb+srv://mongoLiveDb:<password>@cluster01.hawhw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


const dbOptions = {
    user: encodeURIComponent(process.env.DB_ATLAS_USERNAME),
    pass: encodeURIComponent(process.env.DB_ATLAS_PASSWORD),
    dbName: process.env.DB_DATABASE_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(dbURIAtlas, dbOptions)
    .catch((err) => {
        console.log(err.message);
    });

// Throw an error if the connection fails
mongoose.connection.on('error', (err) => {
    console.log(`DB Connection Eror: ${err.message}`);
});

mongoose.connection.once("open", function () {
    console.log("DB Connected successfully");
});
/**DB connection config end*/


app.use(express.json());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

/**Router config */
const router = require('./routes/');
app.use('/v1', router);
/**Router config end*/

app.listen(parseInt(process.env.PORT), () => {
    console.log(`Server started on port ${process.env.PORT}`)
});