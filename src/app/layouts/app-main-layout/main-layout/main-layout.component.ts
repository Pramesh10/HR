import { CommonModule, NgClass } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive, NgIdleKeepaliveModule } from '@ng-idle/keepalive';


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NgClass, NgIdleKeepaliveModule,CommonModule],
  providers: [Keepalive],

  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements AfterViewInit {
  @ViewChild('sidebar') sidebar: ElementRef;
  @ViewChild('sidebarOverlay') sidebarOverlay: ElementRef;
  isFocused: boolean = false;

  dropdown1: Dropdown = { isFocused: false };
  dropdown2: Dropdown = { isFocused: false };
  subdropdown1: SubDropdown = { isFocused: false };
  subdropdown2: SubDropdown = { isFocused: false };

  // some fields to store our state so we can display it in the UI
  idleState = 'NOT_STARTED';
  countdown?: number;
  lastPing?: Date;
  /**
   *
   */

  constructor(
    private idle: Idle,
    cd: ChangeDetectorRef,
    keepalive: Keepalive,
    private router: Router
  ) {
    idle.setIdle(30); // how long can they be inactive before considered idle, in seconds
    idle.setTimeout(200); // how long can they be idle before considered timed out, in seconds
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES); // provide sources that will "interrupt" aka provide events indicating the user is active
    console.log('ctor');

    // do something when the user becomes idle
    idle.onIdleStart.subscribe(() => {
      console.log('TIMEOUT START');

      this.idleState = 'IDLE';
    });
    // do something when the user is no longer idle
    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'NOT_IDLE';
      console.log(`${this.idleState} ${new Date()}`);
      this.countdown = undefined;
      cd.detectChanges(); // how do i avoid this kludge?
    });
    // do something when the user has timed out
    idle.onTimeout.subscribe(() => {
      this.idleState = 'TIMED_OUT';
      this.router.navigateByUrl('/login');
      console.log('timed out');
    });
    // do something as the timeout countdown does its thing
    idle.onTimeoutWarning.subscribe((seconds) => {
      this.countdown = seconds;
    });

    // set keepalive parameters, omit if not using keepalive
    keepalive.interval(10); // will ping at this interval while not idle, in seconds
    keepalive.onPing.subscribe(() => (this.lastPing = new Date())); // do something when it pings
  }

  reset() {
    // we'll call this method when we want to start/reset the idle process
    // reset any component state and be sure to call idle.watch()
    this.idle.watch();
    this.idleState = 'NOT_IDLE';
    this.countdown = undefined;
    this.lastPing = undefined;
  }

  toggleDropdown(dropdown: Dropdown): void {
    dropdown.isFocused = !dropdown.isFocused;

    // Ensure only one dropdown is open at a time
    if (dropdown.isFocused) {
      // Close all other dropdowns
      if (dropdown !== this.dropdown1) {
        this.dropdown1.isFocused = false;
      }
      if (dropdown !== this.dropdown2) {
        this.dropdown2.isFocused = false;
      }
    }
  }

  toggleSubDropdown(subdropdown: SubDropdown): void {
    subdropdown.isFocused = !subdropdown.isFocused;
    if (subdropdown.isFocused) {
      // Close all other dropdowns
      if (subdropdown !== this.subdropdown1) {
        this.subdropdown1.isFocused = false;
      }
      if (subdropdown !== this.subdropdown2) {
        this.subdropdown2.isFocused = false;
      }
    }
  }

  ngAfterViewInit() {
    this.collapseSidebar();
  }

  ngOnInit(): void {
    this.reset();
  }

  isCollapsed: boolean = false;

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  collapseSidebarOnMouseLeave(): void {
    if (this.isCollapsed) {
      const dropdownMenus = document.querySelectorAll('.sidebar-dropdown-menu');
      dropdownMenus.forEach((menu: HTMLElement) => {
        menu.style.display = 'none';
      });

      // Remove 'focused' class from menu items if needed
      const focusedItems = document.querySelectorAll(
        '.sidebar-menu-item.has-dropdown.focused, .sidebar-dropdown-menu-item.has-dropdown.focused'
      );
      focusedItems.forEach((item: HTMLElement) => {
        item.classList.remove('focused');
      });
    }
  }

  collapseSidebar(): void {
    this.isCollapsed = true;
    const dropdownMenus = document.querySelectorAll('.sidebar-dropdown-menu');
    dropdownMenus.forEach((menu: HTMLElement) => {
      menu.style.display = 'none';
    });

    // Remove 'focused' class from menu items if needed
    const focusedItems = document.querySelectorAll(
      '.sidebar-menu-item.has-dropdown.focused, .sidebar-dropdown-menu-item.has-dropdown.focused'
    );
    focusedItems.forEach((item: HTMLElement) => {
      item.classList.remove('focused');
    });
    // Add logic to slide up dropdown menus and remove 'focused' class from menu items if needed
    const helperElement = document.querySelectorAll(
      'sidebar-menu-name-down'
    );
    helperElement.forEach((item: HTMLElement) => {
      item.style.display = 'none';
    });
  }

  //sidebar menu items implemetation
  public menuItems: any[];
}

export interface Dropdown {
  isFocused: boolean;
}

export interface SubDropdown {
  isFocused: boolean;
}


export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: NavigationItem[];
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/analytics',
        icon: 'feather icon-home'
      }
    ]
  },
  {
    id: 'ui-component',
    title: 'Ui Component',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'basic',
        title: 'Component',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'button',
            title: 'Button',
            type: 'item',
            url: '/component/button'
          },
          {
            id: 'badges',
            title: 'Badges',
            type: 'item',
            url: '/component/badges'
          },
          {
            id: 'breadcrumb-pagination',
            title: 'Breadcrumb & Pagination',
            type: 'item',
            url: '/component/breadcrumb-paging'
          },
          {
            id: 'collapse',
            title: 'Collapse',
            type: 'item',
            url: '/component/collapse'
          },
          {
            id: 'tabs-pills',
            title: 'Tabs & Pills',
            type: 'item',
            url: '/component/tabs-pills'
          },
          {
            id: 'typography',
            title: 'Typography',
            type: 'item',
            url: '/component/typography'
          }
        ]
      }
    ]
  },
  {
    id: 'Authentication',
    title: 'Authentication',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'signup',
        title: 'Sign up',
        type: 'item',
        url: '/auth/signup',
        icon: 'feather icon-at-sign',
        target: true,
        breadcrumbs: false
      },
      {
        id: 'signin',
        title: 'Sign in',
        type: 'item',
        url: '/auth/signin',
        icon: 'feather icon-log-in',
        target: true,
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'chart',
    title: 'Chart',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'apexchart',
        title: 'ApexChart',
        type: 'item',
        url: '/chart',
        classes: 'nav-item',
        icon: 'feather icon-pie-chart'
      }
    ]
  },
  {
    id: 'forms & tables',
    title: 'Forms & Tables',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'forms',
        title: 'Basic Elements',
        type: 'item',
        url: '/forms',
        classes: 'nav-item',
        icon: 'feather icon-file-text'
      },
      {
        id: 'tables',
        title: 'tables',
        type: 'item',
        url: '/tables',
        classes: 'nav-item',
        icon: 'feather icon-server'
      }
    ]
  },
  {
    id: 'other',
    title: 'Other',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'feather icon-sidebar'
      },
      {
        id: 'menu-level',
        title: 'Menu Levels',
        type: 'collapse',
        icon: 'feather icon-menu',
        children: [
          {
            id: 'menu-level-2.1',
            title: 'Menu Level 2.1',
            type: 'item',
            url: 'javascript:',
            external: true
          },
          {
            id: 'menu-level-2.2',
            title: 'Menu Level 2.2',
            type: 'collapse',
            children: [
              {
                id: 'menu-level-2.2.1',
                title: 'Menu Level 2.2.1',
                type: 'item',
                url: 'javascript:',
                external: true
              },
              {
                id: 'menu-level-2.2.2',
                title: 'Menu Level 2.2.2',
                type: 'item',
                url: 'javascript:',
                external: true
              }
            ]
          }
        ]
      }
    ]
  }
];
