var express= require("express"); 
var bodyParser= require("body-parser"); 
var app=express()
var path = require("path");

app.use(express.static(__dirname + ""));
const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/mydb',{useNewUrlParser: true, useUnifiedTopology: true}); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
	console.log("connection succeeded"); 
}) 
const dataSchema = new mongoose.Schema({
  name: String,
  age: Number,
  best: String,
  worst: String
});
const Data = mongoose.model('Data', dataSchema);


app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
	extended: true
})); 

app.post('/fform', function(req,res){ 
	var name = req.body.name; 
	var age =req.body.age; 
	var best = req.body.bestjob; 
	var worst =req.body.worstjob; 

	var data = { 
		"name": name, 
		"age":age, 
		"best":best, 
		"worst":worst 
	} 
db.collection('Data').insertOne(data,function(err, collection){ 
		if (err) throw err; 
		console.log("Record inserted Successfully"); 
			
	}); 
		
	//return res.redirect('signup_success.html'); 
}) 


app.get('/',function(req,res){ 
// res.set({ 
// 	'Access-control-Allow-Origin': '*'
// 	}); 
// return res.redirect('index.html'); 
res.sendFile("./index.html", {
    root: path.join(__dirname, "../../"),
  });
}).listen(3000) 


console.log("server listening at port 3000"); 

// fs.createReadStream('data.csv')
//   .pipe(csv())
//   .on('data', (row) => {
//     console.log(row);
//   })
//   .on('end', () => {
//     console.log('CSV file successfully processed');
//   });