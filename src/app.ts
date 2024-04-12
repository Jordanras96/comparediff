interface Person {
  nom: string;
  age: number;
  localisation: { ville: string; etat: string };
  hobby: string[];
  marié: boolean;
  nombreFetiche: number[];
  couleurFavoris: string[];
  ami: { nom: string; age: number };
  enfant: null;
  THB: undefined;
}

const person1: Person = {
  nom: "John",
  age: 30,
  localisation: { ville: "New York", etat: "USA" },
  hobby: ["lire", "voyager"],
  marié: false,
  nombreFetiche: [1, 2, 3],
  couleurFavoris: ["bleu", "vert"],
  ami: { nom: "Alice", age: 25 },
  enfant: null,
  THB: undefined,
};

const person2: Person = {
  nom: "Doe",
  age: 31,
  localisation: { ville: "Los Angeles", etat: "USA" },
  hobby: ["lire", "cusiner"],
  marié: true,
  nombreFetiche: [1, 2, 4],
  couleurFavoris: ["bleu", "rouge"],
  ami: { nom: "Bob", age: 28 },
  enfant: null,
  THB: undefined,
};

function compareObjects<T extends Record<string, any>>(
  obj1: T,
  obj2: T
): Partial<T> {
  const diffProps: Partial<T> = {};

  const deepCompare = (value1: any, value2: any): boolean => {
    if (typeof value1 !== typeof value2) {
      return true;
    }

    if (Array.isArray(value1)) {
      if (!Array.isArray(value2) || value1.length !== value2.length) {
        return true;
      }
      return value1.some((elem, index) => deepCompare(elem, value2[index]));
    }

    if (typeof value1 === "object" && value1 !== null) {
      const keys1 = Object.keys(value1);
      const keys2 = Object.keys(value2);
      if (keys1.length !== keys2.length) {
        return true;
      }
      return keys1.some((key) => deepCompare(value1[key], value2[key]));
    }

    return value1 !== value2;
  };

  Object.keys(obj1).forEach((key) => {
    if (obj2.hasOwnProperty(key)) {
      if (deepCompare(obj1[key], obj2[key])) {
        diffProps[key as keyof T] = {
          person1Choice: obj1[key],
          person2Choice: obj2[key],
        } as T[keyof T];
      }
    }
  });

  return diffProps;
}
const differentProps = compareObjects(person1, person2);
console.log(differentProps);
function displayResults(results: any, person1: Person, person2: Person) {
  const resultsContainer = document.getElementById("results");
  if (resultsContainer) {
    // Person 1
    const person1Div = document.createElement("div");
    person1Div.classList.add("bg-gray-100", "p-4", "rounded-md", "mb-4");
    person1Div.innerHTML = `
            <h2 class="text-xl font-bold mb-2">Person 1</h2>
            <ul>`;
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

    // Person 2
    const person2Div = document.createElement("div");
    person2Div.classList.add("bg-gray-100", "p-4", "rounded-md", "mb-4");
    person2Div.innerHTML = `
            <h2 class="text-xl font-bold mb-2">Person 2</h2>
            <ul>`;
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

    // Résultats de la comparaison
    const resultsDiv = document.createElement("div");
    resultsDiv.classList.add("bg-gray-100", "p-4", "rounded-md");
    resultsDiv.innerHTML = `
            <h2 class="text-xl font-bold mb-4">Résultats de la comparaison :</h2>`;

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

    resultsContainer.appendChild(resultsDiv);
  }
}

// Appel de la fonction pour afficher les résultats
document.addEventListener("DOMContentLoaded", function () {
  displayResults(differentProps, person1, person2);
});
