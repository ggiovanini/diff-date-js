function DiffDate(glue = ':') {
    const self = this;
    const dataRequire = 'data-date-diff';
    const separator = glue;

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
        elem.innerHTML = self.daysBetween(pastDate, today, glue);
    };

    this.daysBetween = function (date1, date2, glue = separator) {
        const difference = Math.round(
            (date2.getTime() - date1.getTime()) / 1000
        );

        const minutes = Math.floor(difference / 60);
        const seconds = difference - minutes  * 60;
        if (seconds < 10) {
            return (`${minutes}${glue}0${seconds}`);
        }

        return (`${minutes}${glue}${seconds}`);
    };

}
const DiffDateController = new DiffDate();