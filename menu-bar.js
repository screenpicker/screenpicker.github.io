import { LitElement, html, css } from './lit-element/lit-element.js?module';

class MenuBar extends LitElement {

  startCapture(displayMediaOptions) {
    let captureStream = null;
  
    return navigator.mediaDevices.getDisplayMedia(displayMediaOptions)
      .catch(err => { console.error("Error:" + err); return null; });
  }

  _menu_capture_click(e) {
    e.preventDefault();
    console.log('in _menu_capture_click')
    
  }

  ttt3(){
    console.log('in ttt3');
  }

  _fire(eventType) {
    this.dispatchEvent(new CustomEvent(eventType, { detail: 'MenuBar' }));   
  }

  render() {
    return html`
    <link rel="stylesheet" href="./css/common.css">
    <link rel="stylesheet" href="./css/menu-bar.css">
    <nav class="navbar bg-secondary text-uppercase fixed-top" id="menu-bar">
      <div class="container">
          <a class="menu-brand">ScreenPicker.com</a>
          <ul class="navbar-nav ml-auto">
              <li class="nav-item mx-0 mx-lg-1">
                  <a class="menu-link py-3 px-0 px-lg-3 rounded" @click=${() => this._fire('onShot')}>Screen Capture</a>
              </li>
              <li class="nav-item mx-0 mx-lg-1">
                  <a class="menu-link py-3 px-0 px-lg-3 rounded" @click=${() => this._fire('onRecord')}>Screen Recorder</a>
              </li>

          </ul>

      </div>
    </nav>

    `;
  }
}

if(!window.customElements.get('menu-bar'))  window.customElements.define('menu-bar', MenuBar);