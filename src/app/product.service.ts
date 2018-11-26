import { Injectable } from '@angular/core';
import { IProduct } from './iproduct';
import { Observable, observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _productUrl = 'http://localhost:3000/products';

  productsCollection: AngularFirestoreCollection<IProduct>;


  products: Observable<IProduct[]>;

  allProducts: IProduct[];
  errorMessage: string;

  constructor(private _http: HttpClient, private _afs: AngularFirestore) {
    this.productsCollection = _afs.collection<IProduct>("products");
   }

  getProducts(): Observable<IProduct[]> {
   this.products = this.productsCollection.snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as IProduct;
       console.log("getProduct:data" + JSON.stringify(data));
       const id = a.payload.doc.id;
       console.log("getProducts:id = " + id)
       return {id, ...data}
     }))
   );

   this.products.subscribe(data => console.log('getProducts' + data));
   return this.products;
  }

  deleteProduct(id:string): void {
    this.productsCollection.doc(id).delete()
    .catch(error => {console.log('deleteProduct Error: '+error); })
    .then(() => console.log('deleteProduct: id = ' + id));
  }

  addProduct(product: IProduct): void {
    this.productsCollection.add(product);
  }

  addAllproducts() {
    this._http.get<IProduct[]>(this._productUrl).subscribe(
      products => {
      this.allProducts = products;
      for (let product of this.allProducts) {
        console.log("Adding: " + product.bikeName);
        this.productsCollection.add(product);
      }
    }
    );
  }
}
