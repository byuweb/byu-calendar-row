'use strict';
const util = require('byu-web-component-utils');
// these only need to be created or established once, so they are outside the class
const tileTemplate = require('./tile-row.html');
const imageTemplate = require('./image-row.html');

var months =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var monthAbbs = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday", "Saturday"];

class ByuCalendarRow extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }
    get type() {
        return this.getAttribute('type');
    }
    set type(value) {
        if(value){
            this.setAttribute('type', value);
        } else {
            this.removeAttribute('type');
        }
    }
    get date(){
        var dates = this.shadowRoot.querySelector("#date-val").assignedNodes();
        if(dates.length){
            var date = this.shadowRoot.querySelector("#date-val").assignedNodes()[0];
            console.log(date.innerText);
            return new Date(date.innerText.trim());
        }
        else {
            return null;
        }
    }
    connectedCallback(){
        // identify which template to use
        let template = this.type === 'image' ? imageTemplate : tileTemplate;
        util.applyTemplate(this, 'byu-calendar-row', template, () => {
            //apply listeners and such here

            var dateOb = this.date;
            console.log(dateOb);
            // --- isolate parts of the date
            // get month
            var monthName = months[dateOb.getMonth()];
            console.log(monthName);
            // get month abbreviation
            var monthAbb = monthAbbs[dateOb.getMonth()];

            // get day of the month
            var day = dateOb.getDate();

            // get day of week
            var weekday = weekdays[dateOb.getDay()];

            // get year
            var year = dateOb.getFullYear();

            // set those date pieces as values in the tile's divs
            if(this.type == 'image') {
                //this.shadowRoot.querySelector('month-abb').innerHTML = monthAbb;
                // idk if need to do stuff here idk
                this.shadowRoot.querySelector('#weekday').innerHTML = weekday;
            } else {
                this.shadowRoot.querySelector('#month-name').innerHTML = monthName;
                this.shadowRoot.querySelector('#year').innerHTML = year;
            }
            this.shadowRoot.querySelector('#day-number').innerHTML = day;

        });

    }
}


window.customElements.define('byu-calendar-row', ByuCalendarRow);
window.ByuCalendarRow = ByuCalendarRow;

