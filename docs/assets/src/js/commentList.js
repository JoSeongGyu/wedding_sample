$("#commentList")
  .delegate(".comment-edit", "click", function(e) {
    $("#updateKey").val(getKeyFormDataProp($(this)));
    $("#updateUsername").val(getUsernameFromProp($(this)));
    $("#updateContent").val(getContentFromProp($(this)));
    updateDialog.dialog("open");
  })
  .delegate(".comment-delete", "click", function(e) {
    $("#deleteKey").val(getKeyFormDataProp($(this)));
    deleteDialog.dialog("open");
  });

fbdb.sync(function(comments) {
  var $commentList = $("#commentList").empty();
  for (key in comments) {
    var c = comments[key];
    $commentList
      .prepend($("<dd><p>" + c.comment + "</p></dd>"))
      .prepend(
        $(
          "<dt data-key='" +
            c.key +
            "'><span class='ctitle'>" +
            c.username +
            "</span><i class='far fa-edit comment-edit'>&nbsp;수정</i>&nbsp;<i class='far fa-trash-alt comment-delete'>&nbsp;삭제</i></dt>"
        )
      );
  }
});

$("#messageForm").submit(function(e) {
  e.preventDefault();
  var $username = $("input[name=name]");
  var $password = $("input[name=password]");
  var $message = $("textarea[name=message]");
  var response = fbdb.write($username.val(), $password.val(), $message.val());

  if (response.success) {
    $username.val("");
    $password.val("");
    $message.val("");
  }
});
