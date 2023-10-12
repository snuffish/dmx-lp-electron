// @ts-nocheck
const data = { '1': 255, '2': 0, '3': 0 }

const newData = {};

for (const key in data) {
  if (data.hasOwnProperty(key)) {
    const newKey = parseInt(key, 10);
    newData[newKey] = data[key];
  }
}

console.log(newData)