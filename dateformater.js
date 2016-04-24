var lunar = require('./lib/lunar');

var smallDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

var bigDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
              'Thursday', 'Friday', 'Saturday'];

var smallMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
             'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dev'];

var bigMonth = ['January', 'February', 'March', 'April', 'May', 'June', 
                'July', 'August', 'September', 'October', 'November', 'December'];

var timeMark = ['a.m.', 'p.m.'];

var bigTimeMark = ['AM', 'PM'];

var matcher = [
  
  //YY
  {
    reg : regStrGenerator('Y', 2),
    replacer : function(date) {
      var year = date.getFullYear() + '';
      return '$1' + year.slice(year.length-2, year.length);
    }
  },

  //YYYY
  {
    reg : regStrGenerator('Y', 4),
    replacer : function(date) {
      var year = date.getFullYear();
      return '$1' + year;
    }
  },

  //MMMM
  {
    reg : regStrGenerator('M', 4),
    replacer : function(date) {
      var month = bigMonth[date.getMonth()];
      return '$1' + month;
    }
  },

  //MMM
  {
    reg : regStrGenerator('M', 3),
    replacer : function(date) {
      var month = smallMonth[date.getMonth()];
      return '$1' + month;
    }
  },

  //MM
  {
    reg : regStrGenerator('M', 2),
    replacer : function(date) {
      var month = convert2Big(date.getMonth()+1);
      return '$1' + month;
    }
  },

  //M
  {
    reg : regStrGenerator('M', 1),
    replacer : function(date) {
      var month = date.getMonth()+1;
      return '$1' + month;
    }
  },

  //DD
  {
    reg : regStrGenerator('D', 2),
    replacer : function(date) {
      var day = date.getDate();
      return '$1' + convert2Big(day);
    }
  },

  //D
  {
    reg : regStrGenerator('D', 1),
    replacer : function(date) {
      var day = date.getDate();
      return '$1' + day;
    }
  },

  //ddd
  {
    reg : regStrGenerator('d', 3),
    replacer : function(date) {
      var day = date.getDay();
      return '$1' + bigDay[day];
    }
  },

  //dd
  {
    reg : regStrGenerator('d', 2),
    replacer : function(date) {
      var day = date.getDay();
      return '$1' + smallDay[day];
    }
  }
];

var lunarMatcher = [

  //YYY
  {
    reg : regStrGenerator('Y', 3),
    replacer : function(date) {
      var year = date.lunarDate.gzYear; 
      return '$1' + year;
    }
  },

  //YY
  {
    reg : regStrGenerator('Y', 2),
    replacer : function(date) {
      var year = date.lunarDate.lYear;
      return '$1' + year;
    }
  },
  
  //Y
  {
    reg : regStrGenerator('Y', 1),
    replacer : function(date) {
      var year = date.lunarDate.lYear + ''; 
      return '$1' + year.slice(year.length-2, year.length);
    }
  },

  //MMM
  {
    reg : regStrGenerator('M', 3),
    replacer : function(date) {
      var month = date.lunarDate.IMonthCn;
      return '$1' + month;
    }
  },

  //MM
  {
    reg : regStrGenerator('M', 2),
    replacer : function(date) {
      var month = date.lunarDate.lMonth;
      return '$1' + convert2Big(month);
    }
  },

  //M
  {
    reg : regStrGenerator('M', 1),
    replacer : function(date) {
      var month = date.lunarDate.lMonth;
      return '$1' + month;
    }
  },

  //DDD
  {
    reg : regStrGenerator('D', 3),
    replacer : function(date) {
      var day = date.lunarDate.IDayCn;
      return '$1' + day;
    }
  },

  //DD
  {
    reg : regStrGenerator('D', 2),
    replacer : function(date) {
      var day = date.lunarDate.lDay;
      return '$1' + convert2Big(day);
    }
  },

  //D
  {
    reg : regStrGenerator('D', 1),
    replacer : function(date) {
      var day = date.lunarDate.lDay;
      return '$1' + day;
    }
  }
];

var timeMatcher = [

  //HHH
  {
    reg : regStrGenerator('H', 3),
    replacer : function(date) {
      var hour = convert2Big(date.getHours());
      return '$1' + hour;
    }
  },

  //HH
  {
    reg : regStrGenerator('H', 2),
    replacer : function(date) {
      var hour = date.getHours();
      return '$1' + hour;
    } 
  },

  //hhh
  {
    reg : regStrGenerator('h', 3),
    replacer : function(date) {
      var hour;
      if(date.getHours() > 12) {
        hour = date.getHours() - 12;
      } else {
        hour = date.getHours();
      }
      return '$1' + convert2Big(hour);
    }
  },

  //hh
  {
    reg : regStrGenerator('h', 2),
    replacer : function(date) {
      var hour;
      if(date.getHours() > 12) {
        hour = date.getHours() -12;
      } else {
        hour = date.getHours();
      }
      return '$1' + hour;
    }
  },

  //mmm
  {
    reg : regStrGenerator('m', 3),
    replacer : function(date) {
      var minutes = convert2Big(date.getMinutes());
      return '$1' + minutes;
    }
  },

  //mm
  {
    reg : regStrGenerator('m', 2),
    replacer : function(date) {
      var minutes = date.getMinutes();
      return '$1' + minutes;
    }
  },

  //sss
  {
    reg : regStrGenerator('s', 3),
    replacer : function(date) {
      var second = convert2Big(date.getSeconds());
      return '$1' + second;
    }
  },

  //ss
  {
    reg : regStrGenerator('s', 2),
    replacer : function(date) {
      var second = date.getSeconds();
      return '$1' + second;
    }
  },

  //A
  {
    reg : regStrGenerator('A'),
    replacer : function(date) {
      var flag = timeMark[parseInt(date.getHours()/12)];
      return '$1' + flag;
    }
  },

  //P
  {
    reg : regStrGenerator('P'),
    replacer : function(date) {
      var flag = bigTimeMark[parseInt(date.getHours()/12)];
      return '$1' + flag;
    }
  }
];

/**
 * format the date to the UTC Time
 * @return {[string]} [string of the format time]
 */
function format(date, formatStr){
  var i;
  var m;
  var result = formatStr || 'YYYY-MM-DD ddd HHH:mmm:sss';
  if(typeof date !== Date){
    date = new Date(date);
  }
  for(i in matcher) {
    m = matcher[i];
    result = result.replace(new RegExp(m.reg, 'g'), m.replacer(date));
  }
  for(i in timeMatcher) {
    m = timeMatcher[i];
    result = result.replace(new RegExp(m.reg, 'g'), m.replacer(date));
  }
  return result;
}

/**
 * formate the date to the Chinese Lunar Time
 * @return {[string]} [string of the format time]
 */
function lunarFormat(date, formatStr){
  var m;
  var i;
  var lunarDate = lunar.solar2lunar(date.getFullYear(), date.getMonth()+1, date.getDate());
  date.lunarDate = lunarDate;
  var result = formatStr || 'YYY MMM DDD HHH:mmm:sss';
  if(typeof date !== Date){
    date = new Date(date);
  }
  for(i in lunarMatcher) {
    m = lunarMatcher[i];
  	result = result.replace(new RegExp(m.reg, 'g'), m.replacer(date));
  }
  for(i in timeMatcher) {
    m = timeMatcher[i];
    result = result.replace(new RegExp(m.reg, 'g'), m.replacer(date));
  }
  return result;
}

/**
 * generate the RegExp string
 * like ([^key]|^)key{count}(?!key)
 * @param  {[string]} key
 * @param  {[int]} count 
 * @return {[string]}
 */
function regStrGenerator(key, count){
  var reg;
  if(count) {
    reg = '([^' + key + ']|^)' + 
                  key + '{' + count + '}(?!' + 
                  key + ')';
  } else {
    reg = '([^' + key + ']|^)' + 
                  key + '(?!' + 
                  key + ')';
  }
  return reg;
}

/**
 * change the date info to the big month : 1 => 01,
 * @param  {[int]} month
 * @return {[string]}
 */
function convert2Big(info) {
 var tmp;
 if(typeof info !== 'string'){
  tmp = info + '';
 }
 if(tmp.length === 1) {
 	return '0' + tmp;
 } else if(tmp.length === 2) {
 	return tmp;
 } else {
 	return '00';
 }
}

exports.format = format;
exports.lunarFormat = lunarFormat;