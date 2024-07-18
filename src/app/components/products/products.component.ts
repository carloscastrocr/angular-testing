import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  products: Product [] = [];
  //inyeccion de dependencias mediante constructor
  constructor(
    private producService : ProductsService
  ){}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    console.log('here')
    this.producService.getAllSimple().subscribe(products=>{
        this.products = products;
    });
  }
}
