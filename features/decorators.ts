@classDecorator
class Boat {
  @testDecorator
  color: string = 'red';

  @testDecorator
  get formattedColor(): string {
    return `This boat's color is ${this.color}`;
  }

  @logError('Something bad')
  pilot(
    @parameterDecorator speed: string,
    @parameterDecorator generateWake: boolean
  ): void {
    if (speed === 'fast') {
      console.log('swish');
    } else {
      console.log('nothing');
    }
  }
}

// class Decorator
function classDecorator(constructor: typeof Boat){
  console.log(constructor)
}

// decorator to be used to an argument to a decorator
function parameterDecorator(target: any, key: string, index: number) {
  console.log(key, index);
}

function testDecorator(target: any, key: string) {
  console.log(key);
}

// Decorator factory added after a decorator called logError was created
function logError(errorMessage: string) {
  // Define a Decorator
  return function (target: any, key: string, desc: PropertyDescriptor): void {
    const method = desc.value; // method is going to be a reference
    // to the exact function, i.e. pilot()

    // update value of the property descriptor
    desc.value = function () {
      try {
        method();
      } catch (e) {
        console.log(errorMessage);
      }
    };
  };
}
