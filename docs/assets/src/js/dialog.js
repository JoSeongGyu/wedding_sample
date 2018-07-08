import * as $ from 'jquery';
import * as _ from 'underscore';

var deleteDialog, updateDialog, dismissDialogs;

function getKeyFormDataProp($dom) {
  return $dom.parent().data("key");
}
function getUsernameFromProp($dom) {
  return $dom
    .parent()
    .find(".ctitle")
    .html();
}
function getContentFromProp($dom) {
  return $dom
    .parent()
    .next()
    .find("p")
    .html();
}
dismissDialogs = function() {
  $(".modalInput").val("");
  deleteDialog.dialog("close");
  updateDialog.dialog("close");
};

$(document).ready(function() {
  var dialogDefaultOption = {
    autoOpen: false,
    height: 400,
    width: 350,
    modal: true,
    close: dismissDialogs
  };

  deleteDialog = $("#delete-dialog-form").dialog(
    _.extend(dialogDefaultOption, {
      buttons: {
        삭제하기: function() {
          var password = $("#deletePassword").val();
          var key = $("#deleteKey").val();
          fbdb.delete(key, password, function(result) {
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
        수정하기: function() {
          var username = $("#updateUsername").val();
          var content = $("#updateContent").val();
          var password = $("#updatePassword").val();
          var key = $("#updateKey").val();
          fbdb.update(key, username, content, password, function(result) {
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
});
