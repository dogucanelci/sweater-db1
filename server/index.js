const express = require("express");
const cors = require("cors");
const monk  = require("monk");
const Filter = require("bad-words");
const Rate_limit = require("express-rate-limit");
const app = express();
//const db = monk('localhost/meower');
const db = monk("mongodb+srv://dogucanelci:********@sweater-database.zkaoj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" || 'localhost/meower');
const mews = db.get('mews');
  // perform actions on the collection object
const filter = new Filter();
const ds = "ds";
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.json({message:"miyav efendimizzzz 😹"});   
});
app.get("/mews",(req,res)=>{
    mews
    .find()
    .then(mews=>{
        res.json(mews);
    });
});
function isvalidcontent(mew){
    return  mew.name && mew.name.toString().trim()!=="" && mew.content && mew.content.toString().trim()!=="";
}

app.use(Rate_limit({    //calismiyor.
    windowMs: 30000 , max: 1} //per 30 seconds
));

app.post("/mews",(req,res)=>{
    if(isvalidcontent(req.body)){
        const mew = {
            name: filter.clean(req.body.name.toString()),
            content: filter.clean(req.body.content.toString()),
            created: new Date()
        };
        //console.log(name_cont_str);
        mews.insert(mew).then(createdMew=>{res.json(createdMew)});
    }
    else{
        res.status(422);
        res.json({
            message:"Hey,you have to enter something dude :)"
        });
    }
});



//app.listen(5000 ,()=>{
//    console.log("Listening on https://sweater-db.herokuapp.com/");
//});
