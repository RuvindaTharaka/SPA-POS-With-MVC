/* RegEx Conditions */
 const itemCodeRegEx = /^(I00-)[0-9]{3}$/;
 const itemNameRegEx = /^[A-z]{5,20}$/;
 const itemSizeRegEx = /^[L S M]$/;
 const itemPriceRegEx = /^[0-9]{1,3}(.00)$/;

/* Bind Validation Function */
$('#txtItemCode,#txtItemName,#txtQuantity,#txtPrice').keyup(function(){
     focusValidItem();
});

/* Bind Save Item Function */
$("#btnSaveItem").click(function(){
     saveItem();
});

/* Bind Search Item Function */
$("#btnSearchItem").click(function () {
    var searchID = $("#txtSearchItemCode").val();
         if(itemCodeRegEx.test(searchID)){
             $("#txtSearchItemCode").css('border', '2px solid green');
             // $("#altSearchId").text("");
             var response = searchItem(searchID);
             if (response) {
                  $("#txtItemCode").val(response.itemCode);
                  $("#txtItemName").val(response.itemName);
                  $("#txtQuantity").val(response.itemSize);
                  $("#txtPrice").val(response.unitPrice);
             }else{
                 alert("No Such a Item");
                  clearAll();
             }
         }else{
            $("#txtSearchItemCode").css('border', '2px solid red');
            //$("#altSearchId").text("Wrong Format! Ex: C00-001");
            return;
         }
    clearAll();
});
/* Bind Delete Customer Function */
$("#btnDeleteItem").click(function () {
     deleteItem();
     loadAllItems();
     clearAll();
});
/* Validation Function */
/*function focusValidItem(){
   *//* if(event.key == "Enter"){
         if(itemCodeRegEx.test($("#txtItemCode").val())){
             $("#txtItemCode").css('border', '2px solid green');
             $("#altItemCode").text("");
             $("#txtItemName").focus();
              if(itemNameRegEx.test($("#txtItemName").val())){
                   $("#txtItemName").css('border', '2px solid green');
                   $("#altItemName").text("");
                   $("#txtQuantity").focus();
                   if(itemSizeRegEx.test($("#txtQuantity").val())){
                        $("#txtQuantity").css('border', '2px solid green');
                        $("#altQuantity").text("");
                        $("#txtPrice").focus();
                        if(itemPriceRegEx.test($("#txtPrice").val())){
                            $("#txtPrice").css('border', '2px solid green');
                            $("#altPrice").text("");
                        }else{
                            $("#txtPrice").css('border', '2px solid red');
                            $("#altPrice").text("Wrong Format! Ex: 500.00");
                            return;
                        }
                   }else{
                       $("#txtQuantity").css('border', '2px solid red');
                       $("#altQuantity").text("Please Enter 'L' or 'M' or 'S' !");
                       return;
                   }
              }else{
                  $("#txtItemName").css('border', '2px solid red');
                  $("#altItemName").text("Wrong Format! Ex: Pizza");
                  return;
              }
         }else{
                $("#txtItemCode").css('border', '2px solid red');
                $("#altItemCode").text("Wrong Format! Ex: I00-001");
                return;
         }
    }*//*
}*/
function focusValidItem(){
$("#btnSaveItem").attr('disabled','true');
    if(itemCodeRegEx.test($("#txtItemCode").val())){
       $("#txtItemCode").css('border', '2px solid green');
       $("#altItemCode").text("");

       if(event.key == "Enter"){
       $("#txtItemName").focus();
          if(itemNameRegEx.test($("#txtItemName").val())){
             $("#txtItemName").css('border', '2px solid green');
             $("#altItemName").text("");
             if(event.key == "Enter"){
             $("#txtQuantity").focus();
                if(itemSizeRegEx.test($("#txtQuantity").val())){
                    $("#txtQuantity").css('border', '2px solid green');
                    $("#altQuantity").text("");
                    if(event.key == "Enter"){
                    $("#txtPrice").focus();
                         if(itemPriceRegEx.test($("#txtPrice").val())){
                            $("#btnSaveItem").removeAttr('disabled');
                             $("#txtPrice").css('border', '2px solid green');
                             $("#altPrice").text("");
                         }else{
                             $("#txtPrice").css('border', '2px solid red');
                             $("#altPrice").text("Wrong Format! Ex: 12345");
                             return;
                         }
                    }
                }else{
                    $("#txtQuantity").css('border', '2px solid red');
                    $("#altQuantity").text("Wrong Format! Ex: Colombo");
                    return;
                }
             }
          }else{
              $("#txtItemName").css('border', '2px solid red');
              $("#altItemName").text("Wrong Format! Ex: Ruvinda Tharaka");
              return;
          }
       }
    }else{
        $("#txtItemCode").css('border', '2px solid red');
        $("#altItemCode").text("Wrong Format! Ex: C00-001");
        return;
    }
}

/* Load Item Function */
function loadAllItems() {
   $("#itemTable").empty();
   for (var i of itemDB) {
      let row = `<tr><td>${i.getItemCode()}</td><td>${i.getItemName()}</td><td>${i.getItemSize()}</td><td>${i.getUnitPrice()}</td></tr>`;
      $("#itemTable").append(row);
   }
   clearAllItem();
}
/* Save Item Function */
function saveItem(){
   var searchID = $("#txtItemCode").val();
   var response = searchItemIndex(searchID);
   if(response == undefined){
       let itemCode = $("#txtItemCode").val();
       let itemName = $("#txtItemName").val();
       let itemSize = $("#txtQuantity").val();
       let unitPrice = $("#txtPrice").val();

       var itemObject = new ItemDTO();

       itemObject.setItemCode(itemCode);
       itemObject.setItemName(itemName);
       itemObject.setItemSize(itemSize);
       itemObject.setUnitPrice(unitPrice);

       itemDB.push(itemObject);

   }else{
       let itemCode = $("#txtItemCode").val();
       let itemName = $("#txtItemName").val();
       let itemSize = $("#txtQuantity").val();
       let unitPrice = $("#txtPrice").val();

       var itemObject = new ItemDTO();

       itemObject.setItemCode(itemCode);
       itemObject.setItemName(itemName);
       itemObject.setItemSize(itemSize);
       itemObject.setUnitPrice(unitPrice);

       itemDB[response]=itemObject;
   }
   loadAllItems();
}
/* Search ItemIndex Function*/
function searchItemIndex(itemCode){
   for (let i = 0; i < itemDB.length; i++) {
       if (itemDB[i].getItemCode() == itemCode) {
            return i;
       }
   }
}
/* Search Item Function*/
function searchItem(itemCode) {
   for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].getItemCode() == itemCode) {
            return itemDB[i];
        }
   }
}
/* Delete Item Function */
function deleteItem(){
    var deleteId=$("#txtItemCode").val();
    var resp = searchItem(deleteId);
   if(resp){
       itemDB.pop(resp);
       alert("Deleted!");
   }else{
       alert("Couldn't Delete!");
       loadAllItems();
   }
}
/* Clear All Function*/
function clearAllItem(){
   $("#txtItemCode").val('');
   $("#txtItemName").val('');
   $("#txtQuantity").val('');
   $("#txtPrice").val('');

   $("#txtItemCode").css('border','1px solid blue');
   $("#txtItemName").css('border','1px solid blue');
   $("#txtQuantity").css('border','1px solid blue');
   $("#txtPrice").css('border','1px solid blue');
}