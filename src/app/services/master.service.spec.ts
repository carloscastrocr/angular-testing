import { TestBed } from '@angular/core/testing';

import { MasterService } from './master.service';
import { ValueService } from './value.service';
import { ValueFakeService } from './value-fake.service';

describe('MasterService', () => {
  let masterService: MasterService;
  //No solo tiene los metodod de ValueService
  //Si no algunos mas que jasmin le agrega para poder espiarlo
  let valueServiceSpy : jasmine.SpyObj<ValueService>;

  beforeEach(()=>{
    const spy = jasmine.createSpyObj('ValueService', ['getValue']);
    TestBed.configureTestingModule({
      providers: [ 
        MasterService,
        //cuando trate de resolver ValueService en su lugar
        //cree un ValueServiceSpy
        { provide : ValueService, useValue: spy} 
      ]
    })
    //service = new ValueService();
    masterService = TestBed.inject(MasterService);
    valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
  })
  it('should be create',()=>{
    expect(masterService).toBeTruthy();
  });
  //la responsabilidad no es probar si getValue de ValueSerrvice funciona
  //la responsabilidad es ejecutar esa funcion
  //it('should return "my value" from the real service', () => {
  //  const valueService = new ValueService();
  //  const masterService = new MasterService(valueService);
  //  expect(masterService.getValue()).toBe('my value');
  //});

  ////creando un clon de ValueService
  //it('should return "other value" from the fake service', () => {
  //  const valueFakeService = new ValueFakeService();
  //  const masterService = new MasterService(valueFakeService as unknown as ValueService);
  //  expect(masterService.getValue()).toBe('fake value');
  //});

  ////creando un fake object de ValueService
  //it('should return "other value" from the fake object', () => {
  //  const fake = {getValue: ()=>{return 'fake from object'}};
  //  const masterService = new MasterService(fake as unknown as ValueService);
  //  expect(masterService.getValue()).toBe('fake from object');
  //});

  //with Spies
  it('should call to getValue from ValueService', () => {
    //const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);
    valueServiceSpy.getValue.and.returnValue('fake value');
    //const masterService = new MasterService(valueServiceSpy);
    expect(masterService.getValue()).toBe('fake value');
    //para saber si el metodo fue llamado
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
    //si se llamo 1 vez
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  });
});
