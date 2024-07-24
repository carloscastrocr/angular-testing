import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TokenService } from './token.service';
import { provideHttpClient } from '@angular/common/http';
import { Auth } from '../models/auth.model';
import { environment } from '../../environments/environment';

describe('AuthService', () => {
  let authService: AuthService;
  let httpController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        AuthService,
        TokenService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    authService = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    // Verify that none of the tests make any extra HTTP requests.
    TestBed.inject(HttpTestingController).verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('test for login',()=>{
    it('should return a token',(doneFn)=>{
       //arrange
       const mockData: Auth = {
        access_token: '121212'
       };
       const email = 'carlos@gamil.com';
       const password = '12121';
       //.and.callThrough() no llamar a la funcion real, pero si espiarla
       spyOn(tokenService, 'saveToken').and.callThrough();
       //Act
       authService.login(email, password).subscribe((data)=>{
         //Assert
         expect(data).toEqual(mockData);
         expect(tokenService.saveToken).toHaveBeenCalledTimes(1);
         //Que se llame con el argumento que esperamos
         expect(tokenService.saveToken).toHaveBeenCalledOnceWith(mockData.access_token);
         doneFn();
       });
       //http config
       const apiUrl = `${environment.API_URL}/api/v1/auth/login`;
       const req = httpController.expectOne(apiUrl);
       req.flush(mockData);
    });
  });

  it('should return a token',(doneFn)=>{
    //arrange
    const mockData: Auth = {
     access_token: '121212'
    };
    const email = 'carlos@gamil.com';
    const password = '12121';
    //Act
    authService.login(email, password).subscribe((data)=>{
      //Assert
      expect(data).toEqual(mockData);
      doneFn();
    });
    //http config
    const apiUrl = `${environment.API_URL}/api/v1/auth/login`;
    const req = httpController.expectOne(apiUrl);
    req.flush(mockData);
 });
});
