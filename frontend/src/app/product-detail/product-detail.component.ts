import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Product } from '../products';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product = {
    _id: '',
    prod_name: '',
    prod_desc: '',
    prod_price: null,
    updated_at: null
}

isLoadingResults= true;

  constructor(private api: ApiService, private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route)
    this.getProductDetails(this.route.snapshot.params['id']);
    
  }

  getProductDetails(id: any){
    this.api.getProduct(id)
    .subscribe((data: any)=>{
      this.product = data
      console.log(this.product);
      this.isLoadingResults = false;
    })
  }

  deleteProduct(id: any){
    this.isLoadingResults = true;
    this.api.deleteProduct(id)
    .subscribe((res)=>{
      this.isLoadingResults = false;
      this.router.navigate(['products']);
    }, (err =>{
      console.log(err);
      this.isLoadingResults = false;
    }))
  }

}
