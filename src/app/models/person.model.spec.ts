import { Person } from "./person.model";

describe('Test for Person',()=>{
   let person: Person;
   beforeEach(()=>{
     person = new Person('Carlos', 'Castro',36, 70 , 1.70); 
   });

   it('attrs',()=>{
     expect(person.name).toEqual('Carlos');
     expect(person.lastName).toEqual('Castro');
     expect(person.weigth).toEqual(70);
   });

   describe('tests for clacIMC',()=>{
     it('should return a string: down',()=>{
        //Arrange
        person.weigth = 40;
        person.heigth = 1.65;
        //Act
        const rta = person.calcIMC();
        //Assert
        expect(rta).toEqual('down')
     });

     it('should return a string: normal',()=>{
        //Arrange
        person.weigth = 58;
        person.heigth = 1.65;
        //Act
        const rta = person.calcIMC();
        //Assert
        expect(rta).toEqual('normal')
     });

     it('should return a string: overweigth',()=>{
        //Arrange
        person.weigth = 70;
        person.heigth = 1.65;
        //Act
        const rta = person.calcIMC();
        //Assert
        expect(rta).toEqual('overweigth')
     });

     it('should return a string: overweigth level 1',()=>{
        //Arrange
        person.weigth = 80;
        person.heigth = 1.65;
        //Act
        const rta = person.calcIMC();
        //Assert
        expect(rta).toEqual('overweigth level 1')
     });

     it('should return a string: overweigth level 2',()=>{
        //Arrange
        person.weigth = 90;
        person.heigth = 1.65;
        //Act
        const rta = person.calcIMC();
        //Assert
        expect(rta).toEqual('overweigth level 2')
     });

     it('should return a string: overweigth level 3',()=>{
        //Arrange
        person.weigth = 110;
        person.heigth = 1.65;
        //Act
        const rta = person.calcIMC();
        //Assert
        expect(rta).toEqual('overweigth level 3')
     });

     it('should return a string: not found',()=>{
        //Arrange
        person.weigth = -10;
        person.heigth = 1.65;
        //Act
        const rta = person.calcIMC();
        //Assert
        expect(rta).toEqual('not found')
     });
   });
});