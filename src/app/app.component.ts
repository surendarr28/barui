import { Component } from '@angular/core';

import { Location } from '@angular/common';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bar-order';
  showBack;
  constructor(private location: Location, public router: Router, private activatedRoute: ActivatedRoute) {
    router.events.subscribe((event: any) => {

      if (event instanceof NavigationStart) {
        // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
        if (this.router.url.indexOf("home") != -1 || this.router.url.indexOf("kitchen") != -1) {
          this.showBack = false;
        } else {
          this.showBack = true
        }
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
        console.log(event.error);
      }
    });

  }

  goBack() {
    console.log("back")
    this.location.back();
  }
}
