// In this file Functions are divided in 3 part
// 1. Main Part
// 2. Extra Part
// 3. Some short functions for multi purpose use
// ================== [ Main Part ] ==================
// Calculating Sub-Total Price, VAT & Total Price of ticket.
function calculateTotal() {
    const firstClassCount = getInputValue('first-class');
    const economyCount = getInputValue('economy');

    const subTotal = firstClassCount * 150 + economyCount * 100;
    document.getElementById('sub-total').innerText = '$' + subTotal;

    const vat = subTotal * 0.1;
    document.getElementById('vat').innerText = '$' + vat;

    const total = subTotal + vat;
    document.getElementById('total').innerText = '$' + total;
}

// Ticket Handle
function ticketHandler(ticketCatagory, isIncrease) {
    const ticketCount = document.getElementById(ticketCatagory);

    // Checking what increase, decrease or not to decrease if value 0 
    if (isIncrease == true) {
        ticketCount.value = getInputValue(ticketCatagory) + 1;
    } else if (isIncrease == false && getInputValue(ticketCatagory) <= 0) {
        ticketCount.value = 0;
    } else {
        ticketCount.value = getInputValue(ticketCatagory) - 1;
    }
    // Updating Sub-total, VAT & Total
    calculateTotal()
}
// For changing input value to zero if the value is smaller than 0
function convertSmallerToZero(ticketCatagory) {
    const ticketCount = getInputValue(ticketCatagory);

    if (ticketCount <= 0) {
        document.getElementById(ticketCatagory).value = 0;
    }
}

//================== [ Extra Part ] =================
// booking Message
function bookMessage() {
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const finalDepartureDate = document.getElementById('departure-date').value;
    const finalReturnDate = document.getElementById('return-date').value;
    const firstClassCount = getInputValue('first-class');
    const economyCount = getInputValue('economy');
    const bookingArea = document.getElementById('booking-area');
    const bookingMessageArea = document.getElementById('booking-message-area');
    const subTotalCost = firstClassCount * 150 + economyCount * 100;
    const totalCost = subTotalCost + subTotalCost * 0.1;

    // Checking that both ticket input field are zero or not
    if (firstClassCount == 0 && economyCount == 0) {
        // IF both input field are zero, then it will be shown
        alert('Select at least one ticket that you want to book.')
    } else {
        const message = `<p class='message'>You have successfully booked ${firstClassCount + economyCount} ticket.</p>
        <table>
        <tr>
            <th>From</th>
            <td>${from}</td>
        </tr>
        <tr>
            <th>To</th>
            <td>${to}</td>
        </tr>
        <tr>
            <th>Departure Date</th>
            <td>${customDateFormat(0,finalDepartureDate,'easy')}</td>
        </tr>
        <tr>
            <th>Return Date</th>
            <td>${customDateFormat(0,finalReturnDate,'easy')}</td>
        </tr>
        <tr>
            <th>First Class</th>
            <td>${firstClassCount} Ticket</td>
        </tr>
        <tr>
            <th>Economy</th>
            <td>${economyCount} Ticket</td> 
        </tr>
        <tr>
            <th>Total Cost<small>(Including VAT)</small></th>
            <td>$${totalCost}</td>
        </tr>
        </table>
        <button class="btn-style" onclick="bookAgain()">Book Another Ticket</button>`;

        // Hiding book area
        bookingArea.style.display = 'none';

        // Showing successful message
        bookingMessageArea.style.display = "block";
        bookingMessageArea.innerHTML = message;
    }
}

// book Agian
function bookAgain(){
    const bookingArea = document.getElementById('booking-area');
    bookingArea.style.display = 'block';

    document.getElementById('first-class').value = 0;
    document.getElementById('economy').value = 0;

    const bookingMessageArea = document.getElementById('booking-message-area');
    bookingMessageArea.style.display = 'none';

    calculateTotal()
    setDate()
}

//================== [ Some short functions for multi purpose use] =================
// Geting input name to input value in a integer
function getInputValue(inputName) {
    const inputValue = parseInt(document.getElementById(inputName).value);
    return inputValue;
}

// Checking & updating a value if it is less than 10
function isLessThanTen(value) {
    if (value < 10) {
        return "0" + value;
    } else {
        return value;
    }
}

// Making a custom Date Formate
function customDateFormat(addDay,fixedDate,format) {
    let date;
    if (typeof fixedDate == 'string') {
        date = new Date(fixedDate);
    }else{
        date = new Date();
    }
    if (addDay > 0) {
        date.setDate(date.getDate() + addDay)
    }
    const dd = date.getDate();
    const mm = date.getMonth();
    const yyyy = date.getUTCFullYear();
    if (format == 'easy') {
        const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
        return `${isLessThanTen(dd)}-${months[mm]}-${yyyy}`
    }else{
        return `${yyyy}-${isLessThanTen(mm + 1)}-${isLessThanTen(dd)}`;
    }
}

// Set Default Date Value
function setDate() {
    // It will set the departure date to current date
    const departureDate = customDateFormat();
    document.getElementById('departure-date').value = departureDate;

    // It will set the return date to 7 days fast from current date
    const returnDate = customDateFormat(7);
    document.getElementById('return-date').value = returnDate;
}

