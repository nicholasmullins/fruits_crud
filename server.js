const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Fruit = require('./models/fruits.js');
const app = express();
const port = process.env.PORT || 3001;



app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

// NEW
app.get('/fruits/new', (req, res) => {
    res.render('new.ejs');
});


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


// CREATE

app.post('/fruits', (req, res) => {
    // console.log(req.body.readyToEat);
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    Fruit.create(req.body, (error, createdFruit) => {
        // res.send(createdFruit)
        res.redirect('/fruits')
    })
    // res.send('hello')
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

mongoose.connect('mongodb+srv://nickmullins:Blu3Be@rds^@fruits.rblk61z.mongodb.net/?retryWrites=true&w=majority', () => {
    console.log('The connection with mongod is established');
})


app.listen(port, () => {
    console.log('listening...');
})
