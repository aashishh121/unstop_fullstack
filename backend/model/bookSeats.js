const mongoose = require('mongoose');

const bookSeatsSchema = new mongoose.Schema({
   seatsAvailable: [
      
   ],
   reservedSeats:[
      
   ]
});

module.exports = mongoose.model("seats",bookSeatsSchema);