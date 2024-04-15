# Comparediff

# Guide d'utilisation

Ce guide explique le fonctionnement et l'utilisation du code TypeScript fourni pour comparer deux objets de type `Person` et afficher les différences dans une interface web.

## Prérequis

Avant d'utiliser ce code, assurez-vous d'avoir Node.js installé sur votre machine.

## Installation des dépendances

Exécutez la commande suivante dans votre terminal pour installer les dépendances nécessaires, notamment TypeScript :

```
npm install
```

## Compilation du code TypeScript

Après avoir installé les dépendances, compilez le code TypeScript en JavaScript en exécutant la commande suivante :

```
tsc --watch
```

Si la commande ci-dessus ne fonctionne pas, essayez d'installer TypeScript globalement en exécutant :

```
npm install -g typescript
```

## Explication du code

### Interface `Person`

L'interface `Person` définit la structure d'un objet représentant une personne. Elle comprend les propriétés suivantes :

- `nom` : Le nom de la personne (type: `string`).
- `age` : L'âge de la personne (type: `number`).
- `localisation` : Un objet contenant des informations sur la localisation de la personne, comprenant les propriétés `ville` et `etat` (type: `{ ville: string; etat: string }`).
- `hobby` : Un tableau contenant les hobbies de la personne (type: `string[]`).
- `marié` : Un booléen indiquant si la personne est mariée ou non (type: `boolean`).
- `nombreFetiche` : Un tableau contenant les nombres fétiches de la personne (type: `number[]`).
- `couleurFavoris` : Un tableau contenant les couleurs favorites de la personne (type: `string[]`).
- `ami` : Un objet représentant l'ami de la personne, avec les propriétés `nom` et `age` (type: `{ nom: string; age: number }`).
- `enfant` : La personne a-t-elle des enfants ? (type: `null`).
- `THB` : Une propriété avec une valeur `undefined`.

### Fonction `compareObjects`

1. **Définition des types génériques** : La fonction `compareObjects` est une fonction générique qui accepte deux paramètres de type `T` qui étendent `Record<string, any>`. Cela signifie qu'elle peut être utilisée pour comparer n'importe quel type d'objet, tant qu'il respecte cette structure de base.
2. **Initialisation de l'objet de différences** : Un objet `diffProps` est initialisé pour stocker les différences entre les deux objets.
3. **Fonction récursive `deepCompare`** : Cette fonction est utilisée pour comparer les valeurs de manière récursive. Elle prend deux valeurs en entrée et renvoie `true` si elles sont différentes, `false` sinon.
   - Si les types des valeurs sont différents, la fonction renvoie `true`.
   - Si les deux valeurs sont des tableaux, elles sont comparées en profondeur pour détecter les différences.
   - Si les deux valeurs sont des objets, leurs propriétés sont comparées en profondeur pour détecter les différences.
   - Sinon, les valeurs sont comparées directement.
4. **Parcours des propriétés des objets** : La fonction parcourt les propriétés du premier objet (`obj1`). Pour chaque propriété, si elle existe également dans le deuxième objet (`obj2`), la fonction `deepCompare` est appelée pour comparer les valeurs correspondantes des deux objets.
5. **Stockage des différences** : Si une différence est détectée, la propriété est ajoutée à l'objet `diffProps`, avec les valeurs correspondantes des deux objets.
6. **Retour des différences** : Une fois que toutes les propriétés ont été comparées, l'objet `diffProps` contenant les différences est retourné.

### Fonction `displayResults`

1. **Affichage des détails des personnes** : Cette fonction prend en entrée les résultats de la comparaison ainsi que les deux objets `Person` comparés. Elle crée des éléments HTML pour afficher les détails de chaque personne, y compris toutes leurs propriétés.
2. **Affichage des différences** : Les différences détectées par la fonction `compareObjects` sont parcourues, et chaque différence est affichée dans l'interface utilisateur. Les propriétés différentes sont affichées avec les valeurs correspondantes de chaque personne.

### Utilisation avec l'extension Live Server de Visual Studio Code

1. **Installation de l'extension Live Server** : Si vous utilisez Visual Studio Code, vous pouvez installer l'extension Live Server pour exécuter votre code HTML localement. Recherchez "Live Server" dans les extensions et installez-la.
2. **Ouverture du fichier HTML** : Ouvrez le fichier HTML dans Visual Studio Code.
3. **Clique droit sur le fichier HTML** : Dans le menu contextuel du fichier HTML ouvert, sélectionnez l'option "Open with Live Server" pour démarrer le serveur.
4. **Affichage des résultats dans le navigateur** : Votre navigateur par défaut s'ouvrira automatiquement avec votre fichier HTML affiché. Vous verrez les détails des deux personnes comparées ainsi que les différences détectées entre elles.
