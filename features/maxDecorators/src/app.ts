// A decorator is a function that can be used to modify the behaviour
// of a class method, class property, class accessor, and a class

// creating a decorator
// decorator function
function Logger(logString: string) {
  console.log('LOGGER FACTORY');
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

// Decorator factory
function withTemplate(template: string, hookId: string) {
  console.log('TEMPLATE FACTORY');
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        console.log('Rendering template');
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector('h1')!.textContent = this.name;
        }
      }
    };
  };
}

@Logger('LOGGING - PERSON')
@withTemplate('<h1>My Person Object</h1>', 'app')
class Person {
  name = 'Max';

  constructor() {
    console.log('Creating a person object...');
  }
}

// const pers = new Person();

// console.log(pers)

class Product {
  @log
  title: string;
  private price: number;
  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }

  // Accessors
  @log2
  set prices(val: number) {
    if (val > 0) {
      this.price = val;
    } else {
      throw new Error('Invalid price - should be positive!');
    }
  }

  @log3
  getPriceWithTax(@log4 tax: number) {
    return this.price * (1 + tax);
  }
}

// log - decorator for a class property - 2 arguments
function log(target: any, propertyName: string) {
  console.log('Property Decorator');
  console.log(target, propertyName);
}

// decorator for an Accessor - 3 arguments
function log2(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  console.log('Accessor decorator!');
  console.log(target);
  console.log(propertyKey);
  console.log(descriptor);
}

// decorators for methods
function log3(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  console.log('Method decorator!');
  console.log(target);
  console.log(propertyKey);
  console.log(descriptor);
}

// decorator for parameters
function log4(
  target: any,
  propertyKey: string | symbol,
  propertyIndex: number
) {
  console.log('Parameter decorator!');
  console.log(target);
  console.log(propertyKey);
  console.log(propertyIndex);
}

class Printer {
  message = 'This works!';

  @autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage);

// Decorator for autobinding
function autobind(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable:false,
    // The getter basically is like having a value property that
    // runs before the actual value is returend
    get() { // method to allow us execute extra logic when a usr
      // tries to execute this property
      // Therefore we don't directly execute the value of this property
      // but we can step in and do some extra work
      const boundFn = originalMethod.bind(this); //this refers to
      // whatever is responsible for trigerring this getter method
      return boundFn;
    }
  }
  return adjDescriptor;
}

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]
  }
}

const registeredValidators: ValidatorConfig = {};


function required(target: any, propertyKey: string) {
  registeredValidators[target.constructor.name] = {
    [propertyKey]: ['required']
  }
}

// Decorator to be used for validation
function positiveNumber(target: any, propertyKey: string) {
  registeredValidators[target.constructor.name] = {
    [propertyKey]: ['positive']
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if(!objValidatorConfig) {
    return true;
  }

  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return true;
}


class Course {
  @required
  title: string;
  @positiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}








const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
  event.preventDefault();
  const titleEl = document.querySelector('#title') as HTMLInputElement;
  const priceEl = document.querySelector('#price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value; // plus sign to change it into a number

  const createdCourse = new Course(title, price);
  console.log(createdCourse);
})}