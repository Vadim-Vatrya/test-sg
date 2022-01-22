import sortObjsByNumber from './sortObjsByNumber';
import sortObjsByStr from './sortObjsByStr';

const getSortedResult = (result, data, sortParam) => {
  const sortParamType = typeof data[0][sortParam];

  if (sortParamType === 'number') {
    return sortObjsByNumber(result, sortParam);
  }
  return sortObjsByStr(result, sortParam);
};

export default getSortedResult;
