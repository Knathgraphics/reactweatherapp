const now = new Date();

// Arrays to hold month and weekday names
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const days = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

// Get the current day of the week, month, date, and year
const dayOfWeek = days[now.getDay()];
const month = months[now.getMonth()];
const date = now.getDate();
const year = now.getFullYear();

// Format the date in words
export const dateInWords = `${dayOfWeek}, ${month} ${date}, ${year}`;


export function getCurrentTime12Hour() {
    const now = new Date();
  
    // Get hours, minutes, and seconds
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    // Determine AM or PM
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    // Convert hours from 24-hour format to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Hour '0' should be '12'
  
    // Format time string
    const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;
    return formattedTime;
  }
