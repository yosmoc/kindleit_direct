var BASE_URL = 'http://fivefilters.org/kindle-it/send.php?context=send';
var notifier = new Notifier();

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
        success: function(msg) {
            alert(msg);
            var icon        = chrome.extension.getURL('icon128.png');
            var header      = 'Success';
            var description = 'Success to send kindle using kindleit';
            var timeout_ms  = 2000;
            notifier.notify(icon, header, description, timeout_ms);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
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

chrome.browserAction.onClicked.addListener(function(tab) {
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
});

// contextMenus
// page
chrome.contextMenus.create({
    "title"    : 'Post this page to Kindle',
    "contexts" : ['page'],
    "onclick"  : function(info, tab) {
        if (localStorage.getItem('email')) {
            var email = localStorage.getItem('email');
            post_kindleit(info.pageUrl, email);
        } else {
            chrome.tabs.create({
                "url": chrome.extension.getURL("options.html")
            });
        }
    }
});

// link
chrome.contextMenus.create({
    "title"    : 'Post this link to Kindle',
    "contexts" : ['link'],
    "onclick"  : function(info, tab) {
        if (localStorage.getItem('email')) {
            var email = localStorage.getItem('email');
            post_kindleit(info.linkUrl, email);
        } else {
            chrome.tabs.create({
                "url": chrome.extension.getURL("options.html")
            });
        }
    }
});

