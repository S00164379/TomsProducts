import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import { StarRatingComponent } from './star-rating/star-rating.component';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { environment } from 'src/environments/environment.prod';
import {Router, RouterModule, Routes} from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SignupComponent } from './signup/signup.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AuthGuard } from './service/auth.guard';
import {MatCard, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule} from '@angular/material';
import { AuthService } from './service/auth.service';
import { NotificationService } from './service/notification.service';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'


library.add(faStar);

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'product-list', component: ProductListComponent, canActivate: [AuthGuard]},
  {path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard]},
  {path: 'home', component: ProductListComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailsComponent,
    StarRatingComponent,
    NavBarComponent,
    LoginComponent,
    NotificationsComponent,
    SignupComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule
    ],
  providers: [AuthService, AuthGuard, NotificationService, AngularFireAuth],
  bootstrap: [AppComponent]
}) 
export class AppModule { }
