import { Component, OnInit } from '@angular/core';
import { HttpHelperService } from '../http-helper.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private tables:any = [];
  public isloading = false;

  constructor(private httpService: HttpHelperService) { }

  ngOnInit() {
    this.isloading = false;
    this.httpService.GET(environment.GET_TABLE).subscribe(e=>{
      console.log(e); 
      this.isloading = true;
      this.tables = e;
    })
  }

}
