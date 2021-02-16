const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;
const formData = fs.createWriteStream("data.csv");
const userData = fs.createReadStream('data.csv')


// when a get request is coming from the root
app.get("/", (req, res) => {
  res.send("Hello Recipes Express!");
});
app.get("/about", (req, res) => {
  res.send("This is a sample app");
});
app.get("/time", (req, res) => {
  // current timestamp in milliseconds
  res.send(`${new Date()}`);
});

app.get("/file", (req, res) => {
  fs.readFile("./recipes.txt", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(data);
    res.writeHead(200, { "Content-Type": "text/plain" });
  });
});
// not the way to do this.

app.get("/userLookup", (req, res)=>{
    fs.readFile("./data.csv", "utf-8", (err, data) =>{
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        if(err) {
            console.log(err);
            return;
        }else if(firstName || lastName === data){
           userData.read(`${data}` )
        }else{
            res.send('please enter correct first name or last name')
        }
        
    })

})


// next time use csv-writer for code below
app.post("/formSubmit", (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.emailField;
  let phone = req.body.phoneNumber;
  formData.write(`
first Name:${firstName}\n
Last Name: ${lastName}\n
Email: ${email}\n
Phone: ${phone}\n
submit time ${new Date()}`);
  res.send(`
first Name:${firstName}\n
Last Name: ${lastName}\n
Email:  ${email}\n
Phone: ${phone}\n
submit time: ${new Date()}`);
});

app.listen(3001, () => {
  console.log(`Listening on ${port}`);
});
