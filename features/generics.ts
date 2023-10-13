// Class representing a simple array of numbers
class ArrayOfNumbers {
  constructor(public collection: number[]) {}

  get(index: number): number {
    return this.collection[index];
  }
}

class ArrayOfStrings {
  constructor(public collection: string[]){}
  
  get(index: number): string {
    return this.collection[index];
  }
}

// Generic class to represent multiple classes
class ArrayOfAnything<T>{
  constructor(public collection: T[]) {}

  get(index: number): T {
    return this.collection[index];
  }
}

const arr = new ArrayOfAnything(['a','b','c'])

// Example of generics with functions

function printStrings(arr: string[]): void {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i])
  }
}

function printNumbers(arr: number[]): void {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i])
  }
}

// Generic function to combine the two duplicated functions
function printAnything<T>(arr: T[]): void {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i])
  }
}

printAnything<string>(['a','b','c'])

// Generic Constraints

class Car {
  print() {
    console.log("I am a car")
  }
}

class House {
  print() {
    console.log('I am a house')
  }
}

// Type constraint for a generic function which uses an interface
interface Printable {
  print(): void;
}

// Generic fucntion takes an array of car or house, loops the
// elements and call print on car or house
function printHousesOrCars<T extends Printable>(arr: T[]): void {
  for (let i = 0; i < arr.length; i++) {
    arr[i].print();
  }
}

printHousesOrCars<House>([new House(), new House()])
printHousesOrCars<Car>([new Car(), new Car()])
