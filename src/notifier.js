function Notifier() {
    this.init.apply(this, arguments);
}

Notifier.prototype = {
    init: function() {
        if (typeof webkitNotifications.PERMISSION_ALLWED === 'undefined') {
            webkitNotifications.PERMISSION_ALLOWED     = 0;
            webkitNotifications.PERMISSION_NOT_ALLOWED = 1;
            webkitNotifications.PERMISSION_DENIED      = 2;
        }
        
        if (typeof webkitNotifications.permissionLevel === 'undefined') {
            webkitNotifications.__defineGetter__('permissionLevel',function(){
                return this.checkPermission();
            });
            webkitNotifications.__defineSetter__('permissionLevel',function(){
            });
        }
    },

    notify: function(icon, title, message) {
        if (webkitNotifications.permissionLevel === webkitNotifications.PERMISSION_ALLOWED) {
            var popup = webkitNotifications.createNotification(icon, title, message);

            popup.ondisplay = function() {
                // timeout時間未決定
                setTimeout(function(){ popup.cancel(); }, 1000);
            };
            popup.show();
        } else {
            return false;
        }
    },

    requestPermission: function() {
        webkitNotifications.requestPermission(function(){
            if (cb) {
                cb(window.webkitNotifications.permissionLevel == webkitNotifications.PERMISSION_ALLOWED);
            }
        });
    },
    
    hassupport: function() {
        if (window.webkitNotifications) {
            return true;
        } else {
            return false;
        }
    }
};