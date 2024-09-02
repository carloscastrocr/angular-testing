import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleComponent } from './people.component';
import { PersonComponent } from '../person/person.component';
import { Person } from '../../models/person.model';
import { By } from '@angular/platform-browser';

fdescribe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleComponent, PersonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list app-person components',()=>{
    //Arrange
    component.people = [
      new Person('Carlos', 'Castro', 36, 71, 1.5),
      new Person('Daniel', 'Castro', 34, 71, 1.5),
      new Person('Luis', 'Castro', 26, 85, 1.7)
    ];

    //Act
    fixture.detectChanges();
    const debugElement = fixture.debugElement.queryAll(By.css('app-person'));
    //Asert
    expect(debugElement.length).toEqual(3);
  });

  it('should raise selected event when clicked',()=>{
    //Arrange
    component.people = [
      new Person('Carlos', 'Castro', 36, 71, 1.5),
      new Person('Daniel', 'Castro', 34, 71, 1.5),
      new Person('Luis', 'Castro', 26, 85, 1.7)
    ];
    fixture.detectChanges();
    const btnDebug = fixture.debugElement.queryAll(By.css('app-person .btn-choose'));
    //Act
    for (let i = 0; i < btnDebug.length; i++) {
      btnDebug[i].triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.selectedPerson).toEqual(component.people[i]);
    }
    //Asert
  });

  it('should render slected person',()=>{
    //Arrange
    const btnDebug = fixture.debugElement.query(By.css('app-person .btn-choose'));
    //Act
    btnDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    const liDebug = fixture.debugElement.query(By.css('.selected-person ul > li'));
    //Asert
    expect(component.selectedPerson).toEqual(component.people[0]);
    expect(liDebug.nativeElement.textContent).toContain(component.selectedPerson?.name);
  });
});
