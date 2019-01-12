import { Component, OnInit } from '@angular/core';
import { HttpHelperService } from '../http-helper.service';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private sub: any;

  private searchApi;
  private searchResult;
  private selectedValue = {};
  private quantity = 1;

  private orderId;

  constructor(private httpService: HttpHelperService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.orderId = params["order"];
      this.searchApi = this.httpService.GET(environment.SEARCH_ITEM + "/i").subscribe((e: any) => {
        console.log(e);
        this.searchResult = e
      })
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  search(key) {
    if (key.target.value) {
      let searchValue = key.target.value.toLowerCase();
      if (this.searchApi) {
        this.searchApi.unsubscribe();
      }
      this.searchApi = this.httpService.GET(environment.SEARCH_ITEM + "/" + searchValue).subscribe((e: any) => {
        console.log(e);
        this.searchResult = e
      })
    }
  }

  selectedItem(item) {
    this.quantity = 1;
    this.selectedValue = item;
  }

  addQuantity() {
    this.httpService.GET(environment.ADD_ITEM + "/" + this.orderId + "/" + this.selectedValue["id"] + "/" + this.quantity).subscribe((e: any) => {
      console.log(e);
    })
  }

}
