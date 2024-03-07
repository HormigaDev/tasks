Array.prototype.paginate = function (pageSize, pageNumber){
    return this.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}
Array.prototype.pages = function (pageSize){
    return Math.ceil(this.length / pageSize);
}
Array.prototype.clone = function(rounds){
    let clonedArray = [];
    for(let i=0; i<rounds; i++){
      clonedArray = clonedArray.concat(this);
    }
    return clonedArray;
}

String.prototype.toLength = function(length){
    if(this.length > length){
        return this.substring(0, length) + '...';
    }
    return this;
}