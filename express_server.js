
const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
app.set("view engine", "ejs")
const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

app.get("/urls.json", (req, res) => {
 res.json(urlDatabase);
});

// urls index page this will list all the short urls in the table form

// read this will list all the urls that i created 
app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase}; 
  res.render("urls_index", templateVars);
});

app.post("/urls", (req, res) => {
    res.send(" post urls index page!");
});

// added short urls route 
  app.get("/urls/:id", (req, res) => {
    const templateVars = { id: req.params.id, longURL: urlDatabase[req.params.id]};
    res.render("urls_show", templateVars);
  });
