module.exports = () => {
    let date = '';
    let day = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    if(day < 10) day = '0' + day;
    if(month < 10) month = '0' + month;
    date = day + '-' + month + '-' + year;
    return date;
}