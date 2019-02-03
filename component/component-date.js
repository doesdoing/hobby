function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
module.exports = (a) => {
    var date = new Date();
    var [year, month, day, hour, minute, second] = [date.getFullYear(), checkTime(date.getMonth() + 1), checkTime(date.getDate()), checkTime(date.getHours()), checkTime(date.getMinutes()), checkTime(date.getSeconds())];
    var DAY = year + '-' + month + '-' + day;
    var HOUR = hour + ':' + minute + ':' + second;
    if (a) {
        return DAY;
    } else {
        return DAY + ' ' + HOUR;
    }
};
