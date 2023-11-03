import 'reflect-metadata'

const plane = {
  color: 'red'
};

// Metadata associated with a property
Reflect.defineMetadata('note', 'hi there', plane, 'color')

// Retriev metadata
const note = Reflect.getMetadata('note', plane, 'color')


// Define metadata
// Reflect.defineMetadata('note', 'hi there', plane);
// Reflect.defineMetadata('height', 10, plane);

// // Retrieve metadata
// const note = Reflect.getMetadata('note', plane)
// const height = Reflect.getMetadata('height', plane)
 console.log(note);