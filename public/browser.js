// Selecting all the HTML elements
const calendarDates = document.getElementById('calendar-dates');
const monthYear = document.getElementById('month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const yearSelector = document.getElementById('year-selector');
const monthSelector = document.getElementById('month-selector');
const days = document.querySelectorAll(".cal-day");

// Getting the dates
let date = new Date();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();

// Constant that contains all the month names
const months = [
"January", "February", "March", "April", 
"May", "June", "July", "August", 
"September", "October", "November", "December"
];

// Function that dynamically renders the calendar based on the chosen month and year
function renderCalendar(month, year) {
    // Clear everything 
    calendarDates.innerHTML = ""; 
    // Display the selected month and year in the header                     
    monthYear.textContent = `${months[month]} ${year}`; 
  
    // Get the first day of the chosen month at the chosen year
    const firstDay = new Date(year, month, 1).getDay();      
    // Get the number of days in a month to account for leap years     
    const daysInMonth = new Date(year, month + 1, 0).getDate();   
  
    // If fill in the days before with blanks if say the 1st day isn't a Sunday which is the 1st day of the week
    for (let i = 0; i < firstDay; i++) {
      const blank = document.createElement("div");
      calendarDates.appendChild(blank);
    }
  
    // Create buttons for the days with the text content set to their number
    for (let i = 1; i <= daysInMonth; i++) {
      const day = document.createElement("button");
      day.textContent = i;
      day.classList.add("cal-day");
      calendarDates.appendChild(day);
    }
}

// Function that adds the content for the years dropdown 
function fillYears(content) {

    const option = document.createElement("option");
    option.value = content;
    option.textContent = content;
    yearSelector.appendChild(option);
}

// Function that populates the years dropdown with content
function fillYearsMenu() {
    for (let i = 1900; i <= currentYear; i++) {
        fillYears(i);
    }
}

// Function that add the content for the months dropdown
function fillMonths(content) {

    const option = document.createElement("option");
    option.value = content;
    option.textContent = content;
    monthSelector.appendChild(option);

}

// Function that populates the months dropdown
function fillMonthsMenu() {

    for (let i = 0; i < months.length; i++) {
        fillMonths(months[i]);
    }
}

// Event listener for the previous button
prevMonthBtn.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
});

// Event listener for the next button
nextMonthBtn.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
});

// Event listener for each day, currently just testing it
days.forEach(element => {
    element.addEventListener("click", () => {
        console.log(element.textContent);
    }); 
})

// Event listeners for the dropdowns
yearSelector.addEventListener('change', function(event) {

    const selectedYear = event.target.value;
    currentYear = selectedYear;

    renderCalendar(currentMonth, currentYear);
});

monthSelector.addEventListener('change', function(event) {

    const selectedName = event.target.value.trim();     
    const monthIndex = months.indexOf(selectedName); 
    if (monthIndex !== -1) {
        currentMonth = monthIndex;
        renderCalendar(currentMonth, currentYear);
    }
});

// Render the initial calendar with the computers current month and year, call the dropdown function, and fill the dropdowns with the initial values
renderCalendar(currentMonth, currentYear);
fillYearsMenu();
fillMonthsMenu();

yearSelector.value = currentYear;
monthSelector.value = months[currentMonth];
