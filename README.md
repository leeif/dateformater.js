dateformater
=====
Node.js module to format date , support Chinese Lunar date

Installation
====
Install dateformater in your project
----

* npm install

        npm install dateformater  
* use in project

        var dateformater = require('dateformater');

Format pattern
===
>solar date

* YYYY = long year(2015)  

* YY = short year(15)  

* MMMM = long month(November)  

* MMM = short month(Nov)  

* MM = month(01~12)  
 
* M = month(1~12)  
 
* DD = day(01~30)  
 
* D = day(1~30)  
 
* ddd = day in week in words(Saturday)  

* dd = short day in week in words(Sat)

>lunar date  

* YYY = lunar year in Chinese(庚辰年)

* YY = lunar number long year(2000)

* Y = lunar number short year(00)

* MMMM = lunar month in Chinese(正月)

* MM = lunar number long month(01)

* M = lunar number short month(1)

* DDD = lunar day in Chinese(初一)

* DD = lunar number long day(01)

* D = lunar number short day(1)

>time

* HHH = hours(00~24)

* HH = hours(0~24)

* hhh = hours(00~12)

* hh = hours(0~12)

* mmm = minutes(00~59)

* mm = minutes(0~59)

* sss = minutes(00~59)

* ss = minuts(0~59)



Usage
======

    var dateformater = require('dateformater');
    var date = new Date();
    
    (function(date){
      date.setFullYear(2000);
      date.setMonth(1);
      date.setDate(5);
      date.setHours(2);
      date.setMinutes(3);
      date.setSeconds(4);	
    }(date));
  
format
----

* default

        //YYYY-MM-DD ddd hhh:mmm:sss
        dateformater.format(date);//output=>'2000-02-05 Saturday 02:03:04'

* custom

        dateformater.format(date, 'YY-M-D dd hh:mm:ss')//output=>'00-2-5 Sat 2:3:4'  

lunarFormat
-----

* default

        //YYY MMM DDD hhh:mmm:sss
        dateformater.lunarFormat(date);//output=>'庚辰年 正月 初一 02:03:04'

* custom

        dateformater.lunarFormat(date, 'YY-MM-DD')//2000-01-01

Test
=====
    npm test
#Welcome to improve my project
