const units = {
  m: {
    m: 1,
    cm: 100,
    in: 39.37,
    ft: 3.281,
  },
  cm: {
    m: 0.01,
    cm: 1,
    in: 0.394,
    ft: 0.033,
  },
  in: {
    m: 0.0254,
    cm: 2.54,
    in: 1,
    ft: 0.0833,
  },
  ft: {
    m: 0.3048,
    cm: 30.48,
    in: 12,
    ft: 1,
  },
};

const result = {};

function converter(source) {
  const data = JSON.parse(source);

  const unit = data.distance.unit;
  const value = data.distance.value;
  const conclusion = data.convert_to;

  result.unit = conclusion;

  result.value = value * units[unit][conclusion];
  result.value = Math.round(result.value * 100) / 100;

  const resultJson = JSON.stringify(result);

  console.log(resultJson);
}

function newUnits(source) {
  const new_units = JSON.parse(source);

  for (let key in new_units) {
    units[key] = new_units[key];

    for (let prop in new_units[key]) {
      for (let char in units) {
        if (char === prop) {
          units[char][key] = 1 / new_units[key][char];
          units[char][key] = Number(ratio[char][key].toFixed(7));
        }
      }
    }
  }
}

const extraUnits = {
  km: {
    km: 1,
    m: 1000,
    cm: 100000,
    mm: 1000000,
    in: 39379.1,
    ft: 3280.84,
    yd: 1093.61,
    mi: 0.621371,
  },
  mm: {
    km: 0.000001,
    m: 0.001,
    cm: 0.1,
    mm: 1,
    in: 0.0393701,
    ft: 0.003281,
    yd: 0.0010936,
    mi: 0.0000006,
  },
  yd: {
    km: 0.0009144,
    m: 0.9144,
    cm: 91.44,
    mm: 914.4,
    in: 36,
    ft: 3,
    yd: 1,
    mi: 0.000568,
  },
  mi: {
    km: 1.60934,
    m: 1609.34,
    cm: 160934,
    mm: 1609340,
    in: 63360,
    ft: 5280,
    yd: 1760,
    mi: 1,
  },
};

const extraUnitsJson = JSON.stringify(extraUnits);

newUnits(extraUnitsJson);

console.log(units);
// console.log(JSON.stringify(units));

// test

// let test = {
// 	distance: {
// 		unit: "m",
// 		value: 142,
// 	},
// 	convert_to: "yd",
// };

// let testJson = JSON.stringify(test);

// converter(testJson);
