import convertJson from '../convertJsonToObj';
import getSortedResult from './sort/getSortedResult';
import getFilteredResult from './filter/getFilteredResult';
import {
  SORT_PARAM_NAME,
  INCLUDE_PARAM_NAME,
  EXCLUDE_PARAM_NAME,
} from './actionParamNames';

const getResult = (json) => {
  const entry = convertJson(json);
  const { data, condition: conditionsObj } = entry;
  let result = data;
  const conditionNames = Object.keys(conditionsObj);

  conditionNames.forEach((conditionName) => {
    if (
      conditionName === EXCLUDE_PARAM_NAME ||
      conditionName === INCLUDE_PARAM_NAME
    ) {
      const filterParam = conditionsObj[conditionName][0];
      result = getFilteredResult(result, filterParam, conditionName);
    }
    if (conditionName === SORT_PARAM_NAME) {
      const sortParam = conditionsObj[conditionName][0];
      result = getSortedResult(result, data, sortParam);
    }
  });
  console.log('task2:', JSON.stringify({ result }));
  return JSON.stringify({ result });
};

export default getResult;
