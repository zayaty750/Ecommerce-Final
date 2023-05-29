export class Cart {
    constructor(oldcart) {
        this.items = oldcart || {};
        this.totalQty = oldcart.totalQty || 0;
        this.totalPrice = oldcart.totalPrice || 0;

        this.add = function (item, id) {
            let storedItem = this.items[id];
            if (!storedItem) {
                // Object
                storedItem = this.items[id] = { item: item, qty: 0, Price: 0 };
            }
            storedItem.qty++;
            storedItem.Price = storedItem.item.Price * storedItem.qty;
            this.totalQty++;
            this.totalPrice += storedItem.item.Price;
        };

        this.generateArray = function () {
            let arr = [];
            for (var id in this.items) {
                arr.push(this.items[id]);
            }
            return arr;
        };

    }
};