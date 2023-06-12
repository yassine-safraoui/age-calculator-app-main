(() => {
    let button = document.querySelector("button#calculate-age");
    let daysInput = document.getElementById("day-input");
    let monthsInput = document.getElementById("month-input");
    let yearsInput = document.getElementById("year-input");
    let daysDisplay = document.querySelector("div.date-display > div.days-display > span");
    let monthsDisplay = document.querySelector("div.date-display > div.months-display > span");
    let yearsDisplay = document.querySelector("div.date-display > div.years-display > span");

    button.onclick = () => {
        let day = Number(daysInput.value);
        let month = Number(monthsInput.value);
        let year = Number(yearsInput.value);
        let errors = validateDate(day, month, year)
        if (errors.errorState) {
            document.querySelector("div.date-picker").setAttribute("data-error", true)
            document.getElementById("year-error-message").textContent = errors.yearError
            document.getElementById("month-error-message").textContent = errors.monthError
            document.getElementById("day-error-message").textContent = errors.dayError
            daysDisplay.textContent = "- -"
            monthsDisplay.textContent = "- -"
            yearsDisplay.textContent = "- -"
        } else {
            var birthday = new Date(`${year}-${month}-${day}`)
            console.log(`${year}-${month}-${day}`)
            let diffInYears = (new Date() - birthday) / (1000 * 60 * 60 * 24 * 365);
            let diffInMonths = (diffInYears - Math.floor(diffInYears)) * 12;
            let diffInDays = (diffInMonths - Math.floor(diffInMonths)) * 30;
            daysDisplay.textContent = Math.floor(diffInDays)
            monthsDisplay.textContent = Math.floor(diffInMonths)
            yearsDisplay.textContent = Math.floor(diffInYears)
        }
    }
    daysInput.onkeydown = monthsInput.onkeydown = yearsInput.onkeydown = () => {
        document.querySelector("div.date-picker").setAttribute("data-error", false)
        document.getElementById("year-error-message").textContent = ""
        document.getElementById("month-error-message").textContent = ""
        document.getElementById("day-error-message").textContent = ""

    }

    function validateDate(day, month, year) {
        let errors = { yearError: "", monthError: "", dayError: "", errorState: false }
        let date = new Date(`${year}-${month}-${day}`)
        if (Date.now() - date.getTime() < 24 * 60 * 60 * 1000) {
            errors.errorState = true;
            errors.yearError = errors.monthError = errors.dayError = "Must be in the past"
        } else if (year <= (new Date(Date.now())).getUTCFullYear() - 200) {
            errors.errorState = true;
            errors.yearError = "Must be a propor birthday"
        }
        if (month < 1 | month > 12) {
            errors.errorState = true;
            errors.monthError = "Must be a valid month"
        } else if (day > getMonthLength(month, year) | day < 1) {
            errors.errorState = true;
            errors.dayError = "Must be a valid day"
        }
        return errors;
    }

    function getMonthLength(month, year) {
        if ([4, 6, 9, 11].indexOf(month) > -1) {
            return 30
        }
        if (month == 2) {
            if (Number.isInteger(year / 4) & ((Number.isInteger(year / 100) & Number.isInteger(year / 400)) | !Number.isInteger(year / 100)))
                return 29
            return 28
        }
        return 31;
    }
})()