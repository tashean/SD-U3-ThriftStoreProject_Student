//? This array is not to be changed.
/* const salesTax = [
    {state: 'Alabama', tax: .04},
    {state: 'Alaska', tax: .00},
    {state: 'Arizona', tax: .056},
    {state: 'Arkansas', tax: .065},
    {state: 'California', tax: .0725},
    {state: 'Colorado', tax: .029},
    {state: 'Connecticut', tax: .0635},
    {state: 'Delaware', tax: .00},
    {state: 'DC', tax: .06},
    {state: 'Florida', tax: .06},
    {state: 'Georgia', tax: .04},
    {state: 'Hawaii', tax: .04166},
    {state: 'Idaho', tax: .06},
    {state: 'Illinois', tax: .0625},
    {state: 'Indiana', tax: .07},
    {state: 'Iowa', tax: .06},
    {state: 'Kansas', tax: .065},
    {state: 'Kentucky', tax: .06},
    {state: 'Louisiana', tax: .0445},
    {state: 'Maine', tax: .055},
    {state: 'Maryland', tax: .06},
    {state: 'Massachusetts', tax: .0625},
    {state: 'Michigan', tax: .06},
    {state: 'Minnesota', tax: .06875},
    {state: 'Mississippi', tax: .07},
    {state: 'Missouri', tax: .04225},
    {state: 'Montana', tax: .00},
    {state: 'Nebraska', tax: .055},
    {state: 'Nevada', tax: .0685},
    {state: 'New Hampshire', tax: .00},
    {state: 'New Jersey', tax: .06625},
    {state: 'New Mexico', tax: .05125},
    {state: 'New York', tax: .04},
    {state: 'North Carolina', tax: .0475},
    {state: 'North Dakota', tax: .05},
    {state: 'Ohio', tax: .0575},
    {state: 'Oklahoma', tax: .045},
    {state: 'Oregon', tax: .00},
    {state: 'Pennsylvania', tax: .06},
    {state: 'Rhode Island', tax: .07},
    {state: 'South Carolina', tax: .06},
    {state: 'South Dakota', tax: .06},
    {state: 'Tennessee', tax: .07},
    {state: 'Texas', tax: .0625},
    {state: 'Utah', tax: .061},
    {state: 'Vermont', tax: .06},
    {state: 'Virginia', tax: .053},
    {state: 'Washington', tax: .065},
    {state: 'West Virginia', tax: .06},
    {state: 'Wisconsin', tax: .05},
    {state: 'Wyoming', tax: .04},
]; */

class Product {
    constructor(upc, name, type, purchasePrice, quantity = 1, marketPrice = 0) {
        this.upc = upc;
        this.name = name;
        this.type = type;
        this.purchasePrice = purchasePrice;
        this.quantity = quantity;
        this.marketPrice = marketPrice;
    }
    }

    class Store {
    constructor(name, city, state, saleTax) {
        this.name = name;
        this.location = {
        city: city,
        state: state,
        };
        this.salesTax = saleTax;
        this.inventory = [];
      this.balance = 200; // Starting balance
        this.expenses = 0;
        this.profit = 0;
        this.paidTax = 0;

      // Set sales tax based on the provided array
        this.setSalesTax();
    }

    setSalesTax() {
        const stateInfo = salesTax.find((info) => info.state === this.location.state);
        if (stateInfo) {
        this.salesTax = stateInfo.tax;
        } else {
        console.error(`Error: Sales tax information not found for ${this.location.state}`);
        }
    }

    addToInventory(product, markupPercentage) {
        const existingProduct = this.inventory.find((item) => item.upc === product.upc);

        if (existingProduct) {
        // Item already exists, update quantity
        existingProduct.quantity += product.quantity;
        } else {
        // Item doesn't exist, add to inventory
        const marketPrice = product.purchasePrice + product.purchasePrice * markupPercentage;
        product.marketPrice = marketPrice;
        this.inventory.push(product);
        this.balance -= product.purchasePrice * product.quantity; // Update store balance
        }
    }

    sellItem(upc, quantity) {
        const soldItem = this.inventory.find((item) => item.upc === upc);
  
        if (soldItem && soldItem.quantity >= quantity) {
        // Calculate profit
        const profit = quantity * (soldItem.marketPrice - soldItem.purchasePrice);
        this.profit += profit;
  
        // Update balance
        this.balance += quantity * soldItem.marketPrice;

        // Update inventory
        soldItem.quantity -= quantity;

        // Update paid tax
        const taxAmount = (soldItem.marketPrice * this.salesTax) / 100;
        this.paidTax += taxAmount;

        console.log(`Sold ${quantity} ${soldItem.name}(s) from ${this.name}. Profit: $${profit}`);
        } else if (soldItem) {
        console.error(`Error: Insufficient quantity of ${soldItem.name} in stock.`);
        } else {
        console.error(`Error: Item with UPC ${upc} not found in ${this.name}'s inventory.`);
        }
    }
    }

  //* Store # 1: Thrift Haven
    const store1 = new Store("Thrift Haven", "Houston", "Texas", salesTax);
    const item1 = new Product(1, "Vintage Chair", "Furniture", 20, 2);
    const item2 = new Product(2, "Classic Book", "Books", 5, 5);
    const item3 = new Product(3, "Toy Train", "Toys", 10, 3);

  store1.addToInventory(item1, 0.2); // 20% markup
  store1.addToInventory(item2, 0.3); // 30% markup
  store1.addToInventory(item3, 0.25); // 25% markup

  //* Store # 2: Timeless Treasures
    const store2 = new Store("Timeless Treasures", "Seattle", "Washington", salesTax);
    const item4 = new Product(4, "Kitchen Blender", "Kitchenware", 30, 2);
    const item5 = new Product(5, "Board Game", "Toys", 15, 2);

  store2.addToInventory(item4, 0.15); // 15% markup
  store2.addToInventory(item5, 0.2); // 20% markup

  //* Store # 3: Rarities Style Realm
    const store3 = new Store("Rarities Style Realm", "New York City", "New York", salesTax);
    const item6 = new Product(6, "Antique Mirror", "Decor", 50, 1);
    const item7 = new Product(7, "Collectible Vinyl", "Music", 25, 3);

  store3.addToInventory(item6, 0.18); // 18% markup
  store3.addToInventory(item7, 0.25); // 25% markup

  //* Selling

  //* Store # 1: Thrift Haven
  store1.sellItem(1, 1); // Sell 1 Vintage Chair
  store1.sellItem(2, 3); // Try to sell 3 Classic Books (insufficient quantity)

  //* Store # 2: Timeless Treasures
  store2.sellItem(4, 2); // Sell 2 Kitchen Blenders
  store2.sellItem(5, 3); // Try to sell 3 Board Games (insufficient quantity)

  //* Store # 3: Rarities Style Realm
  store3.sellItem(6, 1); // Sell 1 Antique Mirror
  store3.sellItem(7, 4); // Try to sell 4 Collectible Vinyls (insufficient quantity)

  //* Testing
    console.log("Store 1:", store1);
    console.log("Store 2:", store2);
    console.log("Store 3:", store3);