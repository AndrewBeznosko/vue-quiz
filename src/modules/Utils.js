export class Utils {
    /**
     * @param {*} value
     * @returns {Boolean}
     */
    static isNumber(value) {
      return !isNaN(parseFloat(value)) && isFinite(value)
    }
  
    /**
     * @param {*} value
     * @returns {Boolean}
     */
    static isNan() {
      return this.isNumber.apply(this, arguments) === false
    }
   
    /**
     * @param {arr1, arr2} value
     * @returns {Boolean}
     */
    static mustContainsAllValues(arr1, arr2) {
      return arr2.every(el => arr1.includes(el))
    }
  }
  
  export default Utils