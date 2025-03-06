const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const port = 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("Middleware 1");
  next();
});

app.listen(port, () => {
  console.log("server is running on port 3000");
});

app.route("/user").get((req, res) => {
  const html = `<html>    
    
    <head>
        <title>Users</title>    
        </head>
        <body>
            <h1>Users</h1>
            <ul>
                ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
            </ul>
        </body>
        </html>`;
  return res.send(html);
});

app
  .route("/api/user")
  .get((req, res) => {
    return res.json(users);
  })
  .post((req, res) => {
    console.log(req.body);
    const body = req.body;
    users.push({ ...body, id: users.length });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        return res.status(500).send("Error");
      }
      return res.status(200).send("Done");
    });
  });

app.route("/api/user/:id").get((req, res) => {
  let parm = req.params.id;
  let user = users.find((user) => user.id == parm);

  return res.json(user);
});
