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
          const username = $("#updateUsername").val();
          const content = $("#updateContent").val();
          const password = $("#updatePassword").val();
          const key = $("#updateKey").val();
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
