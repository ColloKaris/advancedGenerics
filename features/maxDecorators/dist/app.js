"use strict";
// A decorator is a function that can be used to modify the behaviour
// of a class method, class property, class accessor, and a class
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// creating a decorator
// decorator function
function Logger(logString) {
    console.log('LOGGER FACTORY');
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
}
// Decorator factory
function withTemplate(template, hookId) {
    console.log('TEMPLATE FACTORY');
    return function (originalConstructor) {
        return class extends originalConstructor {
            constructor(..._) {
                super();
                console.log('Rendering template');
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1').textContent = this.name;
                }
            }
        };
    };
}
let Person = class Person {
    constructor() {
        this.name = 'Max';
        console.log('Creating a person object...');
    }
};
Person = __decorate([
    Logger('LOGGING - PERSON'),
    withTemplate('<h1>My Person Object</h1>', 'app'),
    __metadata("design:paramtypes", [])
], Person);
// const pers = new Person();
// console.log(pers)
class Product {
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
    // Accessors
    set prices(val) {
        if (val > 0) {
            this.price = val;
        }
        else {
            throw new Error('Invalid price - should be positive!');
        }
    }
    getPriceWithTax(tax) {
        return this.price * (1 + tax);
    }
}
__decorate([
    log,
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    log2,
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], Product.prototype, "prices", null);
__decorate([
    log3,
    __param(0, log4),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], Product.prototype, "getPriceWithTax", null);
// log - decorator for a class property - 2 arguments
function log(target, propertyName) {
    console.log('Property Decorator');
    console.log(target, propertyName);
}
// decorator for an Accessor - 3 arguments
function log2(target, propertyKey, descriptor) {
    console.log('Accessor decorator!');
    console.log(target);
    console.log(propertyKey);
    console.log(descriptor);
}
// decorators for methods
function log3(target, propertyKey, descriptor) {
    console.log('Method decorator!');
    console.log(target);
    console.log(propertyKey);
    console.log(descriptor);
}
// decorator for parameters
function log4(target, propertyKey, propertyIndex) {
    console.log('Parameter decorator!');
    console.log(target);
    console.log(propertyKey);
    console.log(propertyIndex);
}
class Printer {
    constructor() {
        this.message = 'This works!';
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    autobind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Printer.prototype, "showMessage", null);
const p = new Printer();
const button = document.querySelector('button');
button.addEventListener('click', p.showMessage);
// Decorator for autobinding
function autobind(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        enumerable: false,
        // The getter basically is like having a value property that
        // runs before the actual value is returend
        get() {
            // tries to execute this property
            // Therefore we don't directly execute the value of this property
            // but we can step in and do some extra work
            const boundFn = originalMethod.bind(this); //this refers to
            // whatever is responsible for trigerring this getter method
            return boundFn;
        }
    };
    return adjDescriptor;
}
const registeredValidators = {};
function required(target, propertyKey) {
    registeredValidators[target.constructor.name] = {
        [propertyKey]: ['required']
    };
}
// Decorator to be used for validation
function positiveNumber(target, propertyKey) {
    registeredValidators[target.constructor.name] = {
        [propertyKey]: ['positive']
    };
    function validate(obj) {
        const objValidatorConfig = registeredValidators[obj.constructor.name];
        if (!objValidatorConfig) {
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
        constructor(t, p) {
            this.title = t;
            this.price = p;
        }
    }
    __decorate([
        required,
        __metadata("design:type", String)
    ], Course.prototype, "title", void 0);
    __decorate([
        positiveNumber,
        __metadata("design:type", Number)
    ], Course.prototype, "price", void 0);
    const courseForm = document.querySelector('form');
    courseForm.addEventListener('submit', event => {
        event.preventDefault();
        const titleEl = document.querySelector('#title');
        const priceEl = document.querySelector('#price');
        const title = titleEl.value;
        const price = +priceEl.value; // plus sign to change it into a number
        const createdCourse = new Course(title, price);
        console.log(createdCourse);
    });
}
