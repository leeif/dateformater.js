var assert = require('assert');
var dateformater = require('../dateformater');

var date = new Date();

(function(date){
  date.setFullYear(2000);
  date.setMonth(1);
  date.setDate(5);
  date.setHours(12);
  date.setMinutes(13);
  date.setSeconds(14);	
}(date));

assert.equal(dateformater.solarFormat(date), '2000-02-5 Sat 12:13:14');
assert.equal(dateformater.lunarFormat(date), '庚辰年 正月 初一 12:13:14');
