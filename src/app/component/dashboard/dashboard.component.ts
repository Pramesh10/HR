import { CommonModule, DatePipe } from '@angular/common';
import {
  afterNextRender,
  Component,
  OnInit,
  Renderer2,
  CUSTOM_ELEMENTS_SCHEMA,
  HostListener,
  ViewChild,
  ElementRef,
  inject,
  OnDestroy,
} from '@angular/core';

import { MenuItem, MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ChartModule } from 'primeng/chart';
import { Swiper, SwiperOptions } from 'swiper/types';
import { environment } from '../../../environments/environment';
import { AttendanceServicesService } from '../components-services/attendance-services.service';
import { Subscription } from 'rxjs';
import { format } from 'node:path';
import { CheckinCheckoutComponent } from '../checkin-checkout/checkin-checkout.component';
import { AttendanceListComponent } from "../attendance-list/attendance-list.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CardModule,
    CommonModule,
    ToastModule,
    ChartModule,
    CheckinCheckoutComponent,
    AttendanceListComponent
],
  providers: [MessageService, DatePipe],

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardComponent implements OnInit, OnDestroy {
  isCheckedIn: boolean = false;
  clockBtnText: string = 'Clock In';

  headerMessage: string = "Let's go to work!!";

  basicData: any;

  basicOptions: any;

  data: any;

  options: any;
  items: MenuItem[] | undefined;

  /**
   *
   */
  constructor(
    private messageService: MessageService,
    private datePipe: DatePipe
  ) {
    afterNextRender((): void => {
      // Init Swiper
      this.updateSwiperConfig(window.innerWidth);
    });
  }

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicData = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Sales',
          data: [540, 325, 702, 620],
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
          ],
          borderWidth: 1,
        },
      ],
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };

    this.data = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400'),
          ],
        },
      ],
    };

    this.options = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
    };

    //get the data from the API Attendace Table

    this.getLocation();
    
  }

  //Validation of Client's Date
  //Validation of Client's Date

  ////speeddials
  ////speeddials
  ////speeddials
  showDials = false;

  toggleDials() {
    this.showDials = !this.showDials;
  }

  ///slider card slider card
  ///slider card slider card
  ///slider card slider card
  ///slider card slider card
  ///slider card slider card

  @ViewChild('swiperContainer') swiperContainerRef!: ElementRef;
  public swiperParams!: SwiperOptions;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const target = event.target as Window;
    this.updateSwiperConfig(target.innerWidth);
  }

  updateSwiperConfig(width: number) {
    if (width < 600) {
      // this.swiperConfig.slidesPerView = 1;
      this.swiperParams = {
        slidesPerView: 1.5,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        // pagination: {
        //   el: '.swiper-pagination',
        //   clickable: true,
        // },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        mousewheel: {
          invert: true,
        },
        keyboard: {
          enabled: true,
        },
      };

      Object.assign(this.swiperContainerRef.nativeElement, this.swiperParams); // Add parameters to the Swiper
      this.swiperContainerRef.nativeElement.initialize(); // Init Swiper
    } else {
      this.swiperParams = {
        slidesPerView: 3.5,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        // pagination: {
        //   el: '.swiper-pagination',
        //   clickable: true,
        // },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        mousewheel: {
          invert: true,
        },
        keyboard: {
          enabled: true,
        },
      };

      Object.assign(this.swiperContainerRef.nativeElement, this.swiperParams); // Add parameters to the Swiper
      this.swiperContainerRef.nativeElement.initialize(); // Init Swiper
    }
  }

  ///slider card slider card end
  ///slider card slider card end
  ///slider card slider card end

  

  ///Get the location of the current user
  ///Get the location of the current user
  lat: any;
  lng: any;
  getLocation() {
    if (navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position) {
            console.log(
              'Latitude: ' +
                position.coords.latitude +
                'Longitude: ' +
                position.coords.longitude
            );
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            console.log(this.lat);
            console.log(this.lng);
          }
        },
        (error) => console.log(error)
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  ///ON Component destroy
  ///ON Component destroy
  ngOnDestroy(): void {

  }
}
