(function () {
    var initializing = false,
        fnTest = /xyz/.test(function () {
            xyz;
        }) ? /\b_super\b/ : /.*/;

    this.Class = function () {
    };
    Class.extend = function (prop) {
        var _super = this.prototype;
        initializing = true;
        var prototype = new this();
        initializing = false;

        for (var name in prop) {
            prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" &&
            fnTest.test(prop[name]) ? (function (name, fn) {
                return function () {
                    var tmp = this._super;
                    this._super = _super[name];
                    var ret = fn.apply(this, arguments);
                    this._super = tmp;
                    return ret;
                };
            })(name, prop[name]) : prop[name];
        }

        function Class() {

            if (!initializing && this.init) this.init.apply(this, arguments);
        }

        Class.prototype = prototype;

        Class.prototype.constructor = Class;

        Class.extend = arguments.callee;

        return Class;
    };
})();
var Utils = function ($) {
    var mainClass = Class.extend({
        init: function () {
            Date.prototype.toLocaleString = function() {
                return this.getFullYear() + "/" + (this.getMonth() + 1) + "/" + this.getDate() + " " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
            };
        },
        GetTopWindow: function () {
            var topWindow = window;
            try {
                while ((topWindow.frameElement) && (topWindow.frameElement.name != "banner")) {
                    topWindow = topWindow.parent;
                }
            } catch (e) {
                throw e;
            }

            return topWindow.parent;
        },
        objectClone: function (sObj) {
            if (typeof (sObj) !== "object") {
                return sObj;
            }

            var s = {};
            if (Object.prototype.toString.call(sObj) === '[object Array]') {
                s = [];
            }
            for (var i in sObj) {
                s[i] = this.objectClone(sObj[i]);
            }
            return s;
        }
    });
    return new mainClass();
}(jQuery);
var top = Utils.GetTopWindow();
