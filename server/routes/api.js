const express = require('express')
const router = express.Router()
const Expense = require('../model/Expense')
const moment = require('moment')
const count_expenses = require('../../utilities')

router.get('/expenses',async function (req, res) {
    const biggestData = new Date('9999-12-31T23:59:59.999Z').toISOString().slice(0, 10)
    const smallestData = new Date('0000-01-01T00:00:00.000Z').toISOString().slice(0, 10)
    let d1 = req.query.d1 ? moment(req.query.d1).format('YYYY-MM-DD') : biggestData
    let d2 = req.query.d2 ? moment(req.query.d2).format('YYYY-MM-DD') : smallestData
    
    const expenses = await Expense.find({
        $and:[
        {date: {$lt: d1}},
        {date: {$gt: d2}}
    
    ]
    }).sort({"date": -1})
    res.send(expenses)

})

router.get('/expenses/:group/:total', async function (req, res) {
    total = req.params.total
    const expenses = await Expense.find({'group': req.params.group})
    if(total=="true")
      res.send(`the total is ${count_expenses(expenses)}`)
    else
      res.send(expenses)
})

router.post('/expense',function(req,res){
    const data = req.body
    data.date = data.date ?  data.date: moment().format('LLLL') 
    exp = new Expense(data)
    exp.save()
    console.log(`the amount of the expense is ${data.amount} and you spent your money on ${data.item}.`)
    res.end()
})

router.put('/update/:id',async function(req,res){
    const { id } = req.params;
    const { group1, group2 } = req.body
    const updatedExpense = await Expense.findByIdAndUpdate(
      { _id: id, group: group1 },
      { $set: { group: group2 } })

    if (!updatedExpense) {
      return res.status(404).send(`Expense not found for ID ${id}`);
    }

    if (updatedExpense.group === group1) {
      console.log(updatedExpense)
      res.send(`Expense "${updatedExpense.item}" updated. Group changed from "${group1}" to "${group2}"`);
    } else {
      console.log(updatedExpense)
      res.status(400).send(`Expense found, but it does not belong to group ${group1}`);
    }
})



module.exports = router