'use strict';
// Construction function
document.body.style.background = 'black';
let h1 = document.querySelector('h1');
h1.style.color = 'black';

/* Lecture 1
// const Person = function (firstName, birthYear) {
//   // Instance properties
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// Person.prototype.calcAge = function () {
//   console.log(2023 - this.birthYear);
// };

// 1.  New {} is created
// 2.  Function is called, this = {}
// 3.  {} linked to prototype
// 4.  function automatically return {}

const jonas = new Person('Jonas', 1991);
const timHa = new Person('Tim', 1982);
const heeJung = new Person('Hee', 1983);
// console.log(timHa, heeJung);
const jay = 'jay';
// console.log(jay instanceof Person);

console.log(Person);
console.log(Person.prototype);
console.log(timHa);

console.log(jonas.__proto__); // console.log(timHa.prototype);
console.log(jonas.__proto__.__proto__); // console.log(timHa.prototype);

const arr = [2, 3, 4, 1];

console.log(arr.__proto__.__proto__);
console.log(arr.__proto__);

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 5;
  console.log(`${this.make} is going at ${this.speed}`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed}`);
};

const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedes', 95);

console.log(car1.__proto__);

car1.accelerate();
car1.accelerate();

// jonas.calcAge();
// timHa.calcAge();

// Person.prototype.species = 'homo sapien';
// console.log(jonas.hasOwnProperty('firstName'));
// console.log(jonas.hasOwnProperty('species'));
// console.log(jonas.__proto__);
// console.log(timHa.__proto__);
// console.log(timHa.__proto__ === Person.prototype);
// console.log(Person.prototype.isPrototypeOf(jonas));

// Person.prototype.calcAge = function () {
//   console.log(2023 - this.birthYear);
// };

// Person.prototype.speccies = 'Home Sapiens';

// jonas.calcAge();
// timHa.calcAge();
// heeJung.calcAge();

// console.log(jonas.__proto__);
// console.log(Person.prototype);
// console.log(Person.prototype.isPrototypeOf(jonas));
// console.log(Person.prototype.isPrototypeOf(jay));
// console.log(jonas.speccies);
// console.log(jonas.hasOwnProperty('speccies'));
// console.log(jonas.hasOwnProperty('firstName'));
Lecture 1 Ends */

//Lecture 2 Starts
// class expression
// const PersonClc = class {}
// class declaration

// getters => access properties
// setters => change (mutate) them

// Constructor function
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2023 - this.birthYear);
};

Person.hey = function () {
  console.log('Hey there!');
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`Hi, my name is ${firstName} and I study ${course}`);
};

// const mike = new Student('Mike', 1977, 'IT');
// console.log(mike);
// console.log(mike.__proto__.__proto__);
// mike.calcAge();
// console.log(mike instanceof Student);
// console.log(mike instanceof Person);
// Student.prototype.constructor = Student;
// console.dir(Student.prototype.constructor);
// Coding Challenge 4
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }
}

class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }
  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    // console.log(`The ${this.make} has ${this.#charge}% battery.`);
    return this;
  }
  accelerate() {
    this.speed += 5;
    this.#charge--;
    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }`
    );
    return this;
  }
}

// const rivian = new CarCl('Rivian', 120, 23);
const rivian = new EVCl('Rivian', 120, 23);
rivian.brake();
rivian.accelerate().accelerate().chargeBattery(50).accelerate().brake();

// Coding Challenge 3
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
  console.log(`The ${this.make} has ${this.charge}% battery.`);
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}`
  );
};

const tesla = new EV('Tesla', 120, 23);
// console.log(tesla);
// tesla.chargeBattery(90);
tesla.accelerate();
// tesla.accelerate();
// tesla.brake();
// tesla.accelerate();

// Class function
class Personcl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  caclAge() {
    console.log(2023 - this.birthYear);
  }
  greet() {
    console.log(`Hello ${this.fullName}`);
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name.`);
  }

  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log(this);
    console.log('Hi there yo');
  }
}

const timHa = new Personcl('Tim Ha', 1982);
console.log(timHa);

class StudentCl extends Personcl {
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear);
    this.course = course;
  }
  introduce() {
    console.log(`Hi, my name is ${this.fullName} and I study ${this.course}.`);
  }
  calcAge() {
    console.log(
      `I'm ${
        2023 - this.birthYear
      } years old, but as a student I feel more like ${
        2023 - this.birthYear + 10
      }.`
    );
  }
}
const eunice = new StudentCl('Eunice Ha', 1951, 'HR');
console.log(eunice);
// eunice.introduce();
// eunice.calcAge();

const mark = new StudentCl('Mark Jones', 1980, 'Computer Science');
console.log(mark);
// Object.create()
const PersonProto = {
  calcAge() {
    console.log(2023 - this.birthYear);
  },
  init(name, birthYear) {
    this.name = name;
    this.birthYear = birthYear;
  },
};
const jason = Object.create(PersonProto);
jason.init('Jason', 1979);
console.log(jason);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (name, birthYear, course) {
  PersonProto.init.call(this, name, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`Hi, my name is ${this.name} and I study ${this.course}.`);
};

// console.log(StudentProto);
const jay = Object.create(StudentProto);

jay.init('Jay', 1978, 'Marketing');
// jay.calcAge();
// jay.introduce();
console.log(jay);

// Additional Class example
class Account {
  // Public fields
  local = navigator.language;
  // Private fields
  #movements = [];
  // Private field has to be in outside of any methods
  #pin;
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // this._movements = [];
    // this.local = navigator.language;
    console.log(`Thanks for opening an account, ${owner}`);
  }

  getMovements() {
    return this.#movements;
  }

  getPin() {
    return this.#pin;
  }

  deposit(mov) {
    this.#movements.push(mov);
    return this;
  }
  withdrawal(mov) {
    this.deposit(-mov);
    return this;
  }
  #approvedLoan(mov) {
    return true;
  }
  requestLoan(mov) {
    if (this.#approvedLoan) this.deposit(mov);
    console.log('Loan approved');
    return this;
  }
  static helper() {
    console.log('Helper');
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
// acc1.deposit(20);
// acc1.deposit(15);
// acc1.withdrawal(2);
// acc1.requestLoan(5000);
// console.log(acc1);
// console.log(acc1.getMovements());
// Account.helper();

// Chaining
acc1
  .deposit(300)
  .deposit(500)
  .withdrawal(35)
  .requestLoan(25000)
  .withdrawal(4000);
// console.log(acc1);
// console.log(acc1.#movements);

// const PersonProto = {
//   calcAge() {
//     console.log(2023 - this.birthYear);
//   },
//   init(firstName, birthYear) {
//     this.name = firstName;
//     this.birthYear = birthYear;
//   },
// };

// const steven = Object.create(PersonProto);
// steven.name = 'Steven';
// steven.birthYear = 1980;
// steven.calcAge();
// console.log(steven);

// const sarah = Object.create(PersonProto);
// sarah.init('Sarah', 1948);
// sarah.calcAge();

// Codeing Challenge 1
// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 5;
//   console.log(`${this.make} is going at ${this.speed}`);
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} is going at ${this.speed}`);
// };

// const bmw = new Car('BMW', 120);
// const mercedes = new Car('Mercedes', 95);

// console.log(bmw.__proto__);
// console.log(Car);
// console.log(bmw);
// bmw.accelerate();
// mercedes.accelerate();

// // coding Challenge 2
// class CarCl {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }
//   accelerate() {
//     this.speed += 10;
//     console.log(`${this.make} is going ${this.speed} km/h`);
//   }
//   brake() {
//     this.speed -= 5;
//     console.log(`${this.make} is going ${this.speed} km/h`);
//   }
//   get speedUS() {
//     return this.speed / 1.6;
//   }
//   set speedUS(speed) {
//     this.speed = speed * 2;
//   }
//   // set speedUS(make) {
//   //   this.make = 'Honda';
//   // }
// }

// const ford = new CarCl('ford', 120);
// console.log(ford);
// console.log(ford.speedUS);
// ford.speedUS = 80;
// console.log(ford);
// ford.accelerate();
// ford.accelerate();
// ford.brake();

// class userCL {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }
//   calcAge() {
//     return 2023 - this.birthYear;
//   }
//   get fullNames() {
//     return this.fullName;
//   }
//   set fullNames(name) {
//     if (name.includes(' ')) this.fullName = name;
//     else alert(`${name} is not a full name.`);
//   }
// }

// const david = new userCL('David Ha', 1977);
// console.log(david);
// // david.fullName = 'Tani Logo';
// console.log(david.fullNames);
// const account = {
//   owner: 'Jonas',
//   movements: [200, 530, 120, 300],

//   get latest() {
//     return this.movements.slice(-1).pop();
//   },
//   set latest(mov) {
//     this.owner = mov;
//   },
// };
// account.latest = 50;
// console.log(account.owner);

// bmwCl.accelerate();
// bmwCl.brake();
// bmwCl.speedUS(120);
// class Carcl {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }

//   accelerate() {
//     this.speed += 10;
//     console.log(`${this.make} is going at ${this.speed}`);
//   }

//   brake() {
//     this.speed -= 5;
//     console.log(`${this.make} is going at ${this.speed}`);
//   }

//   get speedUS() {
//     return `${this.speed / 1.6} mi/h`;
//   }
//   set speedUS(speed) {
//     this.speed = speed * 1.6;
//   }
// }

// console.log(Carcl);
// const acura = new Carcl('Acura', 120);
// console.log(acura);
// console.log(acura.speedUS);
// acura.accelerate();
// acura.brake();
// acura.brake();

// Personcl.hey();

// const Jessica = new Personcl('Jessica Davis', 1996);
// const Tim = new Personcl('Tim Ha', 1982);
// console.log(Tim);
// console.log(Tim.fullName);

// const Lynn = new Personcl('Lynn Kim', 1983);
// console.log(Lynn);

//   console.log(name);
//   if (name.includes(' ')) this.fullName = name;
//   else alert(`The ${name} is not a full name.`);
// }

// class Person {
//   constructor(firstName, lastName) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//   }
//   get fullName() {
//     return `My name is ${this.firstName} ${this.lastName}`;
//   }
//   set fullName(value) {
//     const parts = value.split(' ');
//     this.firstName = parts[0];
//     this.lastName = parts[1];
//   }
// }

// const timHa = new Person('tim', 'ha');
// console.log(timHa);
// timHa.fullName = 'thin dd';
// console.log(timHa.fullName);

// classes are first-class citizen
// classes are not hoisted but you cannot use it before it declares
// classes are executed in strict mode

// const account = {
//   owner: 'Jonas',
//   movements: [200, 530, 120, 300],
//   get latest() {
//     return this.movements.slice(-1).pop();
//   },
//   set latest(mov) {
//     this.movements.push(mov);
//   },
// };
// console.log(account.latest);
// account.latest = 50;

// console.log(account.movements);
