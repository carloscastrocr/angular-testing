import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpStatusCode, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product.model';
import { environment } from './../../environments/environment';
import { generateManyProducts, generateOneProduct } from '../models/product.mock';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { TokenService } from './token.service';
describe('ProductService', () => {
  let productService: ProductService;
  let httpController: HttpTestingController;
  let tokenService: TokenService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      //imports : [HttpClientTestingModule],
      providers:[
        ProductService,
        TokenService,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    productService = TestBed.inject(ProductService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

 afterEach(() => {
    // Verify that none of the tests make any extra HTTP requests.
    TestBed.inject(HttpTestingController).verify();
    //httpController.verify();
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  describe('tests for getAllSimple',()=>{
    it('should return product list',(doneFn)=>{
      //arrange
      const mockData: Product[] = generateManyProducts(3);
      spyOn(tokenService, 'getToken').and.returnValue('123');
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
      const headers = req.request.headers;
      expect(headers.get('Authorization')).toEqual(`Bearer 123`);
      req.flush(mockData);
      //httpController.verify();
    });
  });

  describe('tests for getAll',()=>{
    it('should return product list',(doneFn)=>{
      //arrange
      const mockData: Product[] = generateManyProducts(3);
      //Act
      productService.getAll().subscribe((data)=>{
        //Assert
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });
      //http config
      const apiUrl = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(apiUrl);
      req.flush(mockData);
      //httpController.verify();
    });

    it('should return product list with taxes',(doneFn)=>{
      //arrange
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price:100,//100 * .19 =19
        },
        {
          ...generateOneProduct(),
          price:200,//200 * .19 = 38
        },
        {
          ...generateOneProduct(),
          price:0,//0 * .19 = 0
        },
        {
          ...generateOneProduct(),
          price:-100,//= 0
        }
      ]
      //Act
      productService.getAll().subscribe((data)=>{
        //Assert
        expect(data.length).toEqual(mockData.length);
        expect(data[0].taxes).toEqual(19);
        expect(data[1].taxes).toEqual(38);
        expect(data[2].taxes).toEqual(0);
        expect(data[3].taxes).toEqual(0);
        doneFn();
      });
      //http config
      const apiUrl = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(apiUrl);
      req.flush(mockData);
      //httpController.verify();
    });

    it('should send query params with limit 10 and offset 3',(doneFn)=>{
      //arrange
      const mockData: Product[] = generateManyProducts(3);
      const limit = 10;
      const offset = 3;
      //Act
      productService.getAll(limit, offset).subscribe((data)=>{
        //Assert
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });
      //http config
      const apiUrl = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
      const req = httpController.expectOne(apiUrl);
      req.flush(mockData);
      const params = req.request.params;
      expect(params.get('limit')).toEqual(`${limit}`);
      //httpController.verify();
    });
  });

  describe('test for create',()=>{
    it('should return product a new product',(doneFn)=>{
      //arrange
      const mockData: Product = generateOneProduct();
      const dto: CreateProductDTO = {
        title: 'new Product',
        price: 100,
        images: ['img'],
        description:'bla blas',
        categoryId: 12
      }
      //Act
      //{...dto} pasas la referencia no el valor
      productService.create({...dto}).subscribe((data)=>{
        //Assert
        expect(data).toEqual(mockData);
        doneFn();
      });
      //http config
      const apiUrl = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(apiUrl);
      // Proveer una respuesta simulada a una solicitud HTTP.
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('POST');
      //httpController.verify();
    });
  });

  describe('test for update',()=>{
    it('should return updated product',(doneFn)=>{
      //arrange
      const mockData: Product = generateOneProduct();
      const dto: UpdateProductDTO = {
        title: 'new Product',
      }
      const productID = '1';
      //Act
      //{...dto} pasas la referencia no el valor
      productService.update(mockData.id,{...dto}).subscribe((data)=>{
        //Assert
        expect(data).toEqual(mockData);
        doneFn();
      });
      //http config
      const apiUrl = `${environment.API_URL}/api/v1/products/${mockData.id}`;
      const req = httpController.expectOne(apiUrl);
      // Proveer una respuesta simulada a una solicitud HTTP.
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('PUT');
      //httpController.verify();
    });
  });

  describe('test for delete',()=>{
    it('should return boolean',(doneFn)=>{
      //arrange
      const mockData: Product = generateOneProduct();
      //Act
      //{...dto} pasas la referencia no el valor
      productService.delete(mockData.id).subscribe((data)=>{
        //Assert
        expect(data).toEqual(true);
        doneFn();
      });
      //http config
      const apiUrl = `${environment.API_URL}/api/v1/products/${mockData.id}`;
      const req = httpController.expectOne(apiUrl);
      // Proveer una respuesta simulada a una solicitud HTTP.
      req.flush(true);
      expect(req.request.method).toEqual('DELETE');
      //httpController.verify();
    });
  });

  describe('test for getOne',()=>{
    it('should return a product',(doneFn)=>{
      //arrange
      const mockData: Product = generateOneProduct();
      const productID = '1';
      //Act
      //{...dto} pasas la referencia no el valor
      productService.getOne(mockData.id).subscribe((data)=>{
        //Assert
        expect(data).toEqual(mockData);
        doneFn();
      });
      //http config
      const apiUrl = `${environment.API_URL}/api/v1/products/${mockData.id}`;
      const req = httpController.expectOne(apiUrl);
      // Proveer una respuesta simulada a una solicitud HTTP.
      req.flush(mockData);
      expect(req.request.method).toEqual('GET');
      //httpController.verify();
    });

    it('should return the right msg when the status code is 404',(doneFn)=>{
      //arrange
      const msgError = '404 message'
      const mockError = {
        status: HttpStatusCode.NotFound,
        statusText:msgError,
      }
      const productID = '1';
      //Act
      //{...dto} pasas la referencia no el valor
      productService.getOne(productID).subscribe({
        error: (error) => {
          // assert
          expect(error).toEqual('El producto no existe');
          doneFn();
        }
      });
      //http config
      const apiUrl = `${environment.API_URL}/api/v1/products/${productID}`;
      const req = httpController.expectOne(apiUrl);
      // Proveer una respuesta simulada a una solicitud HTTP.
      req.flush(msgError, mockError);
      expect(req.request.method).toEqual('GET');
      //httpController.verify();
    });
  });
});
