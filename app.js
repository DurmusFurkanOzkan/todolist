const express = require('express')
const bodyParser = require('body-parser')
const date = require(__dirname + "/date.js");
const list = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));





app.get('/', (req, res) => {

  const day = date.getdate();

  res.render("list", {
    listTitle: day,
    newListItem: list
  });

})

app.post("/", function(req, res) {

  const item = req.body.newItem;
  if (req.body.list === "Work List") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    list.push(item);
    res.redirect("/");
  }
})

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItem: workItems
  });
})

app.get("/about", function(req, res) {
  res.render("about");
})
app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})
