const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

const db = require('./models/alldbfunctions');


/* Please keep the following statement, this one is working sample.
app.post('/user', db.createUser);
*/


app.post('/user', db.createUser);

app.use(express.static(__dirname + "/public"));



app.get('/', (req, res) => {
	res.send("Our capstone -- try app listen on port ");
});

app.get('/regis', (req, res) => {
	
	res.render("register.ejs");
});

app.get('/signin', (req, res) => {
	
	res.render("signin.ejs");
});

app.post('/signin', db.signin);

app.get('/forkimietrythings/:thing', (req, res) => {
	var thing = req.params.thing;
	
	res.render("kimietry.ejs", {thingVar: thing});
});

app.get('/posts', (req, res) => {
	var post = [
		{title: "dear dear", author: "kimie"},
		{title: "there there", author: "kimie1"},
		{title: "call me dad dad", author: "kimie2"}		
	]
	res.render("trypost.ejs",{posts:post});
});

app.listen(3000, () => {
	console.log('server is now listening to port 3000');
});

/*
app.listen(process.env.PORT, process.env.IP, function(){
	console.log('server is now listening to port env.port');
});
*/