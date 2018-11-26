var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ProductService } from '../product.service';
var ProductListComponent = /** @class */ (function () {
    function ProductListComponent(_productservice) {
        this._productservice = _productservice;
        this.showImage = true;
    }
    Object.defineProperty(ProductListComponent.prototype, "listFilter", {
        get: function () {
            return this._listFilter;
        },
        set: function (value) {
            this._listFilter = value;
            this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
        },
        enumerable: true,
        configurable: true
    });
    ProductListComponent.prototype.performFilter = function (filterBy) {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter(function (product) {
            return product.category.toLocaleLowerCase().indexOf(filterBy) !== -1;
        });
    };
    ProductListComponent.prototype.performFilter2 = function () {
        this.filteredProducts = null;
        if (this.mensfilter === true) {
            if (this.filteredProducts === null) {
                this.filteredProducts = this.performFilter('mens');
            }
            else {
                this.filteredProducts = this.filteredProducts.concat(this.performFilter('mens'));
            }
        }
        if (this.womanfilter === true) {
            if (this.filteredProducts === null) {
                this.filteredProducts = this.performFilter('womens');
            }
            else {
                this.filteredProducts = this.filteredProducts.concat(this.performFilter('womens'));
            }
        }
        if (this.kidsfilter === true) {
            if (this.filteredProducts === null) {
                this.filteredProducts = this.performFilter('kids');
            }
            else {
                this.filteredProducts = this.filteredProducts.concat(this.performFilter('kids'));
            }
        }
        if (this.filteredProducts === null) {
            this.filteredProducts = this.products;
        }
    };
    ProductListComponent.prototype.hideimage = function () {
        this.showImage = !this.showImage;
    };
    ProductListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._productservice.getProducts().subscribe(function (data) {
            _this.products = data,
                _this.filteredProducts = _this.products;
        });
    };
    ProductListComponent = __decorate([
        Component({
            selector: 'app-product-list',
            templateUrl: './product-list.component.html',
            styleUrls: ['./product-list.component.css'],
            providers: [ProductService]
        }),
        __metadata("design:paramtypes", [ProductService])
    ], ProductListComponent);
    return ProductListComponent;
}());
export { ProductListComponent };
//# sourceMappingURL=product-list.component.js.map