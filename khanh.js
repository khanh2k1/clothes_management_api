class Dog {
    /* 
        constructor co nghia la khi co 1 new Dog duoc tao ra
         thi cac constructor se duoc chay dau tien
    */
    constructor() {
        this.sayHello()
    }

    sayHello() {
        this.canSleep = function idk() {
            console.log('Dog can sleep')
        }
    }

    canEat() {
        const x = this.canSleep()
    }
}

const husky = new Dog()

husky.canEat()