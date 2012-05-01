var BASE_URL = 'http://fivefilters.org/kindle-it/send.php?context=send';
var notifier = new Notifier();

var post_kindleit = function(url, email) {
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
            // TODO: 成功した時のアイコンを作成する
            var icon        = chrome.extension.getURL('icon128.png');
            var header      = 'Success';
            var description = 'Success to send kindle using kindleit';
            notifier.notify(icon, header, description);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
            // TODO: 失敗した時のアイコンを作成する
            var icon        = chrome.extension.getURL('icon128.png');
            var header      = 'Failed';
            var description = 'Fail to send kindle using kindleit. Try later.';
            notifier.notify(icon, header, description);
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
        // notify
        var icon        = chrome.extension.getURL('icon128.png');
        var header      = 'Send';
        var description = 'Send kindle by using kindleit';
        notifier.notify(icon, header, description);

        // post
        var email = localStorage.getItem('email');
        post_kindleit(tab.url, email);
    } else {
        // go to email setting page
        chrome.tabs.create({
            "url": chrome.extension.getURL("options.html"),
        });
    }
});