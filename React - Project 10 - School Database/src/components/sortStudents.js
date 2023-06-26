export default function sortStudents(objArr) {
  // Tworzenie obiektu przechowującego podzielone kolekcje
  const classes = {};

  // Iterowanie po tablicy obiektów
  objArr.forEach((obj) => {
    const { class: objClass, ...rest } = obj;

    // Sprawdzanie, czy atrybut "class" istnieje w obiekcie
    if (objClass) {
      // Sprawdzanie, czy kolekcja o danej wartości "class" już istnieje
      if (classes[objClass]) {
        classes[objClass].push(rest);
      } else {
        classes[objClass] = [rest];
      }
    }
  });

  // Sortowanie kluczy (wartości "class") w kolejności alfabetycznej
  const sortedKeys = Object.keys(classes).sort();

  // Sortowanie tablic w obiekcie klas według atrybutu "surname"
  sortedKeys.forEach((key) => {
    classes[key].sort((a, b) => {
      const surnameA = a.surname.toLowerCase();
      const surnameB = b.surname.toLowerCase();
      if (surnameA < surnameB) return -1;
      if (surnameA > surnameB) return 1;
      return 0;
    });
  });

  // Pobieranie kluczy atrybutów
  const attributeKeys = Object.keys(objArr[0]).filter((key) => key !== "class");
  return { classes, sortedKeys, attributeKeys };
}
