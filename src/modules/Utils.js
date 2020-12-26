export class Utils {   
    /**
     * @param {arr1, arr2} value
     * @returns {Boolean}
     */
    static mustContainsAllValues(arr1, arr2) {
      return arr2.every(el => arr1.includes(el))
    }
  }
  
  export default Utils