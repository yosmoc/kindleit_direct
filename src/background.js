var BASE_URL = 'http://fivefilters.org/kindle-it/send.php?context=send';

var post_kindleit = function(url, email) {
    var page_url = url;
    var email_id = email.split('@')[0];
    var email_domain = email.split('@')[1];
    var page_url_and_email_address = '&url=' + encodeURIComponent(page_url)
        + '&email=' + email_id
        + '&domain=' + _domain_number(email_domain);

    $.ajax({
        type: "POST",
        url: BASE_URL,
        data: page_url_and_email_address,
        success: function(msg) {
            // TODO
            // 成功した際にレスポンスを返すか？
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
            // TODO
            // 失敗した際はなにか返すべき
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
        var email = localStorage.getItem('email');
        post_kindleit(tab.url, email);
    } else {
        chrome.tabs.create({
            "url": chrome.extension.getURL("options.html"),
        });
    }
});