import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHelperService } from '../http-helper.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {

  constructor(private route: ActivatedRoute, private httpService: HttpHelperService, public router: Router) { }

  private kitchenOrder;
  private isLoading;

  ngOnInit() {
    this.getOrder();
  }

  getOrder() {
    this.isLoading = true;
    this.httpService.GET(environment.KITCHE_ORDER).subscribe((e: any) => {
      console.log(e, "kitchen");
      this.isLoading = false;
      this.kitchenOrder = e.data;
    })
  }

  changeItemStatus(item) {
    this.httpService.GET(environment.KITCHE_ORDER + "/" + item.key + "/" + item.value[0].table_id + "/" + 1 + "/" + 2).subscribe((e: any) => {
      console.log(e, "ddddd");
      this.getOrder();
    })
  }

}
