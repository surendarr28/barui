import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpHelperService } from '../http-helper.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  private sub: any;
  private tableId;
  private tableName;
  private tableCapacity: number;
  private orderItem;
  private orderId;
  public isloading;

  constructor(private route: ActivatedRoute, private httpService: HttpHelperService, public router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.tableId = params['table'];
      this.tableName = params["name"];
      this.tableCapacity = parseInt(params["capacity"]);
      console.log(this.tableId, "table id")
      this.getOrder();
    });
  }

  getOrder() {
    this.isloading = true;
    this.orderItem = [];
    this.httpService.GET(environment.GET_TABLE + "/" + this.tableId).subscribe((e: any) => {
      console.log(e);
      this.isloading = false;
      this.orderId = e.order;
      this.orderItem = e.data;
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  decrease(item) {
    if (item.quantity > 0) {
      item.quantity--;
      this.httpService.GET(environment.ADD_ITEM + "/" + this.orderId + "/" + item["id"] + "/" + -1).subscribe((e: any) => {
        console.log(e);
      })
    }
  }

  increase(item) {
    item.quantity++;
    this.httpService.GET(environment.ADD_ITEM + "/" + this.orderId + "/" + item["id"] + "/" + 1).subscribe((e: any) => {
      console.log(e);
    })
  }

  gotSearch(id) {
    this.router.navigate(["search", id]);
  }

  changeItemStatus(item) {
    if (item.status == 1) {
      this.httpService.GET(environment.UPDATE_ITEM + "/" + this.orderId + "/" + item["id"] + "/" + 2).subscribe((e: any) => {
        console.log(e, "ddddd");
        this.getOrder();
      })
    }
  }

  closeOrder() {
    this.httpService.GET(environment.UPDATE_ORDER + "/" + this.orderId + "/" + this.tableId + "/" + 2).subscribe((e: any) => {
      console.log(e, "ddddd");
      this.getOrder();
    })
  }

}
