import { Calculator } from "./calculator";

// Describe lo que esta testeando
describe('Test for Carculator', ()=>{

    describe('Test Multiply',()=>{
        //para correr una prueba
        it('#multiply should return a nine',()=>{
            //Arrange, preparar lo que necesitas para la prueba
            //instancia de la prueba
            const calculator = new Calculator();
            //Act, ejecutar lo que queremos probar
            const rta= calculator.multipy(3,3);
            //Assert,como deberias de actuar que es lo que espero
            expect(rta).toEqual(9);
        })

        //para correr una prueba
        it('#multiply should return a nine',()=>{
            //Arrange, preparar lo que necesitas para la prueba
            //instancia de la prueba
            const calculator = new Calculator();
            //Act, ejecutar lo que queremos probar
            const rta= calculator.multipy(2,2);
            //Assert,como deberias de actuar que es lo que espero
            expect(rta).toEqual(4);
        });
    });

    describe('Test Divide',()=>{
        it('#divide should return a some numbers',()=>{
            //Arrange, preparar lo que necesitas para la prueba
            //instancia de la prueba
            const calculator = new Calculator();
            //Act, ejecutar lo que queremos probar
            const rta= calculator.divide(6,3);
            const rta1= calculator.divide(2,0);
            //Assert,como deberias de actuar que es lo que espero
            expect(rta).toEqual(2);
            expect(rta1).toEqual(null);
        });

        it('#divide for a zero',()=>{
            //Arrange, preparar lo que necesitas para la prueba
            //instancia de la prueba
            const calculator = new Calculator();
            //Act, ejecutar lo que queremos probar
            const rta= calculator.divide(6,0);
            const rta1= calculator.divide(2,0);
            //Assert,como deberias de actuar que es lo que espero
            expect(rta).toEqual(null);
            expect(rta1).toBeNull();
        });
    });

    it('test machers',()=>{
        //Arrange, preparar lo que necesitas para la prueba
        //instancia de la prueba
        const name = 'nicolas';
        let name2;
        //Act, ejecutar lo que queremos probar
        //Assert,como deberias de actuar que es lo que espero
        expect(name).toBeDefined();
        expect(name2).toBeUndefined();

        expect(1 + 2 === 3).toBeTruthy();
        expect(1 + 1 === 3).toBeFalsy();

        expect(5).toBeLessThan(10);
        expect(20).toBeGreaterThan(10);

        expect('123456').toMatch(/123/);
        expect(['apples','oranges','pears']).toContain('oranges');
    })
});