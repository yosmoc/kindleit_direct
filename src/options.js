var insert_address = function (item) {
    localStorage.setItem('email', item);   
};

var get_address = function() {
    if (localStorage.getItem('email')) {
        return localStorage.getItem('email').split('@', 2);
    } else {
        return null;
    }
};

$(function() {
    var email = get_address();
    if (email) {
        $('#user').val(email[0]);

        if (email[1] === 'free.kindle.com') {
            $('#domain').val('free.kindle.com');
        } else {
            $('#domain').val('kindle.com');
        }
    };

    $('#register').click(function() {
        var user = $('#user').val();
        var domain = $('#domain').val();

        if (user === '') {
            $('#result').text('Invalid value. Please input your kindle email address.');
            $('#result').css({
                "background-color": "#ee827c"
            });
            $('#result').show();
        } else {
            insert_address(user + '@' + domain);
        }

        // check
        var email_from_localstrage = get_address();
        if (email_from_localstrage[0] === user && email_from_localstrage[1] === domain) {
            $('#result').text('Saved!');
            $('#result').css({
                "background-color": "#98d98e"
            });
            $('#result').show();
        }
    });
});