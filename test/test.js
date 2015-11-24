var assert = require('assert');
var dateformater = require('../dateformater');

var date = new Date();

(function(date){
  date.setFullYear(2000);
  date.setMonth(1);
  date.setDate(5);
  date.setHours(2);
  date.setMinutes(3);
  date.setSeconds(4);	
}(date));

assert.equal(dateformater.format(date), '2000-02-05 Saturday 02:03:04');

assert.equal(dateformater.lunarFormat(date), '庚辰年 正月 初一 02:03:04');

assert.equal(dateformater.format(date, 'YYYY YY MMMM MMM MM M DD D ddd dd HHH HH hhh hh mmm mm sss ss A P'), 
	'2000 00 February Feb 02 2 05 5 Saturday Sat 02 2 02 2 03 3 04 4 a.m. AM');

assert.equal(dateformater.lunarFormat(date, 'YYY YY Y MMM MM M DDD DD D hhh hh mmm mm sss ss A P'), 
	'庚辰年 2000 00 正月 01 1 初一 01 1 02 2 03 3 04 4 a.m. AM');
