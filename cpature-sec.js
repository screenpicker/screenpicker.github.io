import { LitElement, html, css } from './lit-element/lit-element.js?module';


// const options = {
//     video: {
//         cursor: "never",
//         displaySurface: "browser"
//     }
// }



class CaptureSec extends LitElement {

    constructor() {
        super();
        // this.shoted = false;

        this.shotUrl = null;
    }


    static get properties() {
        return {
          shoted: { 
            type: Boolean, 
            reflect: false 
          },shotTimeStr: { 
            type: String 
          }
        }
      }
    

    render() {
        console.log('in render()');
        var show = '';
        if (!this.shoted){
            show= html`<div class="container">   
                <div class="btn-vessel"> 
                    <button class="icon-btn" @click=${() => this.shot()}> 
                        <i class="fa fa-camera"></i> Screen Capture
                    </button> 
                </div> 
                <div class="empty-broder">Your Screen Capture Image</div>  
            </div>`;
        }else{
            show = html`<div class="container">   
            <div class="shoted-vessel">
                <img id="shoted-img" height="500" src="${this.shotUrl}"> </img> 
            
                <div class="btn-row">
                    <button class="icon-btn" @click=${() => this.shotUrl2Save()}> 
                        <i class="fa fa-download"></i> Download
                    </button>  
                    <button class="icon-btn" @click=${() => this.shot()}> 
                        <i class="fa fa-camera" ></i> New Shot
                    </button> 
                </div>
            </div>`;
        }
        
        return html`
        <link rel="stylesheet" href="./css/common.css">
        <link rel="stylesheet" href="./css/capture-sec.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

        <section class="bg-light" id="capture-sec">
        ${show}
        </section>

        `;
    }
    firstUpdated(changedProperties) {
        changedProperties.forEach((oldValue, propName) => {
            console.log(`${propName} changed. oldValue: ${oldValue}`);
        });

    }

    updated(changedProperties) {
        changedProperties.forEach((oldValue, propName) => {
          console.log(`${propName} changed. oldValue: ${oldValue}`);
        });
        // let b = this.shadowRoot.getElementById('b');
        // b.focus();
    }

    //------------Shot------------//
    async shot(){  
        let shotCanvas = await this._toCanvas();
        this.shotUrl = shotCanvas.toDataURL();

        this.shoted = true;
        this.shotTimeStr = new Date().toLocaleString();
        
        this.scrollIntoView();
    }

    
    _draw(video) {
        let canvas = document.createElement("canvas");
        video.width = canvas.width = video.videoWidth;
        video.height = canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0);
    
        video.srcObject.getTracks().forEach(track => track.stop());
        video.srcObject = null;
        
        return canvas;
    }
    
    // async _msleep(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }
    
      
    _msleep(milliseconds) 
    { 
        var start = new Date().getTime(); 
        while(1)
            if ((new Date().getTime() - start) > milliseconds)
                break;
    }
    async _toCanvas(){
        // let stream = await navigator.mediaDevices.getDisplayMedia(options);
        let stream = await navigator.mediaDevices.getDisplayMedia();
        var video = document.createElement("video");
        video.srcObject = stream;
        video.play();
        
        return new Promise(resolve => {
            video.addEventListener("canplay", e => {
                this._msleep(1000);
                let canvas = this._draw(video);
                resolve(canvas);

            }, {once:true});
        });
    }

    shotUrl2Save(){
        
        // var form = document.createElement("form");
        // form.action = dataURL.replace(/:[\w-/]+(?=,)/, ":application/octet-stream");
        // form.method = "GET";
        // document.body.appendChild(form);
        // form.submit();

        var a = document.createElement("a");
        a.download = this.shotTimeStr;
        a.href = this.shotUrl;
        document.body.appendChild(a);
        a.click();
    }

    
}

if(!window.customElements.get('capture-sec'))  window.customElements.define('capture-sec', CaptureSec);
