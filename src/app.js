const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public/");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// this line is setting the view engine inside the Node to hbs
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// by default the index.html from public folder is served
app.use(express.static(publicDirectoryPath));

// if you notice here we are using res.render and not res.send
// render is from hbs module which allows us to render the dynamic data using curly braces
app.get("", (req, res) => {
  // res.render("index"); // just to render the file index.hbs
  res.render("index", {
    title: "Testing the title",
    name: "Pavan followed by Andrew",
  });
});

app.get("/about", (req, res) => {
  if (!req.query.address) {
    res.send({ error: "Testing error" });
  }

  res.render("about", { title: "About page", name: "Pavan hero" });
});

app.get("/help", (req, res) => {
  res.render("help", { title: "Help page", name: "Pavan saver" });
});

app.get("/help/*", (req, res) => {
  res.send("Help not found");
});

app.get("/*", (req, res) => {
  res.send("Sorry we don't have what you are looking for");
});
// app.get("/help", (req, res) => {
//   //   res.send("<h1>Help is on the way</h1>");

//   res.send([
//     {
//       name: "Pavan",
//       age: 34,
//     },
//     {
//       name: "Lovely",
//       age: 28,
//     },
//   ]);
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>We don't have anything to showcase</h1>");
// });

app.get("/weather", (req, res) => {
  res.send("<h1>Weather Testing</h1>");
});

app.listen(4000, () => console.log("Listening for a hit"));
