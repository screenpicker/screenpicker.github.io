import { LitElement, html, css } from './lit-element/lit-element.js?module';

var l = console.log;

const Status_Inactive = "Inactive";
const Status_Recording = "Recording";
const Status_Finish = "Finish";


class RecordSec extends LitElement {

    constructor() {
        super();

        this.recordUrl = null;
        this.statusType = Status_Inactive;

        this.stream = null;
        this.chunks = [];
        this.mediaRecorder = null;
    }


    static get properties() {
        return {
          statusType: { 
            type: String
          }
        }
    }
    

    render() {
        console.log('in render()');
        var video_w = 800;
        var video_h = 450;
        var show = '';

        switch(this.statusType) {
            case Status_Inactive:
            default:
                show= html`<div class="container">   
                    <div class="btn-vessel"> 
                        <button class="icon-btn" @click=${() => this.record()}> 
                            <i class="fa fa-circle"></i> Screen Recroder
                        </button> 
                    </div> 
                    <div class="empty-broder">Your Screen Recorder</div>  
                </div>`;
                break;
            case Status_Recording:
                show = html`<div class="container">   
                    <video id="vid" width="${video_w}" height="${video_h}" autoplay .srcObject="${this.stream}"></video>
                    <div class="btn-row">
                        <button class="icon-btn" @click=${() => this._stopRecording()}> 
                            <i class="fa fa-stop"></i> Stop Recording
                        </button>  
                        <button class="icon-btn" @click=${() => this.record()}> 
                            <i class="fa fa-camera" ></i> New Reocord
                        </button> 
                    </div>
                </div>`;
                break;
            case Status_Finish:
                show = html`<div class="container">   
                <video id="vid"  width="${video_w}" height="${video_h}"  ?controls="${this.recordUrl !== null}" playsinline autoplay loop muted .src="${this.recordUrl}"></video>
                <div class="btn-row">
                    <button class="icon-btn" @click=${() => this._downloadRecord()}> 
                        <i class="fa fa-download"></i> Download
                    </button>  
                    <button class="icon-btn" @click=${() => this.record()}> 
                        <i class="fa fa-circle" ></i> New Reocord
                    </button> 
                </div>
                </div>`;
                break;
            
          }

        return html`
        <link rel="stylesheet" href="./css/common.css">
        <link rel="stylesheet" href="./css/record-sec.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

        <section id="record-sec">
        ${show}
        </section>
        <a id="downloadLink" type="video/webm" style="display: none"></a>
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

    //------------Record------------//
    async record(){  
        this.scrollIntoView();

        if (this.recordUrl) {
            window.URL.revokeObjectURL(this.recordUrl);
        }

        this.chunks = [];
        this.recordUrl = null;
        const constraints = {video: true, width : 800};
        l('Requesting screen...');
        this.stream = await navigator.mediaDevices.getDisplayMedia(constraints);
        // this.stream = await RecordSec._getDisplayStream(constraints);
        this.stream.addEventListener('inactive', e => {
            console.log('Capture stream inactive - stop recording!');
            if(this.mediaRecorder!=null){
                this._stopRecording(e);
            }
        });
        this.mediaRecorder = new MediaRecorder(this.stream, {mimeType: 'video/webm'});
        this.mediaRecorder.addEventListener('dataavailable', event => {
            if (event.data && event.data.size > 0) {
                this.chunks.push(event.data);
            }
        });
        this.mediaRecorder.start(10);
        
        this.statusType = Status_Recording;
    }
    static _getDisplayStream() {
        if (navigator.getDisplayMedia) {
            l("in a");
            return navigator.getDisplayMedia({video: true});
        } else if (navigator.mediaDevices.getDisplayMedia) {
            l("in b");
            return navigator.mediaDevices.getDisplayMedia({video: true});
        } else {
            l("in c");
            return navigator.mediaDevices.getUserMedia({video: {mediaSource: 'screen'}});
        }
    }
    
    _stopRecording(e) {
        if(this.mediaRecorder != null){
            console.log('Stop recroding 222');

            this.mediaRecorder.stop();
            this.mediaRecorder = null;
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;

            this.recordUrl= window.URL.createObjectURL(new Blob(this.chunks, {type: 'video/webm'}));
                
            this.statusType = Status_Finish;
        }   
    }

    _downloadRecord(e) {
        console.log('Download record.');
        var timeStr = new Date().toLocaleString();

        const downloadLink = this.shadowRoot.querySelector('a#downloadLink');
        downloadLink.addEventListener('progress', e => console.log(e));
        downloadLink.href = this.recordUrl;
        downloadLink.download = timeStr + '.webm';
        downloadLink.click();
    }
}

if(!window.customElements.get('record-sec'))  window.customElements.define('record-sec', RecordSec);
