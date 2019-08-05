var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "root",
  database: "bambazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Welcome to Bambazon!");
});

function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}

//opening function
function start() {
  inquirer
    .prompt([
      {
        name: "test",
        type: "list",
        message: "What would you like to do today?",
        choices: ["View Products", "Purchase Products", "Sign Out"]
      }
    ])
    .then(function(cmd) {
      switch (cmd.test) {
        case "View Products":
          readProducts();
          start();
          break;
        case "Purchase Products":
          inquirer
            .prompt([
              {
                name: "items",
                type: "input",
                message:
                  "Enter in the ID of the item that you wish to purchase."
              }
            ])
            .then(function(itemID) {
              console.log("Searching for your item...");
              connection.query(
                "SELECT * FROM products WHERE product_id=" + itemID.items,
                function(err, res) {
                  if (err) throw err;
                  console.log(res);
                  connection.end();
                  inquirer.prompt([{
                    name: "shop",
                    type: "input",
                    message: "How many would you like to purchase?"
                  }]).then(function(pItem) {
                    if ()
                  }
                }
              );
            });
      }
    });
}

start();
