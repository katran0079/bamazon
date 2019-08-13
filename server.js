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
  start();
});

function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
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
          setTimeout(start, 2000);
          break;
        case "Sign Out":
          console.log("Please come back soon!");
          return;

        case "Purchase Products":
          inquirer
            .prompt([
              {
                name: "items",
                type: "input",
                message:
                  "Enter in the ID of the item that you wish to purchase."
              },
              {
                name: "shop",
                type: "input",
                message: "How many would you like to purchase?"
              }
            ])
            .then(function(itemID) {
              connection.query(
                "SELECT * FROM products WHERE ?",
                {
                  product_id: itemID.items
                },
                function(err, res) {
                  if (err) throw err;
                  var quantity = parseInt(itemID.shop);

                  if (quantity == "NaN" || quantity == undefined) {
                    console.log(
                      "Error: You did not put a number into the order. Please enter an integer."
                    );
                    setTimeout(start, 2000);
                  } else {
                    console.log(quantity);
                    var inventory = res[0].stock_quantity;

                    if (quantity < inventory || quantity == inventory) {
                      console.log("Purchase has been successful.");
                      var summary = inventory - quantity;
                      connection.query("UPDATE products SET ? WHERE ?", [
                        {
                          stock_quantity: summary
                        },
                        { product_id: itemID.items }
                      ]);
                      console.log(
                        "Your order has successfully been made. Thanks for shopping at Bamazon."
                      );
                      connection.query(
                        "SELECT * from products WHERE ?",
                        {
                          product_id: itemID.items
                        },
                        function(err, result) {
                          if (err) throw err;
                          console.log(
                            "There are now " +
                              summary +
                              " of " +
                              res[0].product_name +
                              "."
                          );
                          setTimeout(start, 2000);
                        }
                      );
                    } else {
                      console.log(
                        "There are not enough units to fulfill your order."
                      );
                      setTimeout(start, 2000);
                    }
                  }
                }
              );
            });
      }
    });
}
