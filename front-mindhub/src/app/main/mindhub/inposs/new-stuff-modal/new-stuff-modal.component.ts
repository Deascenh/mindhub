import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Stuff, StuffIllustration, StuffType } from '../models';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { StuffTypeService } from '../services/data/stuff-type.service';

export interface IllustrationSnapshot {
  illustration: StuffIllustration;
  snapshot: WebcamImage;
}

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
  snapshots: IllustrationSnapshot[] = [];
  errors: WebcamInitError[] = [];
  illustrationsOptions: SwiperConfigInterface = {};

  StuffIllustrationForm: FormGroup;
  SIFormSubmitted = false;
  typesSelected: StuffType[] = [];
  typesFound: StuffType[] = [];
  searchTypes: Subject<string> = new Subject<string>();

  // getter for easy access to form fields
  get SIForm() {
    return this.StuffIllustrationForm.controls;
  }

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private stuffTypeService: StuffTypeService
  ) { }

  ngOnInit(): void {
    this.StuffIllustrationForm = this.fb.group(
      {
        name: ['', Validators.required],
        price: [''],
        estimatedPrice: [''],
        priceEstimatedAt: [''],
        obtainingMethod: ['', [Validators.required]],
        obtainedAt: ['', [Validators.required]],
        types:[[]],
      },
    );

    this.searchTypes.pipe(
      debounceTime(300),
      switchMap((name: string) => this.stuffTypeService.getAll({ name: name })),
    ).subscribe(types => {
      console.log(types);
      this.typesFound = types['hydra:member'];
    });
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
    this.snapshots.push({
      snapshot: image,
      illustration: new StuffIllustration(),
    });
  }

  asMain(iSnapshot: IllustrationSnapshot) {
    this.snapshots.forEach(is => is.illustration.main = is === iSnapshot);
  }

  remove(iSnapshot: IllustrationSnapshot) {
    this.snapshots = this.snapshots.filter(is => is !== iSnapshot);
  }

  handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  /**
   * Select New Type
   *
   * @param name
   */
  selectAddTypeMethod(name) {
    return new StuffType({ name: name});
  }
}
