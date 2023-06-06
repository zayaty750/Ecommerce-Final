export class Cart {
    constructor(oldcart) {
        this.items = oldcart.items || {};
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

            //reduce by 1
        this.reduceByOne = function(id){
            this.items[id].qty--;
            this.items[id].price-=this.items[id].item.price;
            this.totalQty--;
            this.totalPrice-=this.items[id].item.price;

            if(this.items[id].qty<=0){
                delete this.items[id];
            }
        }
        //delete all items
        this.deleteAllItems=function(){
            delete this.items;
        }
        // delete
        this.removeItem = function(id){
            
            this.totalQty-=this.items[id].qty;
            this.totalPrice-=this.items[id].price;
            delete this.items[id];
        }


         this.generateArray = function () {
            var arr = [];
            for (var id in this.items) {
                arr.push(this.items[id]);
            }
            return arr;
        };

    }
};