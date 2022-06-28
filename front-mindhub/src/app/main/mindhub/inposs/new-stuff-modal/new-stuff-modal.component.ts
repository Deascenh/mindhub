import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Stuff, StuffIllustration } from '../models';
import { Subject } from 'rxjs';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-new-stuff-modal',
  templateUrl: './new-stuff-modal.component.html',
  styleUrls: ['./new-stuff-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NewStuffModalComponent implements OnInit, AfterViewInit {
  stuff: Stuff = new Stuff();
  illustrations: StuffIllustration[] = [];

  cameraOn: boolean = false;
  cameraTrigger: Subject<any> = new Subject<void>();
  snapshots: WebcamImage[] = [];
  errors: WebcamInitError[] = [];
  illustrationsOptions: SwiperConfigInterface = {};


  constructor(
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.illustrationsOptions = {
      slidesPerView: 5,
      spaceBetween: 50,
      navigation: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      breakpoints: {
        1024: {
          slidesPerView: 4,
          spaceBetween: 40
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 10
        }
      }
    }
  }

  dismiss() {
    this.activeModal.dismiss('nothing');
  }

  submit() {
    this.activeModal.close(this.stuff);
  }

  toggleCamera() {
    this.cameraOn = !this.cameraOn;
  }

  triggerSnapshot() {
    this.cameraTrigger.next();
  }

  handleCapture(image: WebcamImage) {
    this.snapshots.push(image);
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }
}
