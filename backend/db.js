
const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://mohitsainda:Mohit55555@cluster0.uviekv0.mongodb.net/weServeDelicious?retryWrites=true&w=majority'
const mongoDB = async()=>{
await mongoose.connect(mongoURI,{useNewUrlParser:true},async (err, result)=>{
      if(err)
      console.log("---",err);
      else
      mongoose.set("strictQuery", false);
      console.log("mongodb connected sucessfully");
      const Fatched_data = await mongoose.connection.db.collection("Food_items");
        Fatched_data.find({}).toArray( async function(err,data){
             const foodCatagory = await mongoose.connection.db.collection("Food_category");
             foodCatagory.find({}).toArray( async function(err,catData)
             {
                  if(err)
            { 
                console.log(err);
            }
            else
            {   
                global.food_items=data;
                global.foodCatagory=catData;
            }
            })
            // if(err){ 
            //     console.log(err);
            // }
            // else
            // {   
            //     global.food_items=data;
                
            // }
        })
})



}

module.exports = mongoDB;
