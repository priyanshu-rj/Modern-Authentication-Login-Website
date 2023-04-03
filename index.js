const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname+"/assets/bootstrap/css"));
app.use(express.static(__dirname+"/assets/bootstrap/js"));
app.use(express.static(__dirname +"/assets/css"));
app.use(express.static(__dirname +"/assets/img"));
app.use(express.static(__dirname +"/assets/js"));

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/hackathon',{useNewUrlParser: true});


var login =new mongoose.Schema({
    name:String,
    pass:String,
    person:String,
});

const loginup =new mongoose.model('document', login);  // main hai ye dbs ka 

app.post('/signup.html',(req,res)=>{
    var temp =loginup({
        name: req.body.mail,
        pass: req.body.pass,
        person: req.body.name,
    });
    const name = req.body.mail;
     const pass = req.body.pass;
      const person = req.body.name;
      const rep = req.body.repeat;
    if(name=="" || pass=="" || person=="" || rep==""){
        res.send("please fill this information");
    }

    else if(pass!=rep){
         res.send("password does not  match");
    }

    else{
    temp.save();
    console.log(temp);
    }

    function generateOTP() {
        var digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 4; i++ ) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
    }

    var tempotp =  generateOTP() ;


// yha se start hai mail box



const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'ra0001j@gmail.com',
        pass: 'lztneumdqnfhiwaf'
    } 
});
    const name2 = req.body.mail;
    var mailOptions = {
      from: 'ra0001j@gmail.com',
      to: name2,
      subject: 'thanks for registration',
      text: 'Welcome to  website your otp is ' + tempotp
    };



    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

//end
    res.send("sucess");})

app.post('/login.html',async (req,res)=>{
  const nam =  req.body.email;
  const pas = req.body.passs;
 const username =  await loginup.findOne({name:nam});
 const t = username.pass;
 const k = username.person;
 const l = username.name;
 console.log(k);
if(t===pas){
    // let names = k;
    // res.render('profile',{
    //   userName: names,
    //   usermail: l,
    //   number: number1
    // });
    res.send('sucess');
}
else{
    res.send("password or username wrong plz check them");
}

})



app.get('/login.html',(req,res)=>{
    res.sendfile('login.html');
})

app.get('/signup.html',(req,res)=>{
    res.sendfile('signup.html');
})

app.listen(port,(req,res)=>{
    console.log(`server start  ${port}`);
})


var nodemailer = require('nodemailer');


//ejs
const ejs = require('ejs');
app.set('view engine', 'ejs');
