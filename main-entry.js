// import { LitElement, html, css } from './lit-element/lit-element.js?module';
import { LitElement, html, css } from './lit-element/lit-element.js?module';
import './menu-bar.js'
import './intro-sec.js'
import './cpature-sec.js'
import './record-sec.js'

class MainEntry extends LitElement {

    getAllMethods(object) {
        return Object.getOwnPropertyNames(object).filter(function(property) {
            return typeof object[property] == 'function';
        });
    }
    
    _screen_shot(e) {
        console.log('MainEntry() _screen_shot, who click:' + e.detail)
        let elmnt = this.shadowRoot.getElementById('shot-sec');
        elmnt.shot();
        // elmnt.scrollIntoView();
    }

    _screen_record(e) {
        console.log('MainEntry() _screen_record, who click:' + e.detail)
        let elmnt = this.shadowRoot.getElementById('record-sec');
        elmnt.record();
        // elmnt.scrollIntoView();
    }
    render() {
        return html`
        <link rel="stylesheet" href="./css/common.css">
        <link rel="stylesheet" href="./css/main-entry.css">
        <menu-bar @onShot=${this._screen_shot} @onRecord=${this._screen_record}></menu-bar>
        <header></header>
        <intro-sec @onShot=${this._screen_shot} @onRecord=${this._screen_record}></intro-sec>
        <capture-sec id="shot-sec"></capture-sec>
        <record-sec id="record-sec"></record-sec>
        `;
    }
    
}
if(!window.customElements.get('main-entry'))  window.customElements.define('main-entry', MainEntry);