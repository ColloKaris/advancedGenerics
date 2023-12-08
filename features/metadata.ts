import 'reflect-metadata';

@printMetadata
class Plane {
  color: string = 'red';

  @markFunction('HI THERE')
  fly(): void {
    console.log('Vrrrrrr');
  }
}

// Decorator
function markFunction(secretInfo: string) {
  return function (target: Plane, key: string) {
    Reflect.defineMetadata('secret', secretInfo, target, key);
  };
}

function printMetadata(target: Function) {
  // loop to go through all the different keys in the Plane prototype
  for (let key of Object.getOwnPropertyNames(target.prototype).filter(name => name !== 'constructor')) {
    if (typeof target.prototype[key] === 'function') {
      const secret = Reflect.getMetadata('secret', target.prototype, key)
      console.log(secret);
    }    
  }
}