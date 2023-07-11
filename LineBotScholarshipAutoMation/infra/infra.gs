var automationSheetInfo = {
  sheetName: "",
  sheetId: PropertiesService.getScriptProperties().getProperty("SHEET_ID")
}

var personalStatus = {
  haruRepayment : 32691,
  seiRepayment : 32774, 
  calcRepayment : Int16Array,
  correctionRepayment : 0
}

var lineBotValues = {
  url : "https://api.line.me/v2/bot/message/push",
  token : PropertiesService.getScriptProperties().getProperty("LINE_TOKEN"),
  toGroupid : PropertiesService.getScriptProperties().getProperty("TO_GROUP")
}

var automationSheetInstans = {
  automationSheet: Object(),
  automationSheetValue: Array
}

var cmdErrors = {
  error: false,
  message: ""
}

function doPost(e) {
  var cmds = parseWebhook(e)
  var returnMessage = distributeToUsecase(cmds)
  lineReplayMessage(e,returnMessage)
}

function getAutomationSheetAndValues() {
  const sheetInstans = SpreadsheetApp.openById(automationSheetInfo.sheetId).getSheetByName(automationSheetInfo.sheetName)
  automationSheetInstans.sheet = sheetInstans
  if(automationSheetInfo.sheetName == "harusheet"){
    automationSheetInstans.values = sheetInstans.getRange(3,2,57,4).getValues()
  }else if (automationSheetInfo.sheetName == "seisheet"){
    automationSheetInstans.values = sheetInstans.getRange(3,2,35,4).getValues()
  }
  
  return automationSheetInstans
}

function parseWebhook(e){
var events = JSON.parse(e.postData.contents).events;
var recieveMessage = "" 
events.forEach(function(event) {
    if((event.type == "message") && (event.message.type == "text")) {
      recieveMessage = event.message.text
    }
  });
var cmds = recieveMessage.split(" ")
return cmds
}

function cmdVerification(cmds){
  if(cmds[0] != "syosuke"){
    cmdErrors.error = true
    cmdErrors.message = null
    return cmdErrors.error
  }
  if(cmds.length == 1){
    cmdErrors.error = true
    cmdErrors.message = "コマンドが足りません。\nsyosuke help でコマンドを確認できます"
    return cmdErrors.error
  }
  switch(cmds[1]){
    case "ls":
      break      
    case "update":
      break 
    case "delete":
      break 
    case "help":
      return cmdErrors.error
    default:
      cmdErrors.error = true
      cmdErrors.message = "不正なコマンドの機能。\nsyosuke help でコマンドを確認できます"
      return cmdErrors.error   
  }
  switch(cmds[2]){
    case "haru":
      automationSheetInfo.sheetName = "harusheet"
      personalStatus.calcRepayment = personalStatus.haruRepayment
      personalStatus.correctionRepayment = 5000
      break
    case "seiya":
      automationSheetInfo.sheetName = "seisheet"
      personalStatus.calcRepayment = personalStatus.seiRepayment
      break
    case "haruki":
      automationSheetInfo.sheetName = "harusheet"
      personalStatus.calcRepayment = personalStatus.haruRepayment
      personalStatus.correctionRepayment = 5000
      break
    case "sei":
      automationSheetInfo.sheetName = "seisheet"
      personalStatus.calcRepayment = personalStatus.seiRepayment
      break
    default:
      cmdErrors.error = true
      cmdErrors.message = "不正なシート名。\n正しいシート名を選択してください(haru,haruki,seiya,sei)。"
      return cmdErrors.error
  }
  if(cmds.length > 3 && isNaN(Number(cmds[3])) || cmds[3] == 0){
    cmdErrors.error = true
    cmdErrors.message = "不正な月数。返済月数の項目を半角数値以外もしくは0で入力していると思われます。\n正しいコマンド例(syosuke update haru 2)"
    return cmdErrors.error
  }else{
    return cmdErrors.error
  }
}

function distributeToUsecase(cmds){
  var designatedPeriod = 1
  if(!cmdVerification(cmds)){
    if(cmds.length > 3) designatedPeriod = cmds[3]
    switch(cmds[1]){
      case "ls":
        var automationSheet = getAutomationSheetAndValues()
        return scholarshipBalanceCheckRepaymentAndRepaid(automationSheet)      
      case "update":
        var automationSheet = getAutomationSheetAndValues()
        var returnMessage = scholarshipBalanceUpdate(designatedPeriod,automationSheet)
        returnMessage = returnMessage.concat(scholarshipBalanceCheckRepaymentAndRepaid()) 
        return returnMessage
      case "delete":
        var automationSheet = getAutomationSheetAndValues()
        var returnMessage = scholarshipBalanceDelete(designatedPeriod,automationSheet)
        returnMessage = returnMessage.concat(scholarshipBalanceCheckRepaymentAndRepaid())
        return returnMessage 
      case "help":
        var returnMessage = lineBotHelpCommand()
        return returnMessage
    }
  }else{
    return cmdErrors.message
  }
  
}

function lineReplayMessage(e,returnMessage){
  //const json = JSON.parse(e.postData.contents);
  //const replyToken = json.events[0].replyToken;
  const option = {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + lineBotValues.token,
    },
    'method': 'POST',
    'payload': JSON.stringify({
      'to': lineBotValues.toGroupid,
      'messages': [{
        'type': 'text',
        'text': returnMessage,
      }],
    }),
  }
  UrlFetchApp.fetch(lineBotValues.url,option);
}

