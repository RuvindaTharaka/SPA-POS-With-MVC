function OrderDTO(orderId,orderDate,cusId,totalPrice,odArray){
    var orderId=orderId;
    var orderDate=orderDate;
    var cusId=cusId;
    var totalPrice=totalPrice;
    var odArray = new Array();

    this.getOrderId = function (){
        return this.orderId;
    }
    this.setOrderId = function (orderId){
        this.orderId=orderId;
    }
    this.getOrderDate = function (){
        return this.orderDate;
    }
    this.setOrderDate = function (orderDate){
        this.orderDate=orderDate;
    }
    this.getCusId = function (){
        return this.cusId;
    }
    this.setCusId = function (cusId){
        this.cusId=cusId;
    }
    this.getTotalPrice = function (){
        return this.totalPrice;
    }
    this.setTotalPrice = function (totalPrice){
        this.totalPrice=totalPrice;
    }
    this.getOdArray = function (){
       return this.odArray;
    }
    this.setOdArray = function (odArray){
       this.odArray=odArray;
    }
}