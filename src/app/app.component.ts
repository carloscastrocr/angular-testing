import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

import {Calculator} from './components/calculator';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'testing-service';

  ngOnInit(){
    const calculator = new Calculator;
    const rta = calculator.multipy(1,4);
    console.log(rta === 4); 
    const rtaDivide = calculator.multipy(3,0);
    console.log(rta === null); 
  }
}
