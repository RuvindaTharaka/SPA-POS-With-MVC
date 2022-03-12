function CustomerDTO(id,name,address,salary){
    var id=id;
    var name=name;
    var address=address;
    var contact=contact;

    this.getCustomerId = function (){
        return this.id;
    }
    this.setCustomerId = function (id) {
        this.id=id;
    }
    this.getCustomerName = function () {
        return this.name;
    }
    this.setCustomerName = function (name) {
        this.name=name;
    }
    this.getCustomerAddress = function () {
        return this.address;
    }
    this.setCustomerAddress = function (address) {
        this.address=address;
    }
    this.getCustomerContact = function () {
        return this.contact;
    }
    this.setCustomerContact = function (contact) {
        this.contact=contact;
    }
}