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


    function getEncryptedPassword(password) {
        var salt = "__YAGOM__";
        return sha256(password + salt);
    }

    this.write = function(username, password, comment) {
        var time = moment();
        password = getEncryptedPassword(password);

        fbdb.ref(bucketPath + generateUUID()).set({
            username: username,
            password: password,
            comment: comment,
            timestamp: time.valueOf(),
            createdAt: time.format("YYYY/MM/DD HH:mm:ss")
        });

        return new StorageResponse(true);

    };

    this.update = function(key, username, content, password, callback) {
        var time = moment();
        password = getEncryptedPassword(password);
        fbdb.ref(bucketPath + key).once('value').then(function(snapshot) {
            var comment = snapshot.val();
            if(comment.password === password) {
                fbdb.ref(bucketPath + key).update({
                    username: username,
                    password: password,
                    comment: content,
                    updatedAt: time.format("YYYY/MM/DD HH:mm:ss")
                }).then(function() {
                    callback(true);
                });
            } else {
                callback(false);
            }
        });
    }

    this.delete = function(key, password, callback) {
        fbdb.ref(bucketPath + key).once('value').then(function(snapshot) {
            var comment = snapshot.val();
            if(comment.password === getEncryptedPassword(password)) {
                fbdb.ref(bucketPath + key).remove().then(function() {
                    callback(true);
                });
            } else {
                callback(false);
            }
        });
    };

    this.sync = function(callback) {
        fbdb.ref(bucketPath).orderByChild('timestamp').on('value', function(snapshot) {
            if(!!snapshot && !!snapshot.val() && snapshot.val().length < 1) {
                return;
            }
            var comments = [];

            for (c in snapshot.val()) {

                comments.push(_.extend(snapshot.val()[c], {key: c}));
            }

            comments.sort(function (a, b) {
                return b.timestamp - a.timestamp;
            });

            callback(comments);
        });
    }


    window.fbdb = this;
})();