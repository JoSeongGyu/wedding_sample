import {
  getKeyFormDataProp,
  getUsernameFromProp,
  getContentFromProp,
  deleteDialog,
  updateDialog,
} from './dialog';

$(function() {
  fbdb.sync((comments) => {
    const $commentList = $("#commentList").empty();
    comments.forEach((commentObj) => {
      $commentList
        .prepend($(`<dd class="comment_text"><p>${commentObj.comment}</p></dd>`))
        .prepend(
          $(`
            <dt class="comment_title" data-key='${commentObj.key}'>
              <span class='ctitle'>${commentObj.username}</span>
              <button class="comment-edit">
                <i class='far fa-edit'>&nbsp;수정</i>
              </button>&nbsp;
              <button class="comment-delete">
                <i class='far fa-trash-alt'>&nbsp;삭제</i>
              </button>
            </dt>
          `)
        );
    })
  });

  $("#commentList")
    .on("click", ".comment-edit", function() {
      $("#updateKey").val(getKeyFormDataProp($(this)));
      $("#updateUsername").val(getUsernameFromProp($(this)));
      $("#updateContent").val(getContentFromProp($(this)));
      updateDialog.dialog("open");
    })
    .on("click", ".comment-delete", function() {
      $("#deleteKey").val(getKeyFormDataProp($(this)));
      deleteDialog.dialog("open");
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
})
