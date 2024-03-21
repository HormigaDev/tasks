Array.prototype.paginate = function (pageSize, pageNumber){
    return this.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}
Array.prototype.runPaginate = (pageSize) => {
    let pages = [];
    let page = [];
    let arr = this;  
    for(let i=0; i<arr.length; i++){
      if(page.length === pageSize){
        pages.push(page);
        page = [];
      }
      page.push(arr[i]);
    }
    if(page.length > 0){
      pages.push(page);
    }
    return pages;
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
Date.prototype.toFormat = function(format='yyyy-mm-dd'){
    let date = this;
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let milliseconds = date.getMilliseconds();
    let result = format;
    result = result.replace('yyyy', year);
    result = result.replace('mm', month.toString().padStart(2, '0'));
    result = result.replace('dd', day.toString().padStart(2, '0'));
    result = result.replace('hh', hours.toString().padStart(2, '0'));
    result = result.replace('ii', minutes.toString().padStart(2, '0'));
    result = result.replace('ss', seconds.toString().padStart(2, '0'));
    result = result.replace('ms', milliseconds.toString().padStart(3, '0'));
    return result;
}
// esta función convierte un string en determinado formato a un objeto JSON
String.prototype.toDateInJSON = function(format='yyyy-mm-dd hh:ii:ss'){
    let date = this;
    let day = date.substring(8, 10);
    let month = date.substring(5, 7);
    let year = date.substring(0, 4);
    let hours = date.substring(11, 13);
    let minutes = date.substring(14, 16);
    let seconds = date.substring(17, 19);
    return {
        day: parseInt(day),
        month: parseInt(month),
        year: parseInt(year),
        hours: parseInt(hours),
        minutes: parseInt(minutes),
        seconds: parseInt(seconds)
    }
}

