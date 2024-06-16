

// countdown card 1
export function CountdownStart1(callback:any) {
    const countdownInterval = setInterval(function() {
        var countDownDate = new Date("jul 1, 2024 00:00:00").getTime();
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var days1 = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours1 = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes1 = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds1 = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance < 0) {
            clearInterval(countdownInterval);
            callback({ days1: 0, hours1: 0, minutes1: 0, seconds1: 0 });
        } else {
            callback({ days1, hours1, minutes1, seconds1 });
        }
    }, 1000);
}

//countdown card 2
export function CountdownStart2(callback:any) {
    const countdownInterval = setInterval(function() {
        var countDownDate1 = new Date("aug 1, 2024 00:00:00").getTime();
        var now = new Date().getTime();
        var distance = countDownDate1 - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance < 0) {
            clearInterval(countdownInterval);
            callback({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        } else {
            callback({ days, hours, minutes, seconds });
        }
    }, 1000);
}





