function getAutomationSheetAndValues() {
  const sheetInstans = SpreadsheetApp.openById(automationSheetInfo.sheetId).getSheetByName(automationSheetInfo.sheetNameHaru)
  automationSheetInstans.sheet = sheetInstans
  automationSheetInstans.values = sheetInstans.getRange(3,2,37,3).getValues()
  return automationSheetInstans
}

function testLineBotHelpCommand() {
  var getReturn = lineBotHelpCommand()
  var want = "奨学金の更新・削除・閲覧機能をサポートします。\n使い方(LINEで以下のように入力)\n- 更新機能 (例)\nsyosuke update haru 1\nsyosuke update sei 1\n\n- 削除機能 (例)\nsyosuke delete haru 1\nsyosuke delete sei 1\n\n- 残高等確認(例)\nsyosuke ls haru \nsyosuke ls sei \n\n- コマンド確認(例)\nsyosuke help"
  if(getReturn === want){
    console.log("OK")
    return "OK"
  }else{
    console.log(`Return Missmatch is want: ${want} \n ,got: ${getReturn}`)
  }
}

function testLineBotHelpCommand() {

}

function myFunction() {
  let testCmds = {
    "message": {
      "text": "syosuke update haru 0",
      "type": "text",
      "id": 12345678
    },
  };
  
  var cmds = testCmds.message.text.split(" ")
  var returnValue = distributeToUsecase(cmds)
  console.log(returnValue)
}
