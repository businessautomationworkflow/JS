var loghelper = {};
/**
* Adds mandatory prefixes to custom message. It prepends triple-angle-bracket marker ('>>>') then
* caller application acronym and then caller service (or process-level inline JS script) 
 * where this JS runs inside.
* Example. When application 'ABC' logs from 'Heavy Crunching' service a message 'some message',
* then following string is written to log file: '>>> [ABC][Heavy Crunching]: some message'
* 
 * @param {String} message target message
* @returns message with mandatory prefixes.
*/
loghelper._prependMessage = function (message) {
    var prefixes = [
        tw.system.model.processApp.acronym,
        loghelper._getCaller(),
        loghelper._getContext()
    ];
    var template = ">>> ";
    for (var i = 0; i < prefixes.length; i++) {
        var pref = prefixes[i];
        if (pref) template += "[" + pref + "]";
    }
    template += ": {0}";
    return loghelper.format(template, message);
}
 
 
/**
* Retrieves loghelper function caller name.
* 
 * @returns Process step or service name.
*/
loghelper._getCaller = function () {
    var caller = tw.system.step && tw.system.step.name; //called directly from process w/o service
    if (!caller) caller = tw.system.serviceFlow && tw.system.serviceFlow.name; //available from BPM/BAW 18.0
    if (!caller) { //fallback to BPM8.6 and earlier
        var ctx = Packages.org.mozilla.javascript.Context.getCurrentContext();
        caller = ctx.getServiceName();
    }
    if (!caller) caller = "?"; //puzzled:)
    return caller;
}
 
/**
* Retrieves runtime context details like process instance ID, task ID and user ID.
* Retrieved data is formatted using "UWVLog_contextTemplate" environment variable replacing
* specific placeholders: {pid}, {tid} or {uid}. If template string is empty returned context is empty.
*
* @returns Runtime context data formatted as string.
*/
loghelper._getContext = function () {
    var now = Date.now();
    if (now > loghelper._getContext.templateValidBefore) {
        // accessing tw.env... slows down JS processing 5-times (!!!), caching for speedup
        loghelper._getContext.template = tw.env.UWVLog_contextTemplate;
        loghelper._getContext.templateValidBefore = now + 10 * 1000; //cached for 10 sec
    }
    var template = loghelper._getContext.template;
    if (template) {
        var replacements = [
			{
                key: "{pid}",
                value: tw.system.currentProcessInstanceID
            },
            {
                key: "{tid}",
                value: (!!tw.system.currentTask ? tw.system.currentTask.id : null)
            },
            {
                key: "{uid}",
                value: tw.system.user_loginName
            }
        ];
        for (var i = 0; i < replacements.length; i++) {
            var rep = replacements[i];
            template = template.replace(rep.key, rep.value);
        }
    }
    return template;
}
loghelper._getContext.templateValidBefore = 0;
loghelper._getContext.template = null;
 
/** 
 * This will log a message in info level if info is enabled on websphere.
* @function info
* @memberOf loghelper
* @param {String|Object} message - A message to be formatted and logged.
* @param  {...Object=}  params - message formatting parameters, see {@link loghelper.format}.
*/
loghelper.info = function (message) {
    if (log.infoEnabled) {
        var msg = this.format.apply(message, arguments);
        msg = this._prependMessage(msg);
        log.info("INFO " + msg);
    }
}

loghelper.performance = function (message) {
    if (log.infoEnabled) {
        var msg = this.format.apply(message, arguments);
        msg = this._prependMessage(msg);
        log.info("PERFORMANCE - INFO " + msg);
    }
}
 
/** 
 * This will log a message in debug level if debug is enabled on websphere.
* @function debug
* @memberOf loghelper
* @param {String|Object} message - A message to be formatted and logged.
* @param  {...Object=}  params - message formatting parameters, see {@link loghelper.format}.
*/
loghelper.debug = function (message) {
    if (log.debugEnabled) {
        var msg = this.format.apply(message, arguments);
        msg = this._prependMessage(msg);
        log.debug("DEBUG " + msg);
    }
}
 
/** 
 * This will log a message in error level.
* @function error
* @memberOf loghelper
* @param {String|Object} message - A message to be formatted and logged.
* @param  {...Object=}  params - message formatting parameters, see {@link loghelper.format}.
*/
loghelper.error = function (message) {
    var msg = this.format.apply(message, arguments);
    msg = this._prependMessage(msg);
    log.error("ERROR " + msg);
}
 
/** 
 * This will log a message in warn level.
* @function warn
* @memberOf loghelper
* @param {String|Object} message - A message to be formatted and logged.
* @param  {...Object=}  params - message formatting parameters, see {@link loghelper.format}.
*/
loghelper.warn = function (message) {
    var msg = this.format.apply(message, arguments);
    msg = this._prependMessage(msg);
    log.warn("WARN " + msg);
}
 
/**
* Formats message with extra parameters.
* Curly-braced placeholders in message are replaced with further arguments
* of function. Unmatched placeholders are filled with 'undefined'.
* <p>
* If message has numeric placeholders like <code>{0}</code>, they are replaced 
 * with arguments where first argument after msg has zero index etc. If message has 
 * numeric placeholders array can be provided as the only 2nd parameter, indexing of 
 * placeholder is same as in array. 
 * <p>
* If message has named placeholders like <code>{somename}</code>, the 2nd argument 
 * must be object that provides values of properties with same names as placeholders. 
 * Named placeholder can be also navigation path (separated with dots) like 
 * <code>{address.city}</code>. Examples:
* <pre>
* loghelper.format("Say {0}-{0}-{1}",  "hip", "hurray");  //-> "Say hip-hip-hurray"
* loghelper.format("A {0} has value {1}",  ["foo", null]);  //-> "A foo has value null"
* loghelper.format("{a}-{c}",  {b:"two", a:"one"});  //-> "one-{c}"
* loghelper.format("{user.name} logged",  {user: {name:"user", active:true}});  //-> "user logged"
* </pre> 
 *
* @param  {String} message    - message template with placeholders in curly braces.
* @param  {...Object=} params - any number of extra arguments to fill in template.
* @return {String}            - formatted message with replaced placeholders.
*/
loghelper.format = function (message) {
    if (arguments.length == 1) {
        // no processing needed, pass thru
        return message;
    }
    // optional args after msg
    var args = Array.prototype.slice.call(arguments, 1);
    var arg0type = Object.prototype.toString.call(args[0]);
    if (arg0type == '[object Array]') {
        args = args[0];
    }
    // Server side JS sucks, null works as not-null Object (!!!)
    // in browser: Object.prototype.toString.call(null) == "[object Null]"
    // while on server: Object.prototype.toString.call(null) == "[object Object]"
    if (args[0] && (arg0type == '[object Object]' || arg0type == '[object TWObject]')) {
        // the only parameter is non-array object, then mapping named placeholders
        return message.replace(/{([^}]+)}/g, function (match, name) {
            return loghelper._navigateObject(args[0], name);
        }.bind(this));
    } else {
        // otherwise maping positional placeholders e.g. {0}, {1}
        return message.replace(/{(\d+)}/g, function (match, number) {
            return args[number];
        });
    }
}
 
/**
* Navigates object to get nested attribute value, or subobject, using dot-notation.
* Other JS navigation syntax (square brackets etc) is not supported.
* Undefined value is returned for non-existent path or wrong syntax.
* Example: 
 * <pre>
* var o = {cat: {name:"fluffy", age:3}, lifes:7};
* loghelper._navigateObject(o, "cat.name") //-> "fluffy"
* loghelper._navigateObject(o, "lifes") //-> 7
* </pre> 
 *
* @param {Object} obj object to browse
* @param {String} path dots-separated path to nested attribute in object.
*/
loghelper._navigateObject = function (obj, path) {
    var steps = path.split(".");
    do {
        var step = steps.shift();
        obj = obj[step];
    } while (steps.length && obj);
    return obj;
}