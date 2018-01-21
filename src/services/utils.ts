export const isNumber = function (value: any): boolean {
  const intValue = parseInt(value, 10);

  return !Number.isNaN(intValue);
};

export const findAttributeWithMaxValue = function (obj: Object): any {
  return Object.keys(obj)
    .filter(key => isNumber(obj[key]))
    .reduce((previousValue, currentValue) => {
      if (obj[previousValue] >= obj[currentValue]) {
        return previousValue;
      }

      return currentValue;
    });
};
