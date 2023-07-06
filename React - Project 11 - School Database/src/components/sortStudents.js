// Function to sort alphabetically list of students

export default function sortStudents(objArr) {
  // Creating an object to store divided collections
  const classes = {};

  // Iterating through the array of objects
  objArr.forEach((obj) => {
    const { class: objClass, ...rest } = obj;

    // Checking if the "class" attribute exists in the object
    if (objClass) {
      // Checking if a collection with the given "class" value already exists
      if (classes[objClass]) {
        classes[objClass].push(rest);
      } else {
        classes[objClass] = [rest];
      }
    }
  });

  // Sorting keys (values of "class") in alphabetical order
  const sortedKeys = Object.keys(classes).sort();

  // Sorting arrays in the classes object based on the "surname" attribute
  sortedKeys.forEach((key) => {
    classes[key].sort((a, b) => {
      const surnameA = a.surname.toLowerCase();
      const surnameB = b.surname.toLowerCase();
      if (surnameA < surnameB) return -1;
      if (surnameA > surnameB) return 1;
      return 0;
    });
  });

  // Getting attribute keys
  const attributeKeys = Object.keys(objArr[0]).filter((key) => key !== "class");
  return { classes, sortedKeys, attributeKeys };
}
