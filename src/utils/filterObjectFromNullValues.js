const filterObjectFromNullValues = (values)=>{
    const newObj = {};
    for (const key in values) {
      if (values[key] !== null && values[key] !== '') {
        newObj[key] = values[key];
      }
    }
    return newObj
}

export default filterObjectFromNullValues