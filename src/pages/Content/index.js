import { printLine } from './modules/print';
changeAccrualRule();


function changeAccrualRule() {
    //change dropdown values
    var valuesToSet = ['30', '31', '32', '33', '34', '35', '36', '37', '12'];
    var ddListsToChange = document.querySelectorAll("select[name^=leave_accrual_rule_id]");
    if (ddListsToChange[0].value === '30') {
        printLine('Not doing anything, this user already has the new rules in place');
        return;
    }
    ddListsToChange.forEach(function (item, index) {
        printLine('Accrual rule dropdown: ' + item.value + '.New value to set: ' + valuesToSet[index]);
        item.value = valuesToSet[index];
    })
    //change start date and end date
    var startDates = document.querySelectorAll("input[name^=start_date]");
    var endDates = document.querySelectorAll("input[name^=end_date]");
    endDates.forEach(function (item, index) {
        let formattedEndDate = '';
        //while it's not the last row, update end date
        if (index === endDates.length - 1) {
            var firstStartDate = startDates[0].value.split('/');
            var firstDate = new Date(firstStartDate[2], firstStartDate[1] - 1, firstStartDate[0]);
            var formattedFistDate = firstDate.getDate() + "/" + (firstDate.getMonth() + 1) + "/" + firstDate.getFullYear();
            startDates[index].value = formattedFistDate;

        } else if (index === endDates.length - 2) {

            //do nothing, if we're on `Romania 14+ years rule do not set end date

        } else {

            //parse the start date, add 2 years, transform it to expected format
            var startDateParts = startDates[index].value.split('/');
            var newEndDate = new Date((parseInt(startDateParts[2], 10) + 2).toString(), startDateParts[1] - 1, startDateParts[0]);
            formattedEndDate = "" + newEndDate.getDate() + "/" + (newEndDate.getMonth() + 1) + "/" + newEndDate.getFullYear();

            //set the new end
            item.value = formattedEndDate;
            startDates[index + 1].value = formattedEndDate
        }
    });

    // change transfer to balance
    var startingId = document.querySelector("select[name^=transfer_balance_to]").getAttribute('name').split("_")[3];
    printLine("Name is: " + document.querySelector("select[name^=transfer_balance_to]").getAttribute('name') + '.StartingId is: ' + startingId);
    var transferValuesToSet = [(parseInt(startingId, 10) + 1), (parseInt(startingId, 10) + 2), (parseInt(startingId, 10) + 3), (parseInt(startingId, 10) + 4), (parseInt(startingId, 10) + 5),
        'aa', 'ab'];
    var transferDdsList = document.querySelectorAll("select[name^=transfer_balance_to]");

    transferDdsList.forEach(function (item, index) {
        printLine('Transfer to balance dropdown: ' + item.value + '.New value to set: ' + transferValuesToSet[index]);
        item.value = transferValuesToSet[index];
    });
}
