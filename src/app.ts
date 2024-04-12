// Interface définissant la structure des objets Person
interface Person {
  nom: string;
  age: number;
  localisation: { ville: string; etat: string };
  hobby: string[];
  marié: boolean;
  nombreFetiche: number[];
  couleurFavoris: string[];
  ami: { nom: string; age: number };
  enfant: null; // Type null
  THB: undefined; // Type undefined
}

// Définition de deux objets Person
const person1: Person = {
  nom: "John",
  age: 30,
  localisation: { ville: "New York", etat: "USA" },
  hobby: ["reading", "traveling"],
  marié: false,
  nombreFetiche: [1, 2, 3],
  couleurFavoris: ["blue", "green"],
  ami: { nom: "Alice", age: 25 },
  enfant: null,
  THB: undefined,
};

const person2: Person = {
  nom: "John",
  age: 31,
  localisation: { ville: "Los Angeles", etat: "USA" },
  hobby: ["reading", "cooking"],
  marié: true,
  nombreFetiche: [1, 2, 4],
  couleurFavoris: ["blue", "red"],
  ami: { nom: "Bob", age: 28 },
  enfant: null,
  THB: undefined,
};

// Fonction générique pour comparer deux objets de type T
function compareObjects<T extends Record<string, any>>(
  obj1: T,
  obj2: T
): Partial<T> {
  // Objet pour stocker les différences
  const diffProps: Partial<T> = {};

  // Fonction récursive pour comparer les valeurs des propriétés
  const deepCompare = (value1: any, value2: any): boolean => {
    if (typeof value1 !== typeof value2) {
      return true; // Types différents
    }

    if (Array.isArray(value1)) {
      if (!Array.isArray(value2) || value1.length !== value2.length) {
        return true; // Tableaux de tailles différentes ou types différents
      }
      return value1.some((elem, index) => deepCompare(elem, value2[index])); // Comparaison des éléments du tableau
    }

    if (typeof value1 === "object" && value1 !== null) {
      const keys1 = Object.keys(value1);
      const keys2 = Object.keys(value2);
      if (keys1.length !== keys2.length) {
        return true; // Objets avec des nombres de clés différents
      }
      return keys1.some((key) => deepCompare(value1[key], value2[key])); // Comparaison des propriétés des objets
    }

    return value1 !== value2; // Comparaison des valeurs primitives
  };

  // Parcours des propriétés du premier objet
  Object.keys(obj1).forEach((key) => {
    if (obj2.hasOwnProperty(key)) {
      // Vérification de l'existence de la propriété dans le deuxième objet
      if (deepCompare(obj1[key], obj2[key])) {
        // Comparaison des valeurs
        diffProps[key as keyof T] = {
          person1Choice: obj1[key], // Valeur de la première personne
          person2Choice: obj2[key], // Valeur de la deuxième personne
        } as T[keyof T]; // Assignation dans l'objet diffProps
      }
    }
  });

  return diffProps; // Retourne les différences
}

// Appel de la fonction de comparaison pour obtenir les différences entre person1 et person2
const differentProps = compareObjects(person1, person2);
console.log(differentProps);

// Fonction pour afficher les résultats dans le DOM
function displayResults(results: any, person1: Person, person2: Person) {
  const resultsContainer = document.getElementById("results");
  if (resultsContainer) {
    // Création d'un conteneur pour person1
    const person1Div = document.createElement("div");
    person1Div.classList.add("bg-gray-100", "p-4", "rounded-md", "mb-4");
    person1Div.innerHTML = `
            <h2 class="text-xl font-bold mb-2">Person 1</h2>
            <ul>`;
    // Parcours des propriétés de person1 pour afficher les détails
    for (const [key, value] of Object.entries(person1)) {
      person1Div.innerHTML += `
                <li class="space-x-2">
                    <span class="text-blue-500 font-bold">${key}:</span> <span class="text-slate-700">${JSON.stringify(
        value
      )}</span>
                </li>`;
    }
    person1Div.innerHTML += `</ul>`;
    resultsContainer.appendChild(person1Div);

    // Création d'un conteneur pour person2
    const person2Div = document.createElement("div");
    person2Div.classList.add("bg-gray-100", "p-4", "rounded-md", "mb-4");
    person2Div.innerHTML = `
            <h2 class="text-xl font-bold mb-2">Person 2</h2>
            <ul>`;
    // Parcours des propriétés de person2 pour afficher les détails
    for (const [key, value] of Object.entries(person2)) {
      person2Div.innerHTML += `
                <li class="space-x-2">
                    <span class="text-blue-500 font-bold">${key}:</span> <span class="text-slate-700">${JSON.stringify(
        value
      )}</span>
                </li>`;
    }
    person2Div.innerHTML += `</ul>`;
    resultsContainer.appendChild(person2Div);

    // Création d'un conteneur pour afficher les résultats de la comparaison
    const resultsDiv = document.createElement("div");
    resultsDiv.classList.add("bg-gray-100", "p-4", "rounded-md");
    resultsDiv.innerHTML = `
            <h2 class="text-xl font-bold mb-4">Résultats de la comparaison :</h2>`;
    // Parcours des résultats et affichage des différences
    for (const key in results) {
      if (results.hasOwnProperty(key)) {
        const diff = results[key];
        resultsDiv.innerHTML += `
                    <div class="mb-2">
                    <li class="space-x-2">
                    <span class="text-blue-500 font-bold">${key}:</span> <span class="text-slate-700">${JSON.stringify(
          diff
        )}</span>
                </li>
                        
                    </div>`;
      }
    }

    resultsContainer.appendChild(resultsDiv); // Ajout du conteneur des résultats dans le DOM
  }
}

// Événement DOMContentLoaded pour appeler la fonction displayResults une fois le DOM chargé
document.addEventListener("DOMContentLoaded", function () {
  displayResults(differentProps, person1, person2);
});
