const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookiePraser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');


const app = express();

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookiePraser());

//view engine
app.set('view engine', 'ejs');

//database connection
const dbURI ='mongodb://localhost:27017/node-auth';
mongoose.connect(dbURI)
.then((result)=> {
    app.listen(3000);
    console.log('connected to db', "server is running on port 3000");
})
.catch((err)=> console.log(err));


//routes
app.get('*', checkUser);
app.get('/',(req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res)=> res.render('smoothies'));
app.use(checkUser);


/*
//cookies
app.get('/set-cookies', (req,res)=>{

    // res.setHeader('Set-Cookies', 'newUser=true');
    
    res.cookie('newUser', false);
    res.cookie('isEmployee',true,{maxAge: 1000 * 60 * 60 *24, httpOnly:true });
    
    res.send('you got the cookies!');
    
    });
    
    app.get('/read-cookies', (req,res)=>{
    
    
        const cookies = req.cookies;
        console.log(cookies.newUser);
    
        res.json(cookies);
    })
         */