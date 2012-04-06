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
            $('#domain').val(1);
        } else {
            $('#domain').val(2);
        }
    };

    $('#register').click(function() {
//        insert_address($('#user').val + $('#domain').val);
        insert_address('motihara@kindle.com');

    });
});