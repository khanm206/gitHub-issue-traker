1️⃣ What is the difference between var, let, and const?

- var: Function-scoped, hoisted (initialized as undefined), can be reassigned and redeclared.
- let: Block-scoped, hoisted (temporal dead zone), can be reassigned, cannot be redeclared.
- const: Block-scoped, hoisted (temporal dead zone), cannot be reassigned or redeclared, but objects/arrays can be mutated.

---

2️⃣ What is the spread operator (...)?

- The spread operator spreads elements of arrays or properties of objects.
- Useful for cloning, merging, or passing multiple values.

---

3️⃣ What is the difference between map(), filter(), and forEach()?

- map(): Returns a new array with transformed values; does not modify the original array.
- filter(): Returns a new array with elements that pass a condition; does not modify the original array.
- forEach(): Returns undefined; used for iterating with side effects; does not create a new array.

---

4️⃣ What is an arrow function?

- A shorter syntax for writing functions.
- Inherits 'this' from surrounding scope.
- Cannot be used as constructors.

---

5️⃣ What are template literals?

- Strings using backticks `` ` ``.
- Support interpolation (`${expression}`) and multi-line strings.
