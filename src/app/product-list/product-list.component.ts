import { Component, OnInit } from '@angular/core';
import { IProduct } from '../iproduct';
import { providerDef } from '@angular/core/src/view';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})
export class ProductListComponent implements OnInit {

  mensfilter;
  womanfilter;
  kidsfilter;


  filteredProducts: IProduct[];
  _listFilter: string;

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;

  }



  showImage = true;

  constructor(private _productservice: ProductService) {
  }

  products: IProduct[];


  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.category.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  performFilter2(): void {

    this.filteredProducts = null;

    if (this.mensfilter === true) {
      if (this.filteredProducts === null) {
        this.filteredProducts = this.performFilter('mens');
      } else {
        this.filteredProducts = this.filteredProducts.concat(this.performFilter('mens'));
      }
    }

    if (this.womanfilter === true) {
      if (this.filteredProducts === null) {
        this.filteredProducts = this.performFilter('womens');
      } else {
        this.filteredProducts = this.filteredProducts.concat(this.performFilter('womens'));
      }
    }
    if (this.kidsfilter === true) {
      if (this.filteredProducts === null) {
        this.filteredProducts = this.performFilter('kids');
      } else {
        this.filteredProducts = this.filteredProducts.concat(this.performFilter('kids'));
      }
    }
    if (this.filteredProducts === null) {
      this.filteredProducts = this.products;
    }
  }

  hideimage(): void {

    this.showImage = !this.showImage;
  }

  deleteProduct(id: string): void {
    this._productservice.deleteProduct(id);
  }

  ngOnInit() {
    this._productservice.getProducts().subscribe(data => {
    this.products = data,
      this.filteredProducts = this.products;
    });

  }
}
