/* Validation RegEx */
 const txtQtyRegEx = /^[0-9]{1,3}$/;
 const txtCashRegEx = /^[0-9]{1,5}$/;
 const orderIdRegEx= /^(OD00-)[0-9]{3,5}$/;
/* Date Formatting */
let today =new Date();
let dd=today.getDate();
let mm=today.getMonth()+1;
let yy=today.getFullYear();
let d=`${dd}-${mm}-${yy}`;
/* Calling All Methods */
loadOrderID();
setDate();
/*loadCusID();*/
//loadItemCode();
/* Load Order Id*/
function loadOrderID(){
    $("#cmbOrderID").text("OD00-00"+orderDB.length);
}
/* Load Date */
function setDate(){
    $("#txtDate").text(d);
}
/* Load Customer Id */
function loadCusID(){
   $("#selectedCusID").empty();
   for (let i = 0; i < customerDB.length; i++){
        let cusID =customerDB[i].id;
        let row =`<option value="${cusID}">${cusID}</option>`;
        $("#selectedCusID").append(row);
   }
}
/* Search Customer Name */
function  searchCustomerName(id){
     for (let i = 0; i < customerDB.length; i++) {
         if (customerDB[i].id == id) {
            $("#lblCusName").text(customerDB[i].name);
        }
     }
}
/*  Load Customer Name */
$("#selectedCusID").click(function(){
        var id=$("#selectedCusID").val();
        searchCustomerName(id);
});
/* Load ItemCode */
function loadItemCode(){
   $("#selectedItemCode").empty();
   for (let i = 0; i < itemDB.length; i++){
        let itemCode =itemDB[i].itemCode;
        let row =`<option value="${itemCode}">${itemCode}</option>`;
        $("#selectedItemCode").append(row);
   }
}
/* Search Item Name */
function  searchItemName(itemCode){
     for (let i = 0; i < itemDB.length; i++) {
         if (itemDB[i].itemCode == itemCode) {
            $("#lblItemName").text(itemDB[i].itemName);
        }
     }
}
/*  Load Item Name */
$("#selectedItemCode").click(function(){
        var itemCode=$("#selectedItemCode").val();
        searchItemName(itemCode);
});
/* Bind AddItemList Function */
$("#addItem").click(function(){
    let itemCode=$("#selectedItemCode").val();
    if(validQty()){
        $("#txtQty").css('border', '2px solid green');
        addItemList(itemCode);
    }else{
        $("#txtQty").css('border', '2px solid red');
    }

});
/*
 Add ItemList Function
function addItemList(itemCode){
let itemName;
let unitPrice;
    for (let i=0; i<itemDB.length; i++){
        if(itemDB[i].itemCode==itemCode){
            itemName=itemDB[i].itemName;
            unitPrice=itemDB[i].unitPrice;
        }
    }
    let qty=$("#txtQty").val();
    let totPrice=unitPrice*qty;
    let row= `<tr><td>${itemCode}</td><td>${itemName}</td><td>${qty}</td><td>${totPrice}</td></tr>`;
    $("#orderTable").append(row);
    calcTotal(totPrice);
}
*/


function addItemList(code){
    let itemCode=code;
    let itemName;
    let qty;
    let unitPrice;
    let total;
    let orderId= $("#cmbOrderID").text();
    console.log(orderId);
    for (let i=0; i<itemDB.length; i++){
        if(itemDB[i].itemCode==itemCode){
            itemName=itemDB[i].itemName;
            unitPrice=itemDB[i].unitPrice;
        }
    }
    qty=$("#txtQty").val();
    total=unitPrice*qty;

    var resp = searchOrderDetail(orderId,itemCode);
    //console.log("resp : "+resp);
    if(resp == undefined){

         var orderDetailObject = new OrderDetailDTO(orderId,itemCode,itemName,qty,total);
         orderDetailObject.setOrderId(orderId);
         orderDetailObject.setItemCode(itemCode);
         orderDetailObject.setItemName(itemName);
         orderDetailObject.setQty(qty);
         orderDetailObject.setTotal(total);
         orderDetailDB.push(orderDetailObject);
    }else{

     /*   var orderDetailObject = new OrderDetailDTO(orderId,itemCode,itemName,qty,total);
        orderDetailObject.setOrderId(orderId);
        orderDetailObject.setItemCode(itemCode);
        orderDetailObject.setItemName(itemName);
        orderDetailObject.setQty(qty);
        orderDetailObject.setTotal(total);
        orderDetailDB.push(orderDetailObject);*/
        var lastQty=parseInt(orderDetailDB[resp].getQty());
        var tempQty=parseInt($("#txtQty").val());
        var newQty=(lastQty)+(tempQty);
        var newTotal=newQty*unitPrice;
        orderDetailDB[resp].setQty(newQty);
        orderDetailDB[resp].setTotal(newTotal);
    }
    loadItemToTable();
    calcTotal();
    $("#txtQty").css('border', '1px solid blue');
}
function searchOrderDetail(orderId,itemCode){
    for (let i = 0; i < orderDetailDB.length; i++) {
         if (orderDetailDB[i].getOrderId() == orderId && orderDetailDB[i].getItemCode() == itemCode) {
              return i;
         }
    }
}
/* Calc Total */
function calcTotal(totPrice){
    let total=0;
    for (let i=0; i<orderDetailDB.length;i++){
        total=total+orderDetailDB[i].getTotal();
    }
    $("#total").text(total);
}
function loadItemToTable(){
    $("#orderTable").empty();
    for (let i=0; i<orderDetailDB.length;i++){
        let orderId = orderDetailDB[i].getOrderId();
        let itemCode = orderDetailDB[i].getItemCode();
        let itemName = orderDetailDB[i].getItemName();
        let qty = orderDetailDB[i].getQty();
        let total = orderDetailDB[i].getTotal();

        let row = `<tr><td>${itemCode}</td><td>${itemName}</td><td>${qty}</td><td>${total}</td></tr>`;
        $("#orderTable").append(row);

    }
    clearOderDetail();
}
$("#txtCash").keyup(function(){
    if(event.key == "Enter"){
        calcBalance();

    }
});
function validQty(){
    if(txtQtyRegEx.test($("#txtQty").val())){
        return true;
    }else{
        return false;
    }
}
function validCash(){
    if(txtCashRegEx.test($("#txtCash").val())){
        return true;
    }else{
        return false;
    }
}
function  calcBalance(){
    if(validCash()){
        $("#txtCash").css('border', '2px solid green');
        let cash=$("#txtCash").val();
        let total=parseInt($("#total").text());
        if(cash>total){
            let bal=cash-total;
            $("#balance").text(bal);
        }else{
            alert("Not enough Money!");
        }
    }else{
        $("#txtCash").css('border', '2px solid red');
        $("#balance").text(0.0);
    }
}
$("#confirm").click(function(){
    var response=searchOrder();
    console.log(response)
    if(response == undefined){
        saveOrder();
    }else{
        updateOrder(response);
    }

    $("#txtCash").css('border', '1px solid blue');
    clearAllOrder();
});
function updateOrder(response){
        console.log("update");
        let orderId=$("#cmbOrderID").text();
        let orderDate=$("#txtDate").text();
        let cusId=$("#selectedCusID").val();
        let totalPrice=$("#total").text();
        let odArray =new Array;
        for (var i=0; i<orderDetailDB.length; i++){
            odArray[i]=orderDetailDB[i];
        }
        var orderObject =new OrderDTO (orderId,orderDate,cusId,totalPrice,odArray);
        orderObject.setOrderId(orderId);
        orderObject.setOrderDate(orderDate);
        orderObject.setCusId(cusId);
        orderObject.setTotalPrice(totalPrice);
        orderObject.setOdArray(odArray);
        orderDB[response]=orderObject;
        orderDetailDB.length=0;
        loadItemToTable();
}
function searchOrder(){
    let orderId=$("#searchedOderId").val();
    console.log(orderId);
    for(let i=0; i<orderDB.length; i++){
        if(orderId==orderDB[i].getOrderId()){
            return i;
            console.log(i);
        }
    }
}
function saveOrder(){
    console.log("save");
    let orderId=$("#cmbOrderID").text();
    let orderDate=$("#txtDate").text();
    let cusId=$("#selectedCusID").val();
    let totalPrice=$("#total").text();
    let odArray =new Array;
    for (var i=0; i<orderDetailDB.length; i++){
        odArray[i]=orderDetailDB[i];
    }
    var orderObject =new OrderDTO (orderId,orderDate,cusId,totalPrice,odArray);
    orderObject.setOrderId(orderId);
    orderObject.setOrderDate(orderDate);
    orderObject.setCusId(cusId);
    orderObject.setTotalPrice(totalPrice);
    orderObject.setOdArray(odArray);
    orderDB.push(orderObject);
    orderDetailDB.length=0;
    loadItemToTable();
}

function clearOderDetail(){
    $("#selectedItemCode").val('');
    $("#lblItemName").text('');
    $("#lblItemName").css('height','2.5rem');
    $("#txtQty"). val('');
}
function clearAllOrder(){
    $("#cmbOrderID").text('');
    $("#selectedCusID").val('');
    $("#lblCusName").text('');
    $("#lblCusName").css('height','2.5rem');
    $("#total").text('');
    $("#total").css('height','2.5rem');
    $("#txtCash").val('');
    $("#balance").text('');
    $("#balance").css('height','2.5rem');
    loadOrderID();
}

$("#searchOrderIdBtn").click(function(){
    if(orderIdRegEx.test($("#searchedOderId").val())){
        $("#searchedOderId").css('border','red');
       loadOrderDetails();
    }else{
        $("#searchedOderId").css('border','red');
    }

});
function loadOrderDetails(){
    var tempID=$("#searchedOderId").val();
    var num=-1;
    for (let i=0; i<orderDB.length; i++){
        if(tempID==orderDB[i].getOrderId()){
            num=i;
            $("#cmbOrderID").text(orderDB[i].getOrderId());
            $("#txtDate").text(orderDB[i].getOrderDate());
            $("#selectedCusID").val(orderDB[i].getCusId ());
            searchCustomerName(orderDB[i].getCusId ()) ;
            $("#total").text(orderDB[i].getTotalPrice());
            var tempArray = new Array();
            tempArray=orderDB[i].getOdArray();
        }
    }
    if(num>0){
        for (let x=0; x<tempArray.length; x++){
             var orderDetailObject = new OrderDetailDTO();
             orderDetailObject.setOrderId(tempArray[x].getOrderId());
             orderDetailObject.setItemCode(tempArray[x].getItemCode());
             orderDetailObject.setItemName(tempArray[x].getItemName());
             orderDetailObject.setQty(tempArray[x].getQty());
             orderDetailObject.setTotal(tempArray[x].getTotal());
             orderDetailDB.push(orderDetailObject);
             loadItemToTable();
        }
    }

    if(num== -1){
        alert("No such Order");
        $("#searchedOderId").val("");
    }
    $("#searchedOderId").css('border','blue');
}
