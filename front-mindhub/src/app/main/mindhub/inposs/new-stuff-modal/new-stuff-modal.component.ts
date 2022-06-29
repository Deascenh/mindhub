import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Stuff, StuffIllustration, StuffType } from '../models';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, filter, map, switchMap, tap } from 'rxjs/operators';
import { StuffTypeService } from '../services/data/stuff-type.service';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { StuffService } from '../services/data/stuff.service';

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
  datePickrOptions: FlatpickrOptions = {
    altInput: true,
    enableTime: true,
  };

  obtainingMethods: any[] = [
    { label: 'Acheté', value: 'bought' },
    { label: 'Obtenu gratuitement', value: 'gotFree' },
    { label: 'Offert / Donné', value: 'donation' },
    { label: 'Je ne m\'en souviens plus', value: 'dontRemember' },
  ];

  StuffIllustrationForm: FormGroup;
  SIFormSubmitted = false;
  typesFound: StuffType[] = [];
  searchTypes: Subject<string> = new Subject<string>();

  // getter for easy access to form fields
  get SIForm() {
    return this.StuffIllustrationForm.controls;
  }

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private stuffTypeService: StuffTypeService,
    private stuffService: StuffService,
  ) { }

  ngOnInit(): void {
    this.StuffIllustrationForm = this.fb.group(
      {
        types:[[], [Validators.required]],
        name: ['', [Validators.required]],
        price: [null],
        estimatedPrice: [null],
        priceEstimatedAt: [null],
        obtainingMethod: [[], [Validators.required]],
        obtainedAt: [[]],
      },
    );

    this.searchTypes.pipe(
      debounceTime(300),
      filter(keyword => !!keyword),
      tap(() => this.typesFound = []),
      switchMap((name: string) => this.stuffTypeService.getAll({ name: name })),
    ).subscribe(types => this.typesFound = types['hydra:member']);
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
    this.SIFormSubmitted = true;

    if (this.StuffIllustrationForm.valid) {
      console.log('valid', this.StuffIllustrationForm.value);

      this.handleTypesToLink().subscribe(newTypes => {
        const stuffValues = this.StuffIllustrationForm.value;
        const handleStuff = new Stuff({
          ...stuffValues,
          types: newTypes.map(type => type['@id']),
          priceEstimatedAt: stuffValues.priceEstimatedAt[0] instanceof Date ? stuffValues.priceEstimatedAt[0].toISOString() : undefined,
          obtainedAt: stuffValues.obtainedAt[0] instanceof Date ? stuffValues.obtainedAt[0].toISOString() : undefined,
        });

        this.stuffService.save(handleStuff).subscribe(stuff => this.stuff = stuff);
      });
    } else {
      console.log('invalid', this.StuffIllustrationForm.value);
      console.log('invalid', this.StuffIllustrationForm.errors);
    }

    // this.activeModal.close(this.stuff);
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
    return new StuffType({ name: name });
  }

  private handleTypesToLink(): Observable<StuffType[]> {
    const handleTypes = this.StuffIllustrationForm.get('types').value;
    const newTypes = handleTypes.filter(type => !!!type['@id']);

    if (newTypes.length > 0) {
      return forkJoin(newTypes.map(type => this.stuffTypeService.save(type)))
        .pipe(
          map(savedTypes => [
            ...handleTypes.filter(type => !!type['@id']),
            ...savedTypes,
          ]),
          tap(types => this.StuffIllustrationForm.patchValue({ types: types })),
        );
    }

    return of(handleTypes);
  }
}
