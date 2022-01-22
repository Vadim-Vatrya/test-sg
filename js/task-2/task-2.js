const getEndResult = (json) => {
  const originalJson = JSON.parse(json);
  const { data, condition: obj } = originalJson;
  let result = data;
  const conditionNames = Object.keys(obj);

  const getFilteredResult = (data, filterParam, conditionName) => {
    const [filterKey] = Object.keys(filterParam);
    const [filterValue] = Object.values(filterParam);

    let result = null;
    if (conditionName === "exclude") {
      result = data.filter((obj) => obj[filterKey] !== filterValue);
    }
    if (conditionName === "include") {
      result = data.filter((obj) => obj[filterKey] === filterValue);
    }
    return result;
  };

  conditionNames.forEach((conditionNames) => {
    if (conditionNames === "exclude" || conditionNames === "include") {
      const filterParam = obj[conditionNames][0];
      result = getFilteredResult(result, filterParam, conditionName);
    }
    if (conditionName === "sort_by") {
      const sortParam = obj[conditionNames][0];
      result = getSortedResult(result, data, sortParam);
    }
  });
  console.log("task2:", JSON.stringify({ result }));
  return JSON.stringify({ result });
};

const getFilteredResult = (data, filterParam, conditionName) => {
  const [filterKey] = Object.keys(filterParam);
  const [filterValue] = Object.values(filterParam);

  let result = null;
  if (conditionName === "exclude") {
    result = data.filter((obj) => obj[filterKey] !== filterValue);
  }
  if (conditionName === "include") {
    result = data.filter((obj) => obj[filterKey] === filterValue);
  }
  return result;
};

const getSortedResult = (result, data, sortParam) => {
  const sortParamType = typeof data[0][sortParam];

  if (sortParamType === "number") {
    return sortObjsByNumber(result, sortParam);
  }
  return sortObjsByStr(result, sortParam);
};

const sortObjsByStr = (objs, param) => {
  const arr = [...objs].sort((obj1, obj2) => {
    if (obj1[param] < obj2[param]) {
      return -1;
    }
    if (obj1[param] > obj2[param]) {
      return 1;
    }
    return 0;
  });
  return arr;
};

const sortObjsByNumber = (objs, param) => {
  return [...objs].sort((obj1, obj2) => obj1[param] - obj2[param]);
};

const taskJson2 =
  '{"data": [{"user": "mike@mail.com", "rating": 20, "disabled": false}, {"user": "greg@mail.com", ' +
  '"rating": 14, "disabled": false}, {"user": "john@mail.com", "rating": 25, "disabled": true}], ' +
  '"condition": {"exclude": [{"disabled": true}], "sort_by": ["rating"]}}';
getEndResult(taskJson2);
