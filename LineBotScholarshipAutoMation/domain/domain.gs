function findNewestUpdateScholarship(allMonthData){
  var scholarshipInfo = {
      repaymentall : 0,
      repaid : 0,
      repaidMonth : 0,
    }
    scholarshipInfo.repaymentall = personalStatus.calcRepayment * allMonthData.length
    for (var i = 0; allMonthData.length > i; i++){
        if (!allMonthData[i][1]) {
          scholarshipInfo.repaidMonth = i 
          return scholarshipInfo
        }else if(allMonthData.length - 1 == i){
          scholarshipInfo.repaidMonth = i+1
          return scholarshipInfo
        }else{
          scholarshipInfo.repaid += Number(allMonthData[i][3])
        }
      }      
}
function calculateRepaymentMonth(allMonthData){
    var scholarshipInfo = {
      repaymentMonth : 0
    }
    for (var i = 0; allMonthData.length > i; i++){
        if (!allMonthData[i][1]) {
          scholarshipInfo.repaymentMonth = allMonthData.length - i
          return scholarshipInfo
        }else if(allMonthData.length - 1 == i){
          scholarshipInfo.repaymentMonth = 0
          return scholarshipInfo
        }
      }      
}
function updateScholarshipBalance(sheet,notRepaidMonth,designatedPeriod,addRepayment){
  const checkBoxRange = sheet.getRange(3+notRepaidMonth,3,designatedPeriod,1);
  const updateRepayment = sheet.getRange(3+notRepaidMonth,5,designatedPeriod,1);
  updateRepayment.setValue(addRepayment)
  checkBoxRange.check()
}
function deleteScholarshipBalance(sheet,notRepaidMonth,designatedPeriod){
  const invalidRepaidMonth = notRepaidMonth - designatedPeriod
  const checkBoxRange = sheet.getRange(3+invalidRepaidMonth,3,designatedPeriod,1);
  const deleteRepayment = sheet.getRange(3+invalidRepaidMonth,5,designatedPeriod,1);
  deleteRepayment.setValue("")
  checkBoxRange.uncheck()
}
function calculateRepaidScholarshipBalance(repaidMonthNumber,repaidAmount){
  return repaidMonthNumber * repaidAmount
}

function calculateRepaymentScholarshipBalance(repayment,repaid){
  return repayment - repaid
}