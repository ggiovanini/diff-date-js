function DiffDate(glue = ':') {
    const self = this;
    const dataRequire = 'data-date-diff';
    const separator = glue;
    const negative = '-';

    window.addEventListener('load', function () {
        self.init();
    });

    this.init = function (){
        const elem = document.querySelectorAll(`[${dataRequire}]`);
        if(!elem) return;

        for (const item in elem) {
            const pastDate = elem[item];
            if (typeof pastDate === 'object') {
                self.updateValue(pastDate.dataset.dateDiff, pastDate);
                pastDate.dataset.dateInterval = setInterval(function () {
                    self.updateValue(pastDate.dataset.dateDiff, pastDate);
                }, 1000);
            }
        }

    };

    this.stop =  function(elem = null) {
        if (elem) {
            clearInterval(elem.dataset.dateInterval);
            return;
        }

        elem = document.querySelectorAll(`[${dataRequire}]`);
        if(!elem) return;

        for (const item in elem) {
            const selElem = elem[item];
            if (typeof selElem === 'object') {
                clearInterval(selElem.dataset.dateInterval);
            }
        }

    };

    this.start =  function(elem = null) {
        if (elem) {
            self.updateValue(elem.dataset.dateDiff, elem);
            elem.dataset.dateInterval = setInterval(function () {
                self.updateValue(elem.dataset.dateDiff, elem);
            }, 1000);
            return;
        }

        this.init();

    };

    this.updateValue = function (date1, elem) {
        const pastDate = new Date(date1);
        const today = new Date();
        const glue = elem.dataset.dateGlue || separator;
        const minus = elem.dataset.dateMinus || negative;
        const monitory = elem.dataset.dateMonitory || null;
        const stop = elem.dataset.dateZero && elem.dataset.dateZero === 'stop';

        const difference = Math.round(
            (pastDate.getTime() - today.getTime()) / 1000
        );

        if ((difference <= 0 && stop) || Number.isInteger(difference / 30)) {
            self.action(elem, difference, monitory);
        }

        if (difference <= 0 && stop) {
            elem.innerHTML = `0${glue}00`;
            self.stop(elem);
            return;
        }

        if (difference) {
            elem.innerHTML = self.daysBetween(pastDate, today, glue, minus);
            if (stop && (difference === -0 || difference === 0)) {
                self.stop(elem);
            }
            return;
        }

        elem.innerHTML = self.daysBetween(today, pastDate, glue, minus, stop);
        if (stop && (difference === -0 || difference === 0)) {
            self.stop(elem);
        }
    };

    this.action = function(elem, difference, monitory = null){
        elem.event = new CustomEvent('inform', { detail: difference });
        elem.dispatchEvent(elem.event);
        if (typeof window[monitory] === 'function') {
            window[monitory]({ detail: difference, target: elem });
        }
    };

    this.daysBetween = function (date1, date2, glue = separator, minus = negative) {
        const difference = Math.round(
            (date2.getTime() - date1.getTime()) / 1000
        );

        let minutes = Math.floor(difference / 60);
        let seconds = difference - minutes  * 60;
        let setNegative = '';
        if (difference < 0) {
            minutes = (minutes+1) * -1;
            seconds = 60 - seconds;
            setNegative = minus === 'false' ? '' : minus;
        }

        if (seconds < 10) {
            return (`${setNegative}${minutes}${glue}0${seconds}`);
        }

        return (`${setNegative}${minutes}${glue}${seconds}`);
    };

}
const DiffDateController = new DiffDate();