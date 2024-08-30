import { Component } from '@angular/core';
import { PersonComponent } from "../person/person.component";
import { Person } from '../../models/person.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [PersonComponent, CommonModule],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss'
})
export class PeopleComponent {
 person : Person = new Person('Carlos', 'Catro', 36, 71, 1.5)
 people : Person [] = [
  new Person('Carlos', 'Catro', 36, 71, 1.5),
  new Person('Daniel', 'Catro', 34, 71, 1.5),
  new Person('Luis', 'Catro', 26, 85, 1.7)
 ]
 selectedPerson:Person | null = null;

 choose(person:any){
  console.log(person)
    this.selectedPerson = person;
 }
}
