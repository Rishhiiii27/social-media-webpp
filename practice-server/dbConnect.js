const mongoose = require('mongoose')

const urlapi ='mongodb+srv://Rishhiiii27:rishi27@cluster0.uecy5na.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(urlapi)
.then(function(db){
    console.log("db connected");
}).catch(function(e)
{
    console.log(e)
});
