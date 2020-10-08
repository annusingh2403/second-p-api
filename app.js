const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());

const bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true}));

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const mongoUrl = "mongodb+srv://dbAnnu:dbAnnu1600@cluster0.ujlb1.mongodb.net/YourPlace2Buy-App?retryWrites=true&w=majority";

MongoClient.connect(mongoUrl,{ useUnifiedTopology: true}, (err, client) => {
    if(err) throw err;
    db = client.db("YourPlace2Buy-App");

    app.listen(port, (err) => {
        if(err) throw err;
        console.log(`server is running on port number ${port}`);
    })
});



app.get("/", (req, res) => {
    res.status(200).send("Hi, this is home page");
});

app.get("/list", (req, res) => {
    db.collection("list").find().toArray((err, result) => {
        if(err) throw err;
        res.send(result)
    })
});

app.get("/productsymbols", (req, res) => {
    db.collection("productSymbols").find().toArray((err, result) => {
        if(err) throw err;
        res.send(result)
    })
});

app.get("/slideimages", (req, res) => {
    db.collection("slideImages").find().toArray((err, result) => {
        if(err) throw err;
        res.send(result)
    })
});

app.get("/slideimages2", (req, res) => {
    db.collection("slideImages2").find().toArray((err, result) => {
        if(err) throw err;
        res.send(result)
    })
});

app.get("/slideimages3", (req, res) => {
    db.collection("slideImages3").find().toArray((err, result) => {
        if(err) throw err;
        res.send(result)
    })
});

app.get("/list/productDetails/:id", (req, res) => {
    let query = {"_id":req.params.id}

    db.collection("products").find(query).toArray((err, result) => {
        if(err) throw err;
        res.send(result)
    })
});



app.get("/list/product", (req, res) => {
    let query = {};
    let sort = {cost:1}

    if(req.query.code){
        query= {"code":req.query.code}
    }else if(req.query.code && req.query.sort){
        query = {"code":req.query.code}
        sort = {cost:Number(req.query.sort)}
    }else if(req.query.lcost && req.query.hcost){
        query = {"code":req.query.code,"cost":{$gt:parseInt(req.query.lcost),$lt:parseInt(req.query.hcost)}}
    }

    db.collection("products").find(query).sort(sort).toArray((err, result) => {
        if(err) throw err;
        res.send(result)
    })
});

app.get("/list/product/:code", (req, res) => {
    let query = {"code":req.params.code}
    let sort = {cost:1}

    if(req.query.sort){
        query = {"code":req.params.code}
        sort = {cost:Number(req.query.sort)}
    }
    if(req.query.lcost && req.query.hcost){
        query = {"code":req.params.code,"cost":{$gt:parseInt(req.query.lcost),$lt:parseInt(req.query.hcost)}}
    }

    db.collection("products").find(query).sort(sort).toArray((err, result) => {
        if(err) throw err;
        res.send(result)
    })
});



app.get('/orders',(req,res) => {
    db.collection('orders').find({}).toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
});

app.post('/placeorder',(req,res) => {
    db.collection('orders').insertOne(req.body,(err,result) => {
        if(err){
            throw err
        }else{
            res.send('Data Added')
        }
    })
});





