
const customizeArray = (originalArray , attributeNames) => {
    if (!Array.isArray(originalArray) || originalArray.length === 0) {
        return [];
      }
      const newArray = originalArray.map((obj) => {
        const newObj = {};
        attributeNames.forEach((attribute) => {
          if (obj.hasOwnProperty(attribute)) {
            newObj[attribute] = obj[attribute];
          }
        });
        return newObj;
      });
    
      return newArray;
}

export default customizeArray