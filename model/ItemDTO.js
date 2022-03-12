function ItemDTO(itemCode,itemName,itemSize,unitPrice){
    var itemCode=itemCode;
    var itemName=itemName;
    var itemSize=itemSize;
    var unitPrice=unitPrice;

    this.getItemCode = function (){
        return this.itemCode;
    }
    this.setItemCode = function (itemCode){
        this.itemCode=itemCode;
    }
    this.getItemName = function (){
        return this.itemName;
    }
    this.setItemName = function (itemName){
        this.itemName=itemName;
    }
    this.getItemSize = function (){
        return this.itemSize;
    }
    this.setItemSize = function (itemSize){
        this.itemSize=itemSize;
    }
    this.getUnitPrice = function (){
        return this.unitPrice;
    }
    this.setUnitPrice = function (unitPrice){
        this.unitPrice=unitPrice;
    }
}