const express = require("express");

const app = express();

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();


//connectt to db

mongoose.connect(process.env.DB_CONNECT,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log("connectd to db")
);


//middleware
app.use(express.json());
app.use(cors());

const bookSeats = require("./model/bookSeats");


// this endpoint fetch all the available seats.
app.get("/seats", async (req, resp) => {
    const seats = await bookSeats.find();
    if (seats.length > 0) {
        resp.send(seats);
    } else {
        resp.send({ result: "No Product Found" })
    }
})

// this endpoint updates the array of reserved seats in mongodb db.
app.put("/reserve/:id", async (req, resp) => {

    let interests = await bookSeats.findOne({ _id: req.params.id });
    let arrayData = interests.seatsAvailable;
    //let res = arrayData.splice(req.body.start,req.body.reserve);

    console.log(req.body.start,req.body.reserve)
    let result =  await bookSeats.updateOne(
        { _id: req.params.id },
        {
            $push: {
                reservedSeats:{
                    $each: arrayData.splice(req.body.start,req.body.reserve),
                    $position:-1
                }
            }
        },


    )

    resp.send(result);

    
})

const PORT = process.env.PORT || 8000 ;
app.listen(PORT, () => { console.log(`Server is running on ${PORT}....`) });