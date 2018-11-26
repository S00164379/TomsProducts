var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
var ProductService = /** @class */ (function () {
    function ProductService(_http, _afs) {
        this._http = _http;
        this._afs = _afs;
        this._productUrl = 'http://localhost:3000/products';
        this.productsCollection = _afs.collection("products");
    }
    ProductService.prototype.getProducts = function () {
        this.products = this.productsCollection.snapshotChanges().pipe(map(function (actions) { return actions.map(function (a) {
            var data = a.payload.doc.data();
            console.log("getProduct:data" + JSON.stringify(data));
            var id = a.payload.doc.id;
            console.log("getProducts:id = " + id);
            return __assign({ id: id }, data);
        }); }));
        this.products.subscribe(function (data) { return console.log('getProducts' + data); });
        return this.products;
    };
    ProductService.prototype.deleteProduct = function (id) {
        this.productsCollection.doc(id).delete()
            .catch(function (error) { console.log('deleteProduct Error: ' + error); })
            .then(function () { return console.log('deleteProduct: id = ' + id); });
    };
    ProductService.prototype.addProduct = function (product) {
        this.productsCollection.add(product);
    };
    ProductService.prototype.addAllproducts = function () {
        var _this = this;
        this._http.get(this._productUrl).subscribe(function (products) {
            _this.allProducts = products;
            for (var _i = 0, _a = _this.allProducts; _i < _a.length; _i++) {
                var product = _a[_i];
                console.log("Adding: " + product.bikeName);
                _this.productsCollection.add(product);
            }
        });
    };
    ProductService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient, AngularFirestore])
    ], ProductService);
    return ProductService;
}());
export { ProductService };
//# sourceMappingURL=product.service.js.map