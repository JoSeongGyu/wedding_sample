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
      const $username = $("#messageForm input[name=name]");
      const $password = $("#messageForm input[name=password]");
      const $message = $("#messageForm textarea[name=message]");

      const username = $username.val().trim();
      const password = $password.val().trim();
      const message = $message.val().trim();

      if(!username || username.length < 2) {
          alert("이름은 2글자 이상 입력해주세요.");
          $username.focus();
          return;
      }

      if(!password || password.length < 4) {
          alert("비밀번호는 4자 이상 입력해주세요.");
          $password.focus();
          return;
      }

      if(!message || message.length < 4) {
          alert("축하메세지는 4자 이상 입력해주세요.");
          $message.focus();
          return;
      }
      const response = fbdb.write(username, password, message);

      if (response.success) {
          $username.val("");
          $password.val("");
          $message.val("");
      }
  });
})
