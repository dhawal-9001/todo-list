
const express = require("express")
const bodyParser = require("body-parser")
const date = require(__dirname + "/date")
const mongoose = require("mongoose")



const port = process.env.PORT ||3000
const today = date.getDay()


const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

mongoose.connect("mongodb+srv://admin-dhawal-793:adminMakeTodo793@todocluster.yabvgca.mongodb.net/todoListDb", { useNewUrlParser: true });
const itemsSchema = {
    name: String
};
const Item = mongoose.model("Item", itemsSchema);

app.get("/", (req, res) => {
    Item.find({}, (err, items) => {

        if (err) { console.log(err) }
        if (items.length > 0) {
            res.render("list", { listTitle: today, todos: items });
        }
        else {
                res.render("list", { listTitle: today, todos: items });
          
        }
    })
})

app.post("/", (req, res) => {
    const todo = req.body.newItem;
    const item = new Item({
        name: todo
    })
    item.save();
    res.redirect("/");

})
app.post("/delete", (req, res) => {
    const todo_id = req.body.deleteTodo;
    console.log(todo_id)
    Item.findByIdAndRemove(todo_id, (err) => {
        err ? console.log(err) : console.log("Successfully Deleted todo with id " + todo_id)
    })
    res.redirect("/")
})



app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

module.exports = app