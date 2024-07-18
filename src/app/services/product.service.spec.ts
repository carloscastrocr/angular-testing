import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { environment } from './../../environments/environment';
describe('ProductService', () => {
  let productService: ProductService;
  let httpController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      //imports : [HttpClientTestingModule],
      providers:[
        ProductService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    productService = TestBed.inject(ProductService);
    httpController = TestBed.inject(HttpTestingController);
  });

 /* afterEach(() => {
    // Verify that none of the tests make any extra HTTP requests.
    TestBed.inject(HttpTestingController).verify();
  });*/

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  describe('tests for getAllSimple',()=>{
    it('should return product list',(doneFn)=>{
      //arrange
      const mockData: Product[] = [
        {
          id: '123',
          title: 'title',
          price: 12,
          description:'hjk',
          category: {
            id: 112,
            name: 'as'
          },
          images: ['img','img']
        }
      ];
      //Act
      productService.getAllSimple().subscribe((data)=>{
        //Assert
        expect(data.length).toEqual(mockData.length);
        expect(data).toEqual(mockData);
        doneFn();
      });
      //http config
      const apiUrl = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(apiUrl);
      req.flush(mockData);
      httpController.verify();
    });
  });
});
