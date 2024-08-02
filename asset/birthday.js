document.addEventListener('DOMContentLoaded', function() {
    const countdownDate = new Date("October 28, 2024 00:00:00 GMT+0600").getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("day").innerText = days;
        document.getElementById("hour").innerText = hours;
        document.getElementById("minute").innerText = minutes;
        document.getElementById("second").innerText = seconds;

        // if (distance < 0) {
        //     clearInterval(interval);
        //     document.querySelector('.countdown').innerText = "Happy Birthday!";
        // }
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call to display countdown immediately
});
