(function() {
    // Result Object
    var StorageResponse = function(success, message) {
        return {success: success, message: message}
    }
    var bucketName = "comment";
    var bucketPath = bucketName + "/";

    // Initialize Firebase
    // TODO: Replace with your project's customized code snippet
    var config = {
        apiKey: "AIzaSyCDcKH2vyt9vI_hxWtyJeWQy0S_RgUqUO4",
        authDomain: "yagom-wedding-sample.firebaseapp.com",
        databaseURL: "https://yagom-wedding-sample.firebaseio.com",
        storageBucket: "comment.appspot.com"
    };
    firebase.initializeApp(config);
    var fbdb = firebase.database();

    function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    };

    var salt = "__YAGOM__";

    this.write = function(username, password, comment) {
        // if(password !== checkPassword) {
        //     throw new StorageResponse(false, "비밀번호가 일치하지 않습니다.");
        // }

        var time = moment();
        password = sha256(password + salt);

        fbdb.ref(bucketPath + generateUUID()).set({
            username: username,
            password: password,
            comment: comment,
            timestamp: time.valueOf(),
            createdAt: time.format("YYYY/MM/DD HH:mm:ss")
        });

        return new StorageResponse(true);

    };

    this.load = function(page) {

    };

    this.sync = function(callback) {
        fbdb.ref(bucketPath).orderByChild('timestamp').on('value', function(snapshot) {
            if(!!snapshot && !!snapshot.val() && snapshot.val().length < 1) {
                return;
            }
            callback(snapshot.val());
        });
    }


    window.fbdb = this;
})();