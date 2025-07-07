var datehelper = {};

/**
 * Date and time utility functions.
 * @module date_helpers
 */

/**
 * Converts a Unix timestamp (in seconds) to a JavaScript Date object.
 * @param {number} unixSeconds - The Unix timestamp in seconds.
 * @returns {Date} The corresponding JavaScript Date object.
 */
datehelper.unixToJsDate = function(unixSeconds) {
  return new Date(unixSeconds * 1000);
};

/**
 * Converts a JavaScript Date object to a Unix timestamp (in seconds).
 * @param {Date} date - The JavaScript Date object.
 * @returns {number} The Unix timestamp in seconds.
 */
datehelper.jsDateToUnix = function(date) {
  if (!(date instanceof Date)) return NaN;
    return Math.floor(date.getTime() / 1000);
};

/**
 * Formats a date to a YYYY-MM-DD string.
 * @param {Date|string|number} input - The date input.
 * @returns {string} The formatted date string.
 */
datehelper.formatDate = function(input) {
  const date = new Date(input);
    if (isNaN(date.getTime())) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/**
 * Checks if dateA is before dateB.
 * @param {Date|string|number} dateA
 * @param {Date|string|number} dateB
 * @returns {boolean} True if dateA is before dateB.
 */
datehelper.isBefore = function(dateA, dateB) {
  return new Date(dateA).getTime() < new Date(dateB).getTime();
};

/**
 * Checks if dateA is after dateB.
 * @param {Date|string|number} dateA
 * @param {Date|string|number} dateB
 * @returns {boolean} True if dateA is after dateB.
 */
datehelper.isAfter = function(dateA, dateB) {
  return new Date(dateA).getTime() > new Date(dateB).getTime();
};

/**
* Convert a native date to a object TWDate. 
* @returns {date} A TWDate with the same timestamp as the entry.
* @param {date} nativeDate - The number of requested words.
* @function convertNativeDateToTWDate
*/
datehelper.convertNativeDateToTWDate = function(nativeDate) {
  // yyyy-MM-dd hh:mm:ss.S
    var result;
    if ( nativeDate instanceof Date ) { 
      var yyyy = nativeDate.getUTCFullYear(); 
      var MM = _numberTo2DigitString(nativeDate.getUTCMonth());
      var dd = _numberTo2DigitString(nativeDate.getUTCDate());
      var hh = _numberTo2DigitString(nativeDate.getUTCHours());
      var mm = _numberTo2DigitString(nativeDate.getUTCMinutes());
      var ss = _numberTo2DigitString(nativeDate.getUTCSeconds());
      var s = _numberTo3DigitString(nativeDate.getUTCMilliseconds());
      var dateString = yyyy + "-" + MM + "-" + dd + " " + hh + ":" + mm + ":" + ss + "." + s;
      result = new TWDate(dateString);
    } else if ( nativeDate instanceof TWDate ) {
      result = nativeDate;
    }
    return result;
};

/**
* Adds a given amount of days into a given date.
* @returns {date} A date in where the amount of days were added.
* @param {date} theDate - The date where the days will be added.
* @param {integer} days - Amount of days to add to a date.
* @function addXDays
*/
datehelper.addXDays = function(theDate, days) {
  var one_day_ms = 86400000;
    var theDate_ms = theDate.toNativeDate().getTime() + ( one_day_ms * days );
    var result = new Date(theDate_ms);
    return result;
};

/**
* Subtract a given amount of days from a given date.
* @returns {date} A date in where the amount of days were subtracted.
* @param {date} theDate - The date where the days will be subtracted.
* @param {integer} days - Amount of days to add to a date.
* @function subtractXDays
*/
datehelper.subtractXDays = function(theDate, days) {
  var one_day_ms = 86400000;
    var theDate_ms = theDate.toNativeDate().getTime() - ( one_day_ms * days );
    var result = new Date(theDate_ms);
    return result;
};

/**
* Checks if the given date is smaller than the time it is when the function is executed plus the amount of days given as input.
* This makes sure that the date we have is smaller than 'days' in the future. This function is precise to milliseconds.
* @returns {boolean} Returns true if the date given as input is sooner than the time this function ran plus the given amount of days as input.
* @param {date} theDate - The date which will be compared to the future date.
* @param {integer} days - Amount of days in the future to where we will compare our date.
* @function isLessNowPlusXDays
*/
datehelper.isLessNowPlusXDays = function(theDate, days) {
  var one_day_ms = 86400000;
    var minDate = new TWDate();
    var minDate_ms = minDate.toNativeDate().getTime() + ( one_day_ms * days );
    var theDate_ms = theDate.toNativeDate().getTime();
    return theDate_ms < minDate_ms;
};

/**
* Checks if the given date is smaller or equal than the time it is when the function is executed plus the amount of days given as input.
* This makes sure that the date we have is smaller or equal than 'days' in the future. This function is precise to milliseconds.
* @returns {boolean} Returns true if the date given as input is sooner *or equal* than the time this function ran plus the given amount of days as input.
* @param {date} theDate - The date which will be compared to the future date.
* @param {integer} days - Amount of days in the future to where we will compare our date.
* @function isLessEqNowPlusXDays
*/
datehelper.isLessEqNowPlusXDays = function(theDate, days) {
  var one_day_ms = 86400000;
    var minDate = new TWDate();
    var minDate_ms = minDate.toNativeDate().getTime() + ( one_day_ms * days );
    var theDate_ms = theDate.toNativeDate().getTime();
    return theDate_ms <= minDate_ms;
};

/**
* Checks if the given date is bigger than the time it is when the function is executed plus the amount of days given as input.
* This makes sure that the date we have is bigger than 'days' in the future. This function is precise to milliseconds.
* @returns {boolean} Returns true if the date given as input is later than the time this function ran plus the given amount of days as input.
* @param {date} theDate - The date which will be compared to the future date.
* @param {integer} days - Amount of days in the future to where we will compare our date.
* @function isMoreNowPlusXDays
*/
datehelper.isMoreNowPlusXDays = function(theDate, days) {
  var one_day_ms = 86400000;
    var maxDate = new TWDate();
    var maxDate_ms = maxDate.toNativeDate().getTime() + ( one_day_ms * days );
    var theDate_ms = theDate.toNativeDate().getTime();
    return theDate_ms > maxDate_ms;
};

/**
* Checks if the given date is bigger or equal than the time it is when the function is executed plus the amount of days given as input.
* This makes sure that the date we have is bigger or equal than 'days' in the future. This function is precise to milliseconds.
* @returns {boolean} Returns true if the date given as input is later or equal than the time this function ran plus the given amount of days as input.
* @param {date} theDate - The date which will be compared to the future date.
* @param {integer} days - Amount of days in the future to where we will compare our date.
* @function isMoreEqNowPlusXDays
*/
datehelper.isMoreEqNowPlusXDays = function(theDate, days) {
  var one_day_ms = 86400000;
    var maxDate = new TWDate();
    var maxDate_ms = maxDate.toNativeDate().getTime() + ( one_day_ms * days );
    var theDate_ms = theDate.toNativeDate().getTime();
    return theDate_ms >= maxDate_ms;
};

/**
* Checks if the given date is equal than the time it is when the function is executed plus the amount of days given as input.
* This makes sure that the date we have is equal than 'days' in the future. This function is precise to milliseconds.
* @returns {boolean} Returns true if the date given as input is equal than the time this function ran plus the given amount of days as input.
* @param {date} theDate - The date which will be compared to the future date.
* @param {integer} days - Amount of days in the future to where we will compare our date.
* @function isEqNowPlusXDays
*/
datehelper.isEqNowPlusXDays = function(theDate, days) {
  var one_day_ms = 86400000;
    var maxDate = new TWDate();
    var maxDate_ms = maxDate.toNativeDate().getTime() + ( one_day_ms * days );
    var theDate_ms = theDate.toNativeDate().getTime();
    return theDate_ms == maxDate_ms;
};

/**
* Checks if the amount of time between two dates is less that the limit we define. This function ignores time, making calculations only regarding days.
* @returns {boolean} Returns true if the amount of time between the two dates is less that our limit of days.
* @param {date} dateEarliest - The date which is newest.
* @param {date} dateOldest - The date which is oldest.
* @param {integer} limitDays - Number of days which the two dates can't be bigger.
* @function checkMaxDaysBetweenDates
*/
datehelper.checkMaxDaysBetweenDates = function(dateEarliest, dateOldest, limitDays) {
  if (!basicValueCheckDate(dateEarliest) || !basicValueCheckDate(dateOldest)) {
          return false;
      }
      
      dateEarliest.setHours(0,0,0,0);
      dateOldest.setHours(0,0,0,0);
      var one_day_ms = 86400000;
      
      var diff = one_day_ms * Number(limitDays);
      var calcDiff = dateOldest.toNativeDate().getTime() - dateEarliest.toNativeDate().getTime()
      
      if (calcDiff > diff) {
          return true;
      } else {
          return false;
      }
};

/**
* Checks if 'dateA' is equal to 'dateB'. This function truncates the hours, minutes, seconds and miliseconds of both dates and then compares both dates. 
* @function compareDatesEqual
* @param {date} dateA - The first date
* @param {date} dateB - The second date
* @returns {boolean} True if 'dateA' equal to 'dateB'
* @global
*/
datehelper.compareDatesEqual = function(dateA, dateB) {
  dateA.setHours(0);
      dateA.setMinutes(0);
      dateA.setSeconds(0);
      dateA.setMilliseconds(0);
  
      dateB.setHours(0);
      dateB.setMinutes(0);
      dateB.setSeconds(0);
      dateB.setMilliseconds(0);
      
      var dateOne = dateA.toNativeDate().getTime();
      var dateTwo = dateB.toNativeDate().getTime();
      
      return dateOne == dateTwo;
};

/**
* Checks if 'dateA' is later than 'dateB'. This function takes into consideration the full timestamp.
* @function isDateALaterThanDateB
* @param {date} dateA - The date to be checked.
* @param {date} dateB - The date which is the reference to see if 'dateA' is late or not.
* @returns {boolean} True if 'dateA' is later than 'dateB'
* @global
*/
datehelper.isDateALaterThanDateB = function(dateA, dateB) {
  var maxDate = dateB;
    var maxDate_ms = maxDate.toNativeDate().getTime();
    var theDate_ms = dateA.toNativeDate().getTime();
    return theDate_ms > maxDate_ms;
};

/**
* Checks if 'dateA' is later than 'dateB'. This function truncates the hours, minutes, seconds and miliseconds of both dates and then calls {@link isDateALaterThanDateB} to compare both dates. 
* @function isDateALaterThanDateB
* @param {date} dateA - The date to be checked.
* @param {date} dateB - The date which is the reference to see if 'dateA' is late or not.
* @returns {boolean} True if 'dateA' is later than 'dateB'
* @global
*/
datehelper.isDateALaterThanDateBIgnoreTime = function(dateA, dateB) {
  dateA.setHours(0);
      dateA.setMinutes(0);
      dateA.setSeconds(0);
      dateA.setMilliseconds(0);
  
      dateB.setHours(0);
      dateB.setMinutes(0);
      dateB.setSeconds(0);
      dateB.setMilliseconds(0);
    
    return isDateALaterThanDateB(dateA, dateB);
};

/**
* Calculates the difference of days between two dates. Ignores time.
* @returns {integer} Returns the amount of days that separate the two dates.
* @param {date} dateA - The first date to compare, must be the bigger date or else the result will be negative.
* @param {date} dateB - The second date to compare, must be the smaller date or else the result will be negative.
* @function dayDifference
*/
datehelper.dayDifference = function(dateTimeA, dateTimeB) {
  var dateA = new Date(dateTimeA);
                 var dateB = new Date(dateTimeB);
                 
                 dateA.setHours(0,0,0,0);
      dateB.setHours(0,0,0,0);
      
      var dateA_ms = dateA.getTime();
      var dateB_ms = dateB.getTime();
      
      var date_diff_ms = dateA_ms - dateB_ms;
      var one_day_ms = 86400000;
      return Math.floor(date_diff_ms/one_day_ms);
};

/**
* Calculates the next business date after a given amount of days to wait.
* @returns {date} Returns what is the business day we need according to the business calendar and the amount of days in the future we want.
* @param {date} originalDate - The original date where we will base our calculations.
* @param {integer} daysToAdd - Amount of days in the future we need.
* @param {string} timeScheduleName - The timeSchedule is the business hours our application uses.
* @param {string} holidayScheduleName - The days of the calendar that are not business days.
* @param {string} timeZoneName - The timezone where the application is working.
* @function calculateBusinessDate
*/
datehelper.calculateBusinessDate = function(originalDate,daysToAdd,timeScheduleName,holidayScheduleName,timeZoneName) {
  var workSchedule = new tw.object.TWWorkSchedule();
  
                 var timeSchedule = null;
                 if ( timeScheduleName ) {
                                    timeSchedule = tw.system.findTimeScheduleByName(timeScheduleName);
                 } 
                 if ( !timeSchedule ) {
                     timeSchedule = tw.system.findTimeScheduleByName(String(tw.env.UWVUtils_Default_TimeSchedule));
                 }
  
                 var holidaySchedule = null;
                 if ( holidayScheduleName ) {
                     holidaySchedule = tw.system.findHolidayScheduleByName(holidayScheduleName);
                 } 
                 if ( !holidaySchedule ) {
                     holidaySchedule = tw.system.defaultHolidaySchedule;
                 }
  
                 var timeZone = null;
                 if ( timeZoneName ) {
                     timeZone = timeZoneName;    
                 }
                 if ( !timeZone ) {
                     timeZone = String(tw.env.UWVUtils_Default_TimeZone);
                 }
  
                 workSchedule.timeSchedule = timeSchedule;
                 workSchedule.holidaySchedule = holidaySchedule;
                 workSchedule.timeZone = timeZone;
  
                 return calculatedDate = tw.system.calculateBusinessDate(originalDate, daysToAdd, "Day", workSchedule);
};