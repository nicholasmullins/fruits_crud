const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Fruit = require('./models/fruits.js');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 3001;


app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

// NEW
app.get('/fruits/new', (req, res) => {
    res.render('new.ejs');
});

// CREATE

app.post('/fruits', (req, res) => {
    console.log(req.body.readyToEat);
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    Fruit.create(req.body, (error, createdFruit) => {
        res.send(createdFruit)
    })
})

// SHOW
app.get('/fruits/:id', (req, res) => {
    Fruit.findById(req.params.id, (error, foundFruit) => {
        res.render(
            'show.ejs',
            {
                fruit:foundFruit
            }
        );
    })
})

// INDEX
app.get('/fruits', (req, res) => {
    Fruit.find({}, (error, allFruits) => {
        res.render(
            'index.ejs',
            {
                fruits:allFruits,
            }
        )
    })

})


// EDIT

app.get('/fruits/:id/edit', (req,res) => {
    Fruit.findById(req.params.id, (err, foundFruit) => {4
     res.render(
        'edit.ejs', 
        {
            fruit: foundFruit // pass in found Fruit
        }
     );  
    })
})

// UPDATE

app.put('/fruits/:id', (req,res) => {
    if(req.body.readyToEat === 'on') {
        req.body.readyToEat = true;
    } else {    
        req.body.readyToEat = false;
    }
    Fruit.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true},
        (err, updatedFruit) =>
        res.redirect('/fruits')
    )
})

// DELETE

app.delete('/fruits/:id', (req, res) => {
    Fruit.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.redirect('/fruits')
    })
})


mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB, () => {
    console.log('The connection with mongod is established at ');
})


app.listen(port, () => {
    console.log('listening...');
})
