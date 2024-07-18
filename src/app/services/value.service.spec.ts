import { TestBed } from '@angular/core/testing';

import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;
  //ejecutara esta centencia de codigo antes de cada prueba
  //lo que quiere decir que antes de cada prueba creara una instancia nueva
  beforeEach(()=>{
    TestBed.configureTestingModule({
      providers: [ ValueService ]
    })
    //service = new ValueService();
    service = TestBed.inject(ValueService);
  })
  //Una prueba no deberia afectar a otra deberia
  it('should be create',()=>{
    expect(service).toBeTruthy();
  });

  describe('Tests for getValue',()=>{
    it('should return "my value"',()=>{
      expect(service.getValue()).toBe('my value');
    });
  });

  describe('Tests for setValue',()=>{
    it('should change the value"',()=>{
      expect(service.getValue()).toBe('my value');
      service.setValue('change');
      expect(service.getValue()).toBe('change');
    });
  });

  describe('Tests for getPromiseValue',()=>{
    // no espera asincronismo, para decirle donde terminar la prueba
    // usaremos doneFn
    it('should return "promise value" from promise with then',(doneFn)=>{
      service.getPromiseValue().then((value)=>{
        expect(value).toBe('promise value');
        doneFn();
      })
    });

    //tambien podemos usar el async
    it('should return "promise value" from promise using async',async ()=>{
      const rta = await service.getPromiseValue();
      expect(rta).toBe('promise value');
    });
  });

  describe('Tests for getObsevableValue',()=>{
    // no espera asincronismo, para decirle donde terminar la prueba
    // usaremos doneFn
    it('should return "observable value" from observable',(doneFn)=>{
      service.getObservableValue().subscribe((value)=>{
        expect(value).toBe('observable value');
        doneFn();
      })
    });
  });
});
