const express = require('express')
const router = express.Router()
const Expense = require('../model/Expense')
const moment = require('moment')

router.get('/expense', function (req, res) {
    Expense.find({}).sort({date: -1}).then( function (expenses) {
        res.send(expenses)
    })
})
const count_expenses = function(expenses){
    count = 0
    expenses.forEach(element => {
        count+=element.amount
    })
    return count
}

router.get('/expenses/:group/:total', function (req, res) {
    total = req.params.total
    Expense.find({'group': req.params.group}).then( function (expenses) {
        if(total=="true")
             res.send(`the total is ${count_expenses(expenses)}`)
        else
            res.send(expenses)
    })
})

router.post('/expense',function(req,res){
    const data = req.body
    data.date = data.date ?  data.date: moment().format('LLLL') 
    exp = new Expense(data)
    exp.save()
    console.log(`the amount of the expense is ${data.amount} and you spent your money on ${data.item}.`)
    res.end()
})

router.put('/update/:id',function(req,res){
    const { id } = req.params;
    const { group1, group2 } = req.body
    Expense.findByIdAndUpdate(
        id,
        { $set: { group: group2 } },
        { new: true })
        .then(
        (updatedExpense) => {

          if (!updatedExpense) {
            return res.status(404).send(`Expense not found for ID ${id}`);
          }
    
          if (updatedExpense.group === group1) {
            res.send(`Expense "${updatedExpense.name}" updated. Group changed from "${group1}" to "${group2}"`);
          } else {
            res.status(400).send(`Expense found, but it does not belong to group ${group1}`);
          }
        }
      )
})



module.exports = router