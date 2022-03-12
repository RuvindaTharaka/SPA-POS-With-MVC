function OrderDetailDTO(orderId,itemCode,itemName,qty,total){
    var orderId=orderId;
    var itemCode=itemCode;
    var itemName=itemName;
    var qty=qty;
    var total=total;

    this.getOrderId = function(){
        return this.orderId;
    }
    this.setOrderId = function(orderId){
        this.orderId=orderId;
    }
    this.getItemCode = function(){
        return this.itemCode;
    }
    this.setItemCode = function(itemCode){
        this.itemCode=itemCode;
    }
    this.getItemName = function(){
        return this.itemName;
    }
    this.setItemName = function(itemName){
        this.itemName=itemName;
    }
    this.getQty = function(){
        return this.qty;
    }
    this.setQty = function(qty){
        this.qty=qty;
    }
    this.getTotal = function(){
        return this.total;
    }
    this.setTotal = function(total){
        this.total=total;
    }

}