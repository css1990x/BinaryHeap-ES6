class BinaryHeap {
  constructor (comparator) {
    this._storage = [];
    this._compare = comparator || function (i, j) { return i < j };
  }

  getChildIndex (index) {
    var indicies = [(index * 2 + 1), (index * 2 + 2)].filter(function (index) { return index < this._storage.length }, this);
    if (indicies.length === 1) {
      return indicies[0];
    } else if (indicies.length === 0) {
      return null;
    } else {
      if (this._compare(this._storage[indicies[0]], this._storage[indicies[1]])) {
        return indicies[0];
      } else {
        return indicies[1];
      }
    }
  }

  insertElement (val) {
    this._storage.push(val);
    var index = this._storage.length - 1;
    var parentIndex = (Math.floor((index - 1) / 2));
    while ((index > 0) && (this._compare(this._storage[index], this._storage[parentIndex]))) {
      var temp = this._storage[index];
      this._storage[index] = this._storage[parentIndex];
      this._storage[parentIndex] = temp;
      index = parentIndex;
      parentIndex = (Math.floor((index - 1) / 2));
    }
  }

  removeHead () {
    if (this._storage.length === 0) {
      return null;
    } else if (this._storage.length === 1) {
      return this._storage.pop();
    } else { 
      var temp = this._storage[0];
      this._storage[0] = this._storage[this._storage.length - 1];
      this._storage[this._storage.length - 1] = temp;
      var head = this._storage.pop();
      var index = 0;
      var childIndex = this.getChildIndex(index);
      while ((childIndex !== null) && (this._compare(this._storage[childIndex], this._storage[index]))) {
        var temp = this._storage[index];
        this._storage[index] = this._storage[childIndex];
        this._storage[childIndex] = temp;
        index = childIndex;
        childIndex = this.getChildIndex(index);
      }
      return head;
    }
  }
}

var t = new BinaryHeap()
t.insertElement(7);
t.insertElement(6); 
t.insertElement(5); 
// console.log('this is remove Head', t.removeHead());
console.log(t._compare(2, 3))

function heapSort (arr) {
  var heap = new BinaryHeap();
  var results = [];
  for (var i = 0; i < arr.length; i++) {
    heap.insertElement(arr[i]);
  }
  while (results.length < arr.length){
    results.push(heap.removeHead()); 
  }
  return results; 
  // return results;
}

console.log(heapSort([9, 8, 6, 7, 5, 4, 3, 2, 1]));
