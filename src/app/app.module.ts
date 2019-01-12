import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpHelperService } from './http-helper.service';
import { OrderComponent } from './order/order.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { KitchenComponent } from './kitchen/kitchen.component';
import { KeysPipe } from './objectToArray.pipe';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Table List' }
  },
  {
    path: 'order/:table/:name/:capacity',
    component: OrderComponent,
    data: { title: 'Table order' }
  },
  {
    path: 'search/:order',
    component: SearchComponent,
    data: { title: 'Search item' }
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'kitchen',
    component: KitchenComponent,
    data: { title: 'Kitchen' }
  },
  { path: '**', component: HomeComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OrderComponent,
    SearchComponent,
    KitchenComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true,  useHash: true } // <-- debugging purposes only
    ),
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
