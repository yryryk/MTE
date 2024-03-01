import IfThenElseFormValues from '../Interfaces/IfThenElseFormValues';
import InputValues from '../Interfaces/InputValues';

function generateText(grandTemplate: IfThenElseFormValues, inputValues: InputValues): string {
  const valuesKeys = Object.keys(inputValues);
  function isIfValue(values: InputValues, keys: string[], ifContent: string): boolean {
    return keys.some((item) => ifContent.includes(`{${item}}`) && values[item]);
  }
  function generateString(values: InputValues, keys: string[], template: IfThenElseFormValues, result = '', key = 'main'): string {
    const element = template[key];
    if (typeof element === 'object') {
      const firstResult = generateString(values, keys, template, result, element.first);
      const secondResult = isIfValue(values, keys, String(template[element.if]))
        ? generateString(values, keys, template, firstResult, element.then)
        : generateString(values, keys, template, firstResult, element.else);
      const thirdResult = generateString(values, keys, template, secondResult, element.last);
      return thirdResult;
    }
    return result + element.replace(/{\w+}/gi, (str) => inputValues[str.slice(1, -1)] || str);
  }

  return generateString(inputValues, valuesKeys, grandTemplate);
}

export default generateText;
