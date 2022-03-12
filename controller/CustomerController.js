/* RegEx Conditions */
 const cusIDRegEx = /^(C00-)[0-9]{3,5}$/;
 const cusNameRegEx = /^[A-z ]{1,8}[A-z]{1,8}$/;
 const cusAddressRegEx = /^[A-z]{4,10}$/;
 const cusContactRegEx = /^[0-9]{5}$/;

/* Bind Validation Function */
$('#txtCusID,#txtCusName,#txtCusAddress,#txtCusContact').keyup(function(){
        focusValidCustomer();
        btnValid();
});

/* Bind Save Customer Function */
$("#btnSaveCustomer").click(function(){
     saveCustomer();
});

/* Bind Search Customer Function */
$("#btnSearchCustomer").click(function () {
    var searchID = $("#txtSearchCusID").val();
     if(cusIDRegEx.test(searchID)){
          $("#txtSearchCusID").css('border', '2px solid green');
          $("#altSearchId").text("");
          var response = searchCustomer(searchID);
              if (response) {
                 $("#txtCusID").val(response.id);
                 $("#txtCusName").val(response.name);
                 $("#txtCusAddress").val(response.address);
                 $("#txtCusContact").val(response.contact);
              }else{

                 alert("No Such a Customer");
              }
     }else{
        $("#txtSearchCusID").css('border', '2px solid red');
        $("#altSearchId").text("Wrong Format! Ex: C00-001");
        return;
     }

});

/* Bind Delete Customer Function */
$("#btnDeleteCustomer").click(function () {
    deleteCustomer();
    loadAllCustomers();
    console.log("clear2");
    clearAll();
});


/* Validation Function */
function focusValidCustomer(){
 // if(event.key == "Enter"){
    $("#btnSaveCustomer").attr('disabled','true');
    if(cusIDRegEx.test($("#txtCusID").val())){
       $("#txtCusID").css('border', '2px solid green');
       $("#altCusID").text("");
       if(event.key == "Enter"){
       $("#txtCusName").focus();
          if(cusNameRegEx.test($("#txtCusName").val())){
             $("#txtCusName").css('border', '2px solid green');
             $("#altCusName").text("");
             if(event.key == "Enter"){
             $("#txtCusAddress").focus();
                if(cusAddressRegEx.test($("#txtCusAddress").val())){
                    $("#txtCusAddress").css('border', '2px solid green');
                    $("#altCusAddress").text("");
                    if(event.key == "Enter"){
                    $("#txtCusContact").focus();
                         if(cusContactRegEx.test($("#txtCusContact").val())){
                            $("#btnSaveCustomer").removeAttr('disabled');
                             $("#txtCusContact").css('border', '2px solid green');
                             $("#altCusContact").text("");
                         }else{
                             $("#txtCusContact").css('border', '2px solid red');
                             $("#altCusContact").text("Wrong Format! Ex: 12345");
                             return;
                         }
                    }
                }else{
                    $("#txtCusAddress").css('border', '2px solid red');
                    $("#altCusAddress").text("Wrong Format! Ex: Colombo");
                    return;
                }
             }
          }else{
              $("#txtCusName").css('border', '2px solid red');
              $("#altCusName").text("Wrong Format! Ex: Ruvinda Tharaka");
              return;
          }
       }
    }else{
        $("#txtCusID").css('border', '2px solid red');
        $("#altCusID").text("Wrong Format! Ex: C00-001");
        return;
    }


}

/* Load Customer Function */
function loadAllCustomers() {
   $("#cusTable").empty();
   for (var i of customerDB) {
      let row = `<tr><td>${i.getCustomerId()}</td><td>${i.getCustomerName()}</td><td>${i.getCustomerAddress()}</td><td>${i.getCustomerContact()}</td></tr>`;
      $("#cusTable").append(row);
   }
   console.log("clear1");
   clearAllCustomer();
}

/* Save Customer Function */
function saveCustomer(){
    var searchID = $("#txtCusID").val();
    var response = searchCustomerIndex(searchID);
    if(response == undefined){
          let cusId = $("#txtCusID").val();
          let cusName = $("#txtCusName").val();
          let cusAddress = $("#txtCusAddress").val();
          let cusContact = $("#txtCusContact").val();

          var customerObject = new CustomerDTO(cusId,cusName,cusAddress,cusContact);

          customerObject.setCustomerId(cusId);
          customerObject.setCustomerName(cusName);
          customerObject.setCustomerAddress(cusAddress);
          customerObject.setCustomerContact(cusContact);
          customerDB.push(customerObject);
    }else{
          let cusId = $("#txtCusID").val();
          let cusName = $("#txtCusName").val();
          let cusAddress = $("#txtCusAddress").val();
          let cusContact = $("#txtCusContact").val();

          var customerObject = new CustomerDTO();
          customerObject.setCustomerId(cusId);
          customerObject.setCustomerName(cusName);
          customerObject.setCustomerAddress(cusAddress);
          customerObject.setCustomerContact(cusContact);
          customerDB[response]=customerObject;
    }
    loadAllCustomers();
}

/* Search CustomerIndex Function*/
function searchCustomerIndex(id){
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getCustomerId() == id) {
           return i;
        }
    }
}

/* Search Customer Function*/
function searchCustomer(id) {
    for (let i = 0; i < customerDB.length; i++) {
         if (customerDB[i].id == id) {
            return customerDB[i];
        }
    }
}

/* Delete Customer Function */
function deleteCustomer(){
   var deleteId=$("#txtCusID").val();
   var resp = searchCustomer(deleteId);
   if(resp){
        customerDB.pop(resp);
        alert("Deleted!");
   }else{
      loadAllCustomers();
      alert("Couldn't Deleted!");
   }
}

/* Clear All Function*/
function clearAllCustomer(){
     $("#txtCusID").val('');
     $("#txtCusName").val('');
     $("#txtCusAddress").val('');
     $("#txtCusContact").val('');

      $("#txtCusID").css('border','1px solid blue');
      $("#txtCusName").css('border','1px solid blue');
      $("#txtCusAddress").css('border','1px solid blue');
      $("#txtCusContact").css('border','1px solid blue');
}
function btnValid(){
    $("#txtCusID").keyup(function(){
        if($("#txtCusID").val() == 'C00-001'){
           $("#btnSaveCustomer").attr('disabled','true');

        }
    });


}
