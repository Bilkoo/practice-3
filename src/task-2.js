
export default class EnhancedSet extends Set {

    union(s) {
      let newset = new EnhancedSet([...this]);
      for (let i of s) newset.add(i);
      return newset;
    }

    intersection(s) {
      let newset = new EnhancedSet();
      for (let i of s) {
        if (this.has(i)) newset.add(i);
      }
      return newset;
    }

    difference(s) {
      let newset = new EnhancedSet();
      for (let i of this) {
        if (!s.has(i)) newset.add(i);
      }
      return newset;
    }

    symmetricDifference(s) {
      let newset = new EnhancedSet();
      for (let i of this) {
        if (!s.has(i)) newset.add(i);
      }
      for (let i of s) {
        if (!this.has(i)) newset.add(i);
      }
      return newset;
    }

    isSuperset(s) {
      for (let i of s) {
        if (!this.has(i)) return false;
      }
      return true;
    }

    isSubset(s) {
      for (let i of this) {
        if (!s.has(i)) return false;
      }
      return true;
    }
}
