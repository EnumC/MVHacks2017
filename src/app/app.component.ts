import {Component} from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import {Router} from "@angular/router";
import {MaterializeModule} from "angular2-materialize";
import {Http, Request, Response, Headers, HttpModule} from '@angular/http';
import {WebCamComponent} from  'ack-angular-webcam';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public webcam;//will be populated by ack-webcam [(ref)]
    public base64;

    options = {
        audio: false,
        video: true,
        width: window.screen.width,
        height: window.screen.height,
        fallbackMode: 'callback',
        fallbackSrc: 'jscam_canvas_only.swf',
        fallbackQuality: 85,
        cameraType: 'front' || 'back'
      };

    constructor(public http: Http){}
    genBase64(){
        this.webcam.getBase64()
        .then( base=>this.base64=base)
        .catch( e=>console.error(e) )
      }
     
      //get HTML5 FormData object and pretend to post to server
      genPostData(){
        this.webcam.captureAsFormData({fileName:'file.jpg'})
        .then( formData=>this.postFormData(formData) )
        .catch( e=>console.error(e) )
      }
     
      //a pretend process that would post the webcam photo taken
      postFormData(formData){

        
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        this.http.post(
            'https://enumc-web.herokuapp.com/mvhackathon2017/CognitiveWebAppPractice/STT.php', 
            {formData: "hi"},
            {headers:headers}
        ).map(
            (res: Response) => res.json()
        ).subscribe(
            (res:any) => {
                // this.postResponse = res;
                console.log("VALUE RECEIVED: ",res);
            },
            (x) => {
                /* this function is executed when there's an ERROR */
                console.log("ERROR: "+x);
            },
            () => {
                /* this function is executed when the observable ends (completes) its stream */
                console.log("Completed");
            }
        );







     
        // const request = new Post(config)
        console.log('test');
        // return this.http.post("https://enumc.com/mvhackathon2017/CognitiveWebAppPractice/STT.php", formData);
        
      }
     
      onCamError(err){}
     
      onCamSuccess(){}
}
