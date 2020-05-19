Element.prototype.getParents= function(){
    var parentsList = []
    var start = this;
    while(start.parentElement){
        parentsList.push(start.parentElement);   
        start=start.parentElement;
    }
    return parentsList;
}