const mongoose = require("mongoose")
mongoose.Promise = global.Promise;
//before(function(done){
    mongoose.connect('mongodb://localhost/loadtruck');
    mongoose.connection.once('open',function(){
        console.log('Connection has been made.');
       // done();
    }).on('error',function(error){
        console.log('Connection error:',error)
    });
//})
