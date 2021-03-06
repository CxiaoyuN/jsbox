$app.strings = {
  "en": {
    "alert_message_copy": "Wanna copy?",
    "alert_button_cancel": "Cancel",
    "alert_button_copy_as": "Copy as ",
    "toast_copied": "Copied"
  },
  "zh-Hans": {
    "alert_message_copy": "需要复制吗？",
    "alert_button_cancel": "取消",
    "alert_button_copy_as": "复制为 ",
    "toast_copied": "已复制"
  }
}

function selectIcon() {
  var iconHandler = $block("void, NSString *", function(icon) {
    var text = icon.rawValue()
    var format = "$icon(\"" + text.match(/\d+/) + "\")"
    $ui.alert({
      title: text,
      message: $l10n("alert_message_copy"),
      actions: [{
          title: $l10n("alert_button_cancel"),
          style: "Cancel",
          handler: function() {}
        },
        {
          title: $l10n("alert_button_copy_as") + text,
          handler: function() {
            $clipboard.text = text
            $ui.toast($l10n("toast_copied"))
          }
        },
        {
          title: $l10n("alert_button_copy_as") + format,
          handler: function() {
            $clipboard.text = format
            $ui.toast($l10n("toast_copied"))
          }
        }
      ]
    })
  })

  var icons = $objc("AddinIconPicker").invoke("alloc.init")
  icons.invoke("setCompletionHandler", iconHandler)
  icons.invoke("show")
}

selectIcon()
