interface Person {
  name: string;
  age: number;
  location: { city: string; state: string };
  hobbies: string[];
  married: boolean;
  fetishNumbers: number[];
  favoriteColors: string[];
  friend: { name: string; age: number };
  child: null;
  THB: undefined;
}

const person1: Person = {
  name: "John",
  age: 30,
  location: { city: "New York", state: "USA" },
  hobbies: ["reading", "traveling"],
  married: false,
  fetishNumbers: [1, 2, 3],
  favoriteColors: ["blue", "green"],
  friend: { name: "Alice", age: 25 },
  child: null,
  THB: undefined,
};

const person2: Person = {
  name: "John",
  age: 31,
  location: { city: "Los Angeles", state: "USA" },
  hobbies: ["reading", "cooking"],
  married: true,
  fetishNumbers: [1, 2, 4],
  favoriteColors: ["blue", "red"],
  friend: { name: "Bob", age: 28 },
  child: null,
  THB: undefined,
};

const deepCompare = (value1: any, value2: any): boolean => {
  if (value1 !== value2) {
    return true;
  }

  if (typeof value1 === "object" && value1 !== null) {
    const keys1 = Object.keys(value1);
    const keys2 = Object.keys(value2);
    if (keys1.length !== keys2.length) {
      return true;
    }
    return keys1.some((key) => deepCompare(value1[key], value2[key]));
  }

  return false;
};

function compareObjects<
  T extends Record<string, any>,
  U extends Record<string, any>
>(obj1: T, obj2: U): Partial<T & U> {
  const diffProps: Partial<T & U> = {};

  Object.keys(obj1).forEach((key) => {
    if (obj2.hasOwnProperty(key)) {
      if (deepCompare(obj1[key], obj2[key])) {
        diffProps[key as keyof (T & U)] = {
          person1Choice: obj1[key],
          person2Choice: obj2[key],
        } as (T & U)[keyof (T & U)];
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

    const resultsDiv = document.createElement("div");
    resultsDiv.classList.add("bg-gray-100", "p-4", "rounded-md");
    resultsDiv.innerHTML = `
            <h2 class="text-xl font-bold mb-4">Comparison Results:</h2>`;
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

document.addEventListener("DOMContentLoaded", function () {
  displayResults(differentProps, person1, person2);
});
