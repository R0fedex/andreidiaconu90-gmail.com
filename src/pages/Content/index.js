import { printLine } from './modules/print';
console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');
printLine("Using the 'printLine' function from the Print Module");
changeAccrualRule();


function changeAccrualRule() {
    //change dropdown values
    var valuesToSet = ['30', '31', '32', '33', '34', '35', '36', '37', '12'];
    var ddListsToChange = document.querySelectorAll("select[name^=leave_accrual_rule_id]");
    ddListsToChange.forEach(function (item, index) {
        console.log('Current dropdown: ' + item.value + '.New value to set: ' + valuesToSet[index]);
        item.value = valuesToSet[index];
    })
    //change start date and end date
    var startDates = document.querySelectorAll("input[name^=start_date]");
    var endDates = document.querySelectorAll("input[name^=end_date]");
    endDates.forEach(function (item, index) {
        let formattedEndDate = '';
        //while it's not the last row, update end date
        if (index !== endDates.length - 1) {
            //parse the date, add 2 years, and transform it to expected format
            var startDateParts = startDates[index].value.split('/');
            var newEndDate = new Date((parseInt(startDateParts[2], 10) + 2).toString(), startDateParts[1] - 1, startDateParts[0]);
            formattedEndDate = "0" + newEndDate.getDate() + "/0" + (newEndDate.getMonth() + 1) + "/" + newEndDate.getFullYear();

            //set the new end
            item.value = formattedEndDate;
            startDates[index + 1].value = formattedEndDate
        } else {
            var firstStartDate = startDates[0].value.split('/');
            var firstDate = new Date(firstStartDate[2], firstStartDate[1] - 1, firstStartDate[0]);
            var formattedFistDate = firstDate.getDate() + "/" + (firstDate.getMonth() + 1) + "/" + firstDate.getFullYear();
            startDates[index].value = formattedFistDate;
        }
    });

    // change transfer to balance
    var transferValuesToSet = ['3537', '3538', '3539', '3540', '3541', 'aa', 'ab', 'ac'];
    var transferDdsList = document.querySelectorAll("select[name^=transfer_balance_to]");

    transferDdsList.forEach(function (item, index) {
        console.log('Current dropdown: ' + item.value + '.New value to set: ' + transferValuesToSet[index]);
        item.value = transferValuesToSet[index];
    });
}
