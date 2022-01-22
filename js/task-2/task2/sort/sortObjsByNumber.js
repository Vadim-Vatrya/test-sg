const sortObjsByNumber = (objs, param) => {
  return [...objs].sort((obj1, obj2) => obj1[param] - obj2[param]);
};

export default sortObjsByNumber;
