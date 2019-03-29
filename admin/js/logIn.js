document.addEventListener('DOMContentLoaded', function() {
    // body...
    document.getElementById('loginForm').addEventListener('submit', function(e){
        e.preventDefault()
        let user = this.children['username'];
        let pass = this.children['password'];
        let errorMSG = this.children[3];
        ajax.post('assets/logInParse.php', {"username":user.value, "password":pass.value, 'page': "register"}, function(data){
            var data = JSON.parse(data);
            if (data.sucsess){
                user.value = "";
                pass.value = "";
                location.href = document.referrer;
                location.href = "index.php"; //Standard sida om man kommer hit utan en länk
            }else{
                
                errorMSG.innerText = data.error;
            }
                      
        })
        // Code taaken from: https://codepen.io/colorlib/pen/rxddKy
    });
    document.getElementById('register-form').addEventListener('change', function(e){
        let errorMSG = this.children[5];
        errorMSG.innerText = "";
        
    })
    document.getElementById('register-form').addEventListener('submit', function(e){
        e.preventDefault()
        let username = this.children['username'];
        let password = this.children['password'];
        let name = this.children['name'];
        let email = this.children['email'];
        let errorMSG = this.children[5];
        ajax.post('assets/register_parse.php', {"username":username.value, "password":password.value, "name":name.value, "email":email.value}, function(data){
            var data = JSON.parse(data);
            if (data.sucsess){
                username.value = ""
                password.value = ""
                name.value = ""
                email.value = ""
                switshinput(username.parentNode);
            }else{
                errorMSG.innerText = data.error;
            }
        })
        // Code taaken from: https://codepen.io/colorlib/pen/rxddKy
    });
    var message = document.getElementsByClassName('message');
    for (var text of message){
        text.getElementsByTagName('a')[0].addEventListener('click', switshinput);
    }
    function switshinput(e) {
        if(e.tagName =="FORM"){
            var form = e;
        }else{
            var form = e.target.parentNode.parentNode;
        }
            form.classList.toggle("hidden");
            if(form.nextElementSibling != null){
                form.nextElementSibling.classList.toggle("hidden");
            }else{
                form.previousElementSibling.classList.toggle("hidden");
            }

    }
    
})

var ajax = {};
ajax.x = function () {
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
    }
    var versions = [
        "MSXML2.XmlHttp.6.0",
        "MSXML2.XmlHttp.5.0",
        "MSXML2.XmlHttp.4.0",
        "MSXML2.XmlHttp.3.0",
        "MSXML2.XmlHttp.2.0",
        "Microsoft.XmlHttp"
    ];

    var xhr;
    for (var i = 0; i < versions.length; i++) {
        try {
            xhr = new ActiveXObject(versions[i]);
            break;
        } catch (e) {
        }
    }
    return xhr;
};

ajax.send = function (url, callback, method, data, async) {
    if (async === undefined) {
        async = true;
    }
    var x = ajax.x();
    x.open(method, url, async);
    x.onreadystatechange = function () {
        if (x.readyState == 4) {
            callback(x.responseText)
        }
    };
    if (method == 'POST') {
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    
    x.send(data)
};

ajax.get = function (url, data, callback, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async)
};

ajax.post = function (url, data, callback, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url, callback, 'POST', query.join('&'), async)
};
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}