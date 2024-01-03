const express = require('express')
const router = express.Router()
const Person = require('../model/Expense')

router.get('/people', function (req, res) {
    Person.find({}).then( function (people) {
        res.send(people)
    })
})

router.post('/person',function(req,res){
    const p1 = new Person(req.body)
    p1.save()
    res.end()
})

router.put('/person/:id',function(req,res){
    Person.findById(req.params.id).then((p1)=>{
        p1.age = 80
    })
    res.end()
})

router.delete('/apocalypse',function(req,res){
    Person.deleteMany({}).then(
        function(res){
            console.log("all deleted!")
        })  
    res.end()
})

module.exports = router