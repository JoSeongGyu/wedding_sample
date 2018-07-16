import {
  getKeyFormDataProp,
  getUsernameFromProp,
  getContentFromProp,
  deleteDialog,
  updateDialog,
} from './dialog';

$("#commentList")
  .delegate(".comment-edit", "click", () => {
    $("#updateKey").val(getKeyFormDataProp($(this)));
    $("#updateUsername").val(getUsernameFromProp($(this)));
    $("#updateContent").val(getContentFromProp($(this)));
    updateDialog.dialog("open");
  })
  .delegate(".comment-delete", "click", () => {
    $("#deleteKey").val(getKeyFormDataProp($(this)));
    deleteDialog.dialog("open");
  });

fbdb.sync((comments) => {
  const $commentList = $("#commentList").empty();
  comments.forEach((commentObj) => {
    $commentList
      .prepend($(`<dd><p>${commentObj.comment}</p></dd>`))
      .prepend(
        $(`<dt data-key='${commentObj.key}'><span class='ctitle'>${commentObj.username}</span><i class='far fa-edit comment-edit'>&nbsp;수정</i>&nbsp;<i class='far fa-trash-alt comment-delete'>&nbsp;삭제</i></dt>`)
      );
  })
});

$("#messageForm").submit((e) => {
  e.preventDefault();
  const $username = $("input[name=name]");
  const $password = $("input[name=password]");
  const $message = $("textarea[name=message]");
  const response = fbdb.write($username.val(), $password.val(), $message.val());

  if (response.success) {
    $username.val("");
    $password.val("");
    $message.val("");
  }
});
