var BASE_URL = 'http://fivefilters.org/kindle-it/send.php?context=send';

var notifier = {
    notify: function(icon, title, message, timeout_ms) {
        var notification = new Notification(title, {body: message, icon: icon});
        notification.onshow = function() {
            setTimeout(function(){notification.close();}, timeout_ms);
        };
    }
};

var post_kindleit = function(url, email) {
    var icon        = chrome.extension.getURL('icon128.png');
    var header      = 'Send';
    var description = 'Send kindle by using kindleit';
    var timeout_ms  = 1500;
    notifier.notify(icon, header, description, timeout_ms);

    var page_url = url;
    var email_id = email.split('@')[0];
    var email_domain = email.split('@')[1];
    var page_url_and_email_address = {
        url: page_url,
        email: email_id,
        domain: _domain_number(email_domain)
    };

    $.ajax({
        type: "POST",
        url: BASE_URL,
        data: page_url_and_email_address,
        success: function(data, textStatus, xhr) {
            var icon        = chrome.extension.getURL('icon128.png');
            var header      = 'Success';
            var description = 'Success to send kindle using kindleit';
            var timeout_ms  = 2000;
            notifier.notify(icon, header, description, timeout_ms);
        },
        error: function(xhr, textStatus, errorThrown){
            var icon        = chrome.extension.getURL('icon128.png');
            var header      = 'Failed';
            var description = 'Fail to send kindle using kindleit. Try later.';
            var timeout_ms  = 4000;
            notifier.notify(icon, header, description, timeout_ms);
        }
    });
};

var _domain_number = function(domain) {
    if (domain === 'free.kindle.com') {
        return 1;
    } else if (domain === 'kindle.com') {
        return 2;
    };
};

var _alert_is_not_http = function(page_or_link) {
    var icon        = chrome.extension.getURL('icon128.png');
    var header      = 'Failed';
    var description = 'This ' + page_or_link + ' is not http:// or https://';
    var timeout_ms  = 4000;
    notifier.notify(icon, header, description, timeout_ms);
};

chrome.browserAction.onClicked.addListener(function(tab) {
    if ((tab.url.indexOf('http:') == 0 || tab.url.indexOf('https:') == 0) &&
        tab.url.indexOf('fivefilters.org/kindle-it/send.php'.toLowerCase()) == -1) {
        if (localStorage.getItem('email')) {
            // post
            var email = localStorage.getItem('email');
            post_kindleit(tab.url, email);
        } else {
            // go to email setting page
            chrome.tabs.create({
                "url": chrome.extension.getURL("options.html")
            });
        }
    } else { // not http or https
        _alert_is_not_http('page');
    }
});

// contextMenus
// page
chrome.contextMenus.create({
    "title"    : 'Post this page to Kindle',
    "contexts" : ['page'],
    "onclick"  : function(info, tab) {
        if ((info.pageUrl.indexOf('http:') == 0 || info.pageUrl.indexOf('https:') == 0) &&
            info.pageUrl.indexOf('fivefilters.org/kindle-it/send.php'.toLowerCase()) == -1) {
            if (localStorage.getItem('email')) {
                var email = localStorage.getItem('email');
                post_kindleit(info.pageUrl, email);
            } else {
                chrome.tabs.create({
                    "url": chrome.extension.getURL("options.html")
                });
            }
        } else {
            _alert_is_not_http('page');
        }
    }
});

// link
chrome.contextMenus.create({
    "title"    : 'Post this link to Kindle',
    "contexts" : ['link'],
    "onclick"  : function(info, tab) {
        if ((info.linkUrl.indexOf('http:') == 0 || info.linkUrl.indexOf('https:') == 0) &&
            info.linkUrl.indexOf('fivefilters.org/kindle-it/send.php'.toLowerCase()) == -1) {
            if (localStorage.getItem('email')) {
                var email = localStorage.getItem('email');
                post_kindleit(info.linkUrl, email);
            } else {
                chrome.tabs.create({
                    "url": chrome.extension.getURL("options.html")
                });
            }
        } else {
            _alert_is_not_http('link');
        }
    }
});