import { Component, OnInit } from '@angular/core';
import {AdminService} from '../_service/admin.service';
import {FormBuilder} from '@angular/forms';
import {ProductModel} from '../_model/products.model';
import {MainService} from '../_service/main.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SubcategoryModel} from '../_model/subcategory.model';
import {CategoryModel} from '../_model/category.model';
import {CartModel} from '../_model/cart.model';
import {CartService} from '../_service/cart.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  pid: number;
  product: ProductModel;
  category: CategoryModel;
  subcategory: SubcategoryModel;

  constructor(private service: MainService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private cart: CartService) {}

  ngOnInit(): void {

    // this.cid = parseInt(this.route.snapshot.paramMap.get('cid'));
    // this.sid = parseInt(this.route.snapshot.paramMap.get('sid'));
    this.pid = parseInt(this.route.snapshot.paramMap.get('pid'));

    // this.service.getCart().subscribe(response => {
    //   this.cart = response;
    //   console.log(this.product);
    // }, error => console.log(error));

    this.service.getCategoryOfProduct(this.pid).subscribe(response => {
      this.category = response;
      console.log(this.product);
    }, error => console.log(error));

    this.service.getSubcategoryOfProduct(this.pid).subscribe(response => {
      this.subcategory = response;
      console.log(this.product);
    }, error => console.log(error));

    this.service.getProduct(this.pid).subscribe(response => {
      this.product = response;
      console.log(this.product);
    }, error => console.log(error));
  }

  addToCart(quantity: number) {
    this.cart.addToCart(this.pid, quantity);
    console.log(this.cart.getQuantity());
    window.location.reload();
  }
}
