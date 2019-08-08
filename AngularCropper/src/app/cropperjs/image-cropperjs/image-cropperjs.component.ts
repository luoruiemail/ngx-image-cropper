import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
// import Cropper from 'cropperjs';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-cropperjs',
  templateUrl: './image-cropperjs.component.html',
  //styleUrls: ['./image-cropperjs.component.css']
  encapsulation: ViewEncapsulation.None
})
export class ImageCropperjsComponent implements AfterViewInit {
  // ngAfterViewInit(): void {
  //   debugger
  //   let image = <HTMLImageElement>document.getElementById('image');
  //   this.cropper = new Cropper(image, {
  //     aspectRatio: 16 / 9,
  //     viewMode:1,
  //     crop: function (e) {
  //       console.log(e.detail.x);
  //       console.log(e.detail.y);
  //       console.log(e.detail.width);
  //       console.log(e.detail.height);
  //       console.log(e.detail.rotate);
  //       console.log(e.detail.scaleX);
  //       console.log(e.detail.scaleY);
  //     }
  //   });
  // }

  ngAfterViewInit(): void {
    this.getBase64(`http://${window.location.host}/assets/image/chelun.gif`)
  }

  getBase64(imgUrl) {
    const self = this;
    var xhr = new XMLHttpRequest();
    xhr.open("get", imgUrl, true);
    // 至关重要
    xhr.responseType = "blob";
    xhr.onload = function () {
      if (this.status == 200) {
        //得到一个blob对象
        var blob = this.response;
        console.log("blob", blob)
        // 至关重要
        let oFileReader = new FileReader();
        oFileReader.onloadend = function (e) {
          let base64 = e.target;
          self.base64String = (<any>base64).result;
          console.log("方式一》》》》》》》》》", base64)
        };
        oFileReader.readAsDataURL(blob);
        //====为了在页面显示图片，可以删除====
        // var img = document.createElement("img");
        // img.onload = function (e) {
        //   window.URL.revokeObjectURL(img.src); // 清除释放
        // };
        // let src = window.URL.createObjectURL(blob);
        // img.src = src
        // document.getElementById("container1").appendChild(img);
        //====为了在页面显示图片，可以删除====

      }
    }
    xhr.send();
  }
  base64String: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    debugger
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  cropper: any;
  constructor() { }

  ngOnInit() {

  }

  getImgUrl($event) {
    debugger
    let data = window.URL.createObjectURL($event.path[0].files[0]);
    this.cropper.replace(data);
    console.log($event);
  }
  rotateRight() {
    debugger
    console.log(this.cropper.getData());
    this.cropper.rotate(90);
  }
}
