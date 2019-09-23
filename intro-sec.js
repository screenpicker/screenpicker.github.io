import { LitElement, html, css } from './lit-element/lit-element.js?module';

class IntroSec extends LitElement {
    // static get styles() {
    //     return css`
    //       :host(:hover){
    //           cursor: zoom-out;
    //       }
          
    //     `;
    // }
    _fire(eventType) {
        this.dispatchEvent(new CustomEvent(eventType, { detail: 'IntroSec' }));   
    }

    render() {
        var video_w = 35 * 16; // 35 * 16
        var video_h = 35 *  9; // 30 *  9
        return html`
        <link rel="stylesheet" href="./css/common.css">
        <link rel="stylesheet" href="./css/intro-sec.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

        <section>
        <div class="container">
            <div id="intro-sec">
                <div id="intro-sec-left">

                    <div class="title">FREE! <BR> <I>No Install Need</I> </div>
                    <div class="content">
                        Only need Chrome 75.0+
                    </div>
                    
                    <div class="btn-vessel">
                        <button class="icon-btn" @click=${() => this._fire('onShot')}><i class="fa fa-camera btn-vessel-icon"></i> Screen Shot</button> 
                    </div>
                    
                    <div class="btn-vessel">
                        <button class="icon-btn" @click=${() => this._fire('onRecord')}><i class="fa fa-circle"></i> Screen Recorder</button>
                    </div>

                </div> 
                <div id="intro-sec-right">
                    <!--
                        <iframe width="${video_w}px" height="${video_h}px" src="https://www.youtube.com/" frameborder="0" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
                    -->
                    <video width="${video_w}" height="${video_h}"  playsinline  autoplay loop muted  >    
                        <source src="./ScreenPicker.mp4" type="video/mp4">
                    </video>
                </div> 
            </div>
        </div>
        </section>

        `;
    }
    
}
if(!window.customElements.get('intro-sec'))  window.customElements.define('intro-sec', IntroSec);
