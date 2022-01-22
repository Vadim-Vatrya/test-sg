import { INCLUDE_PARAM_NAME, EXCLUDE_PARAM_NAME } from '../actionParamNames';

const getFilteredResult = (data, filterParam, conditionName) => {
  const [filterKey] = Object.keys(filterParam);
  const [filterValue] = Object.values(filterParam);

  let result = null;
  if (conditionName === EXCLUDE_PARAM_NAME) {
    result = data.filter((obj) => obj[filterKey] !== filterValue);
  }
  if (conditionName === INCLUDE_PARAM_NAME) {
    result = data.filter((obj) => obj[filterKey] === filterValue);
  }
  return result;
};

export default getFilteredResult;
