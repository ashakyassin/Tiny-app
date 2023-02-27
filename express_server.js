
const express = require("express");
const app = express();
const PORT = 8080; // default port 8080

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs")

function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  
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
 const randomStr = generateRandomString();
  urlDatabase[randomStr] = req.body.longURL; 
  res.redirect(`/urls/${randomStr}`); 
});


app.get("/urls/new", (req, res) => {
    res.render("urls_new");
  });


  app.post("/urls", (req, res) => {
    console.log(req.body); // Log the POST request body to the console
    res.send("Ok"); // Respond with 'Ok' (we will replace this)
  });

// added short urls route 
  app.get("/urls/:id", (req, res) => {
    const templateVars = { id: req.params.id, longURL: urlDatabase[req.params.id]};
    console.log (templateVars)
    res.render("urls_show", templateVars);
    });



  app.get('/u/:id', (req, res) => {
    const longURL = urlDatabase[req.params.id];
    if (longURL) {
      res.redirect(longURL);
    } else {
      res.status(404).send('Short URL not found');
    }
  });

  app.post('/urls/:id/delete', (req, res) => {
    const id = req.params.id;
    delete urlDatabase[id];
    res.redirect('/urls');
  });
// This is route updates a URL resource; POST /urls/:id 
  app.post("/urls/:id", (req, res) => {   
    const id = req.params.id;
    const newUrl = req.body.longURL;
    urlDatabase[id] = newUrl;
    res.redirect("/urls");
  });
  
  
  

 