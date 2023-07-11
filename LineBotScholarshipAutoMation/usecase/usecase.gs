var checkRepayment = {
      repaymentall: 0,
      repayment : 0,
      repaymentMonth : 0,
      repaid : 0,
      repaidMonth : 0,
    }

function lineBotHelpCommand() {
    var helpMessage = "奨学金の更新・削除・閲覧機能をサポートします。\n使い方(LINEで以下のように入力)\n- 更新機能 (例)\nsyosuke update haru 1\nsyosuke update sei 1\n\n- 削除機能 (例)\nsyosuke delete haru 1\nsyosuke delete sei 1\n\n- 残高等確認(例)\nsyosuke ls haru \nsyosuke ls sei \n\n- コマンド確認(例)\nsyosuke help"
    return helpMessage
}

function scholarshipBalanceUpdate(designatedPeriod,automationSheet) {
  const notRepaidMonth = findNewestUpdateScholarship(automationSheet.values)
  updateScholarshipBalance(automationSheet.sheet,notRepaidMonth.repaidMonth,designatedPeriod,33000)
  return String(designatedPeriod)+"カ月分 奨学金の残高更新が完了しました\n"
}

function scholarshipBalanceDelete(designatedPeriod,automationSheet) {
  const notRepaidMonth = findNewestUpdateScholarship(automationSheet.values)
  deleteScholarshipBalance(automationSheet.sheet,notRepaidMonth.repaidMonth,designatedPeriod)
  return String(designatedPeriod)+"カ月分 奨学金の残高削除が完了しました\n"
}

function scholarshipBalanceCheckRepaid(automationSheet) {
  var repaid = findNewestUpdateScholarship(automationSheet.values)
  checkRepayment.repaymentall =repaid.repaymentall
  checkRepayment.repaid = repaid.repaid + personalStatus.correctionRepayment
  checkRepayment.repaidMonth = repaid.repaidMonth
}

function scholarshipBalanceCheckRepayment(automationSheet) {
  var repayment = calculateRepaymentMonth(automationSheet.values)
  checkRepayment.repaymentMonth = repayment.repaymentMonth
  checkRepayment.repayment = checkRepayment.repaymentall - checkRepayment.repaid
}

function scholarshipBalanceCheckRepaymentAndRepaid(automationSheet){
  scholarshipBalanceCheckRepaid(automationSheet)
  scholarshipBalanceCheckRepayment(automationSheet)
  var returnMessage = "これまで"
  returnMessage = returnMessage.concat( String(checkRepayment.repaid)," 円(",String(checkRepayment.repaidMonth),"ヶ月)の返済が完了しています。\n残り ",String(checkRepayment.repayment)," 円(",checkRepayment.repaymentMonth,"ヶ月)の返済です。\n" )
  return returnMessage
}