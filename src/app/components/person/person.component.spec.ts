import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

fdescribe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    //Modulo o ambiente de prueba
    await TestBed.configureTestingModule({
      imports: [PersonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonComponent);
    // Instancia del componnete
    component = fixture.componentInstance;
    fixture.detectChanges();//Life cycle
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoul have <p> with "Párrafo', ()=>{
    //Arragne

    // const personElement: HTMLElement = fixture.nativeElement;
    // const p = personElement.querySelector('p');
    // expect(p?.textContent).toEqual('Párrafo');
    
    // Se puede usar el DebugElement porque 
    // hay casos donde se usa el core de Angular, 
    // pero no se lo corre en un navegador
    const personDebug: DebugElement = fixture.debugElement;
    // const personElement: HTMLElement = personDebug.nativeElement;
    // const p = personElement.querySelector('p');
    const pDebug: DebugElement = personDebug.query(By.css('p'));
    const pElement: HTMLElement = pDebug.nativeElement;
    //Act
    //Assert
    expect(pElement?.textContent).toEqual('Párrafo');
  });

  it('shoul have <h3> with "Hola, PersonComponent', ()=>{
    //Arragne
    const personDebug: DebugElement = fixture.debugElement;
    const h3Debug: DebugElement = personDebug.query(By.css('h3'));
    const h3Element: HTMLElement = h3Debug.nativeElement;
    //Act
    //Assert
    expect(h3Element?.textContent).toEqual('Hola, PersonComponent');
  });
});
