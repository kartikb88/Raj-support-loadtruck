const { assert } = require("chai")
const LoadTruck = require("./models/loadingtruckschema")

describe('Saving truck urls',function(){
    it('save records in db',function(done){
        var char = new LoadTruck({
            name:"Ameria",
            location:"USA"
        })
        char.save().then(function(){
            assert(char.isNew=== false);
            done();
        })

    })
});