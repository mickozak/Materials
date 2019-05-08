JAVASCRIPT

ARRAY

0. Concat

Metoda która łączy dwie lub wiecej tablic (nowa zmienna).
var new_array = old_array.concat([value1[, value2[, ...[, valueN]]]])

1. CopyWithin

Metoda która kopjuje część tablicy do innego lokalizacji w tej samej tablicy.
arr.copyWithin(target[, start[, end]])

2. Every

Metoda która sprawdza czy elementy tablicy przechodzą test realizowany przez funkcje. Zwraca true/false.
arr.every(callback(element[, index[, array]])[, thisArg])

3. Entries

Metoda która zwraca obiekt klucz - wartość (nowa zmienna).
array.entries()

4. Fill

Metoda która wypełnia wszystkie elementy tablicy od indeksu początkowego do indeksu końcowego.
arr.fill(value[, start[, end]])

5. Filter

Metoda tworzy nową tablicę z elementów które przejdą test.
var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])

6. Find

Metoda która zwraca pierwszy element z tablicy który przejdzie test funkcji.
arr.find(callback(element[, index[, array]])[, thisArg])

7. FindIndex

Metoda która zwraca index elementu który przechodzi test funkcji.
arr.findIndex(callback(element[, index[, array]])[, thisArg])

8. Flat

Metoda która z tablicy wielowymiarowej robi pojedyńczą płaską tablice. W argumencie podajemy stopień do którego ma przebiegać wypłaszczanie. Usuwa ona też puste sloty w tablicy.
var newArray = arr.flat([depth]);

9. FlatMap 

Metoda która wypłszczoną tablicę. Jeśli użyjemy map na tablicy to każdy element zostanie zwrócony w tablicy. Jeśli użyjemy flatmap() to wszystkie elementy będą w jednej tablicy.
var new_array = arr.flatMap(function callback(currentValue[, index[, array]]) {
    // return element for new_array
}[, thisArg])

let arr1 = [1,2, 3, 4];

arr1.map(x => [x * 2]); 
// [[2], [4], [6], [8]]

arr1.flatMap(x => [x * 2]);
// [2, 4, 6, 8]

10. forEach

Metoda która wykonuje funkcje dla każdego elementu tablicy.
arr.forEach(function callback(currentValue[, index[, array]]) {
    //your iterator
}[, thisArg]);

11. From

Metoda która tworzy nową, płytko skopiowaną instancję array.
Array.from(arrayLike[, mapFn[, thisArg]])

console.log(Array.from('foo'));
// expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], x => x + x));
// expected output: Array [2, 4, 6]

12. Includes

Metoda która zwraca true/false jeśli w tablicy znajduje się dany element/
arr.includes(searchElement[, fromIndex])

13. IndexOf

Metoda która zwraca index pierwszego napotkanego elementu.
arr.indexOf(searchElement[, fromIndex])

var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

console.log(beasts.indexOf('bison'));
// expected output: 1

// start from index 2
console.log(beasts.indexOf('bison', 2));
// expected output: 4

14. isArray

Metoda która zwraca true/false w zależności czy element jest tablicą lub nie.
Array.isArray(value)

15. Join

Metoda która łączy elementy tablicy w string.
arr.join([separator])

16. Key

Metoda zwraca nową tablicę. Jeśli tablica zawiera słowa to zostanie zwrócony index.

var one = ['Ada','Magda','Ola']
var two = one.key(one)

console.log(two)
// two = ['0','1','2']
arr.keys()

17. LastIndexOf

Metoda która zwraca indeks w tablicy. 

arr.lastIndexOf(searchElement)
arr.lastIndexOf(searchElement, fromIndex)

var numbers = [2, 5, 9, 2];
numbers.lastIndexOf(2);     // 3

18. Length

Metoda zwraca długość tablicy. 

19. Map

Metoda która zwraca nową tablicę.

var numbers = [1, 4, 9];
var doubles = numbers.map(function(num) {
  return num * 2;
});

20. Of

Metoda która zwraca nową tablicę. 
Array.of(7,8,9)
//[7,8,9]

21. Pop

Metoda która usuwa ostatni element tablicy.

22. Array.prototype

Metoda która umożliwia dodanie nowych metod i właściwości oraz rozszerzenie już istniejących.

23. Push

Metoda która dodaje element na ostatnim miejscu tablicy.

24. Reduce

Metoda która może mieć cztery parametry: accumulator, element, index, tablica.
Zwraca wartość zakumulowaną.

var array = [1,2,3,4]
array.reduce((acc,el)=>{
    return acc + el
})

25. ReduceRight

Metoda podobnie zwraca wartość z akumulowaną.

26. Reverse
a.reverse()

Metoda odwraca tablicę.

27. Shift

Metoda usuwa pierwszy element.
a.shift()

28. Slice

Metoda usuwa elementy z jednej tablicy do drugiej.

var fruits = ['banan','truskawka','wisnia','jablko']
var newFruits = fruits.slice(0,2)
//'banan','truskawka'

29. Some

Metoda służy do testowania czy ostatni element występuję w tablicy według funkcji tetsującej.

function isBiggerThan10(element, index, array) {
  return element > 10;
}
[2, 5, 8, 1, 4].some(isBiggerThan10);  // false
[12, 5, 8, 1, 4].some(isBiggerThan10); // true

30. Sort

Metoda służy do sortowania.

31. Splice

Metoda usuwa lub dodaje element do tablicy.
array.splice(start[, deleteCount[, item1[, item2[, ...]]]])

var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
var removed = myFish.splice(2, 0, 'drum');
// myFish is ["angel", "clown", "drum", "mandarin", "sturgeon"] 
// removed is [], no elements removed

var myFish = ['angel', 'clown', 'drum', 'mandarin', 'sturgeon'];
var removed = myFish.splice(3, 1);

// removed is ["mandarin"]
// myFish is ["angel", "clown", "drum", "sturgeon"] 

32. toString

Metoda która zwraca string.
arr.toString()

33. unshift

Metoda która dodaje pierwszy element do tablicy.
arr.unshift(element1[, ...[, elementN]])

34. Values

The values() method returns a new Array Iterator object that contains the values for each index in the array.

BOOLEAN

1. newBoolean

var x = new Boolean(false);
if (x) {
  // this code is executed
}

2. Boolean Prototype 

Metoda która umożliwia dodawanie nowcyh funkcjonalności metod i właściwości.

3. toString

Metoda która zamienia na String.

4. valueOf

Metoda zwraca wartość prymitywną.
