o'use strict';
// these only need to be created or established once, so they are outside the class
const tileTemplate = require('./tile-row.html');
const imageTemplate = require('./image-row.html');

var months =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var monthAbbs = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday", "Saturday"];

class ByuCalendarRow extends HTMLElement {

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: 'open'});
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
        var dates = this.shadowRoot.querySelector("#date").assignedNodes();
        if(dates.length){
            var date = this.shadowRoot.querySelector("#date").assignedNodes()[0];
            console.log(date.innerText);
            return new Date(date.innerText.trim());
        }
        else {
            return null;
        }
    }
    connectedCallback(){
        // identify which template to use
        this._shadowRoot.innerHTML = this.type === 'image' ? imageTemplate : tileTemplate;

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
        var year = dateOb.getYear();

        // set those date pieces as values in the tile's divs
        if(this.type == 'image') {
            //this._shadowRoot.getElementById('month-abb').innerHTML = monthAbb;
            // idk if need to do stuff here idk
            this._shadowRoot.getElementById('weekday').innerHTML = weekday;
        } else {
            this._shadowRoot.getElementById('month-name').innerHTML = monthName;
            this._shadowRoot.getElementById('year').innerHTML = year;
        }
        this._shadowRoot.getElementById('day-number').innerHTML = day;

    }
}

window.customElements.define('byu-calendar-row', ByuCalendarRow);
window.ByuCalendarRow = ByuCalendarRow;

