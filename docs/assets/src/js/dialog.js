import _ from 'underscore';

export let deleteDialog;
export let updateDialog;

const dismissDialogs = () => {
  $(".modalInput").val("");
  deleteDialog.dialog("close");
  updateDialog.dialog("close");
};

const dialogDefaultOption = {
  autoOpen: false,
  height: 400,
  width: 350,
  modal: true,
  close: dismissDialogs
};

export function getKeyFormDataProp($dom) {
  return $dom.parent().data("key");
}
export function getUsernameFromProp($dom) {
  return $dom
    .parent()
    .find(".ctitle")
    .html();
}
export function getContentFromProp($dom) {
  return $dom
    .parent()
    .next()
    .find("p")
    .html();
}

$(function() {
  deleteDialog = $("#delete-dialog-form").dialog(
    _.extend(dialogDefaultOption, {
      buttons: {
        삭제하기: () => {
          const password = $("#deletePassword").val();
          const key = $("#deleteKey").val();
            if(!password || password.length < 4) {
                alert("비밀번호는 4자 이상 입력해주세요.");
                $("#deletePassword").focus();
                return;
            }
          fbdb.delete(key, password, (result) => {
            if (!result) {
              alert("비밀번호가 일치하지 않습니다.");
            } else {
              dismissDialogs();
            }
          });
        },
        취소: dismissDialogs
      }
    })
  );

  updateDialog = $("#update-dialog-form").dialog(
    _.extend(dialogDefaultOption, {
      height: 550,
      buttons: {
        수정하기: () => {
            const $username = $("#updateUsername");
            const $password = $("#updatePassword");
            const $content = $("#updateContent");

            const username = $username.val().trim();
            const password = $password.val().trim();
            const content = $content.val().trim();
            const key = $("#updateKey").val();

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

            if(!content || content.length < 4) {
                alert("축하메세지는 4자 이상 입력해주세요.");
                $content.focus();
                return;
            }

          fbdb.update(key, username, content, password, (result) => {
            if (!result) {
              alert("비밀번호가 일치하지 않습니다.");
            } else {
              dismissDialogs();
            }
          });
        },
        취소: dismissDialogs
      }
    })
  );
})
