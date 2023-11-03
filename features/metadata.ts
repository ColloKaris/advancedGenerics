import 'reflect-metadata';

@printMetadata
class Plane {
  color: string = 'red';

  @markFunction('HI THERE')
  fly(): void {
    console.log('vrrrrrr');
  }
}

// Decorator
function markFunction(secretInfo: string) {
  return function (target: Plane, key: string) {
    Reflect.defineMetadata('secret', secretInfo, target, key);
  };
}

// A more effective way of retrieving information
// since its a class constructor, we pass in a reference to its
// constructor function
function printMetadata(target: typeof Plane) {
  // loop through all the different key's in the plane's prototype
  // remember the prototype only stores methods
  console.log("Hello Guys")
  console.log(target.prototype)
  for (let key in target.prototype) {
    console.log("Hello World")
    const secret = Reflect.getMetadata('secret', target.prototype, key);
    console.log(secret);
  }
}