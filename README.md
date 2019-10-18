# Bamazon

### What is Bamazon
Bamazon is a mock-up online store. Users are able to view the inventory and purchase items. Once an item has been purchased, the inventory will automatically update to reflect the purchase.

### Technologies used include:
MYSQL, Node, inquirer

### To start:

Start off by running npm i in the terminal. After that, go ahead and run npm start. Upon starting up, Bamazon will greet you and then present three different options. Using the arrow keys and the enter button, one can make a choice between viewing the inventory, purchasing products, and finally logging out. Let us begin our adventure by first viewing the products! Select View Products. A list of products should pop up within the terminal like in the gif below.

![Gif of NPM START](https://github.com/katran0079/bamazon/blob/master/sample/start.gif)

Once you have found something that interests you (I am quite partial to Street Fighter 2), we can make a purchase.
In order to make a purchase, we need a specific product id and pick the Purchase Products option in the terminal. Entering a nonvalid product ID will crash the app so do be mindful of that. Provide the terminal with a VALID specific product ID and hit enter. Then specify how many products you wish to purchase. If successful, you should see within the terminal that the purchase has been logged. If you wish, you can select the View Products option again to see that the products that you have purchased have been removed from the store's inventory.

![Gif of a purchase](https://github.com/katran0079/bamazon/blob/master/sample/purchase.gif)

However if your order cannot be fulfilled due to a lack of inventory, the terminal will relay that message.

![Gif of a purchase](https://github.com/katran0079/bamazon/blob/master/sample/oopsie.gif)


That pretty much sums up the Bamazon. Toodle-loo!
