var lunar = require('./lib/lunar');

var day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

var matcher = {
  
  //YY
  //return short year : 2015=>15
  '\\bY{2}\\b' : function(date) {
  	var year = date.getFullYear() + '';
  	return year.slice(year.length-2, year.length);
  },

  //YYYY
  //return long year : 2015
  '\\bY{4}\\b' : function(date) {
    return date.getFullYear();
  },

  //MM
  //return big month : 01
  '\\bM{2}\\b' : function(date) {
  	return convert2BigMonth(date.getMonth()+1);
  },
  
  //M
  //return small month : 1
  '\\bM{1}\\b' : function(date) {
    return date.getMonth()+1;
  },

  '\\bd{3}\\b' : function(date) {
  	var i = date.getDay();
  	return day[i];
  },
  
  //DD
  //return date of the month (1~31)
  'D{2}' : function(date) {
    return date.getDate();
  },
  'H{2}' : function(date) {
  	return date.getHours();
  },
  'm{2}' : function(date) {
  	return date.getMinutes();
  },
  's{2}' : function(date) {
    return date.getSeconds();
  }
};

var lunarMatcher = {
	
  '\\bY{2}\\b' : function(date) {
    return date.lunarDate.lYear;
  },

  '\\bY{1}\\b' : function(date) {
    return date.lunarDate.gzYear;
  },

  '\\bM{2}\\b' : function(date) {
    return date.lunarDate.lmonth;
  }, 

  '\\bM{1}\\b' : function(date) {
    return date.lunarDate.IMonthCn;
  }, 

  '\\bD{2}\\b' : function(date) {
    return date.lunarDate.lDay;
  }, 

  '\\bD{1}\\b' : function(date) {
    return date.lunarDate.IDayCn;
  }, 

  'H{2}' : function(date) {
    return date.getHours();
  },

  'm{2}' : function(date) {
    return date.getMinutes();
   },

  's{2}' : function(date) {
    return date.getSeconds();
  }

};



/**
 * format the date to the UTC Time
 * @return {[string]} [string of the format time]
 */
function solarFormat(date, formatStr){
  var result = formatStr || 'YYYY-MM-DD ddd HH:mm:ss';
  for(var m in matcher) {
  	result = result.replace(new RegExp(m), matcher[m](date));
  }
  return result;
}

/**
 * formate the date to the Chinese Lunar Time
 * @return {[string]} [string of the format time]
 */
function lunarFormat(date, formatStr){
  var lunarDate = lunar.solar2lunar(date.getFullYear(), date.getMonth()+1, date.getDate());
  date.lunarDate = lunarDate;
  var result = formatStr || 'Y M D HH:mm:ss';
  for(var m in lunarMatcher) {
  	result = result.replace(new RegExp(m), lunarMatcher[m](date));
  }
  return result;
}

//change the month to the big month : 1 => 01
function convert2BigMonth(month){
 var tmp;
 if(typeof month !== 'string'){
  tmp = month + '';
 }
 if(tmp.length === 1) {
 	return '0' + tmp;
 } else if(tmp.length === 2) {
 	return tmp;
 } else {
 	return '00';
 }
}

exports.solarFormat = solarFormat;
exports.lunarFormat = lunarFormat;
