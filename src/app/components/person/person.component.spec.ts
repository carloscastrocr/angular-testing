import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Person } from '../../models/person.model';

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

  it('should have the name "Carlos"',()=>{
    component.person = new Person('Carlos', 'Castro', 36, 71, 1.4);
    expect(component.person.name).toEqual('Carlos');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have <p> with "Mi altura es: {person.heigth}', ()=>{
    //Arragne

    // const personElement: HTMLElement = fixture.nativeElement;
    // const p = personElement.querySelector('p');
    // expect(p?.textContent).toEqual('Párrafo');
    
    component.person = new Person('Daniel', 'Castro', 34, 71, 1.4);
    const expectMessage = `Mi altura es: ${component.person.heigth}`;
    // Se puede usar el DebugElement porque 
    // hay casos donde se usa el core de Angular, 
    // pero no se lo corre en un navegador
    const personDebug: DebugElement = fixture.debugElement;
    // const personElement: HTMLElement = personDebug.nativeElement;
    // const p = personElement.querySelector('p');
    const pDebug: DebugElement = personDebug.query(By.css('p'));
    const pElement: HTMLElement = pDebug.nativeElement;
    //Act
    fixture.detectChanges();
    //Assert
    expect(pElement?.textContent).toEqual(expectMessage);
    expect(pElement?.textContent).toContain(component.person.heigth);
  });

  it('should have <h3> with "Hola, {person.name}', ()=>{
    //Arragne
    component.person = new Person('Daniel', 'Castro', 34, 71, 1.4);
    const expectMessage = `Hola, ${component.person.name}`;
    const personDebug: DebugElement = fixture.debugElement;
    const h3Debug: DebugElement = personDebug.query(By.css('h3'));
    const h3Element: HTMLElement = h3Debug.nativeElement;
    //Act
    fixture.detectChanges();
    //Assert
    expect(h3Element?.textContent).toEqual(expectMessage);
  });

  it('should display a text with IMC when do click on calcIMC', ()=>{
       // Arrange
       const expectMessage = 'overweigth level 2'
       component.person = new Person('Luis', 'Castro', 26, 90, 1.6);
       const button = fixture.debugElement.query(By.css('button.btn-imc')).nativeElement;
       // Act
       component.calcIMC();
       fixture.detectChanges();
       // Assert
       expect(button.textContent).toContain(expectMessage);
  });

  it('should display a text with IMC when do click', ()=>{
    // Arrange
    const expectMessage = 'overweigth level 2'
    component.person = new Person('Rissella', 'Castro', 26, 60, 1.3);
    const buttonDebug = fixture.debugElement.query(By.css('button.btn-imc'));
    const buttonElement = buttonDebug.nativeElement;
    // Act
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Assert
    expect(buttonElement.textContent).toContain(expectMessage);
  });

  it('should raise selected event when do click', ()=>{
    // Arrange
    const expectPerson = new Person('Fidel', 'Castro', 26, 60, 1.3);
    component.person = expectPerson;
    const buttonDebug = fixture.debugElement.query(By.css('button.btn-choose'));
    
    let selectedPerson: Person | undefined;
    component.onSelected
       .subscribe(person =>{
         selectedPerson = person;
       });
    // Act
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Assert
    expect(selectedPerson).toEqual(expectPerson);
});
});

@Component({
  template: `<app-person [person]="person" (onSelected)="onSelected($event)"></app-person>`
})
class HostComponent{
   person = new Person('Teresa', 'Ramos', 61, 55, 1.4);
   selectedPerson: Person | undefined;
   onSelected(person : Person){
     this.selectedPerson = person
   }
}


fdescribe('PersonComponent from HostComponent',()=>{
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent], // Solo HostComponent se declara
      imports: [PersonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();//Life cycle
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display person name', () => {
    // Arrange
    const expectName = component.person.name;
    const h3Debug = fixture.debugElement.query(By.css('app-person h3'));
    const h3Element = h3Debug.nativeElement;
    // Act
    fixture.detectChanges();
    // Assert
    expect(h3Element.textContent).toContain(expectName);
  });

  it('should display person name', () => {
    // Arrange
    const expectName = component.person.name;
    const h3Debug = fixture.debugElement.query(By.css('app-person h3'));
    const h3Element = h3Debug.nativeElement;
    // Act
    fixture.detectChanges();
    // Assert
    expect(h3Element.textContent).toContain(expectName);
  });

  it('should raise selected event when clicked', () => {
    // Arrange
    const btnDebug = fixture.debugElement.query(By.css('app-person .btn-choose'));
    // Act
    btnDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Assert
    expect(component.selectedPerson).toEqual(component.person);
  });
});
