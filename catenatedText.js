
const data = await fetch("/data.json").then(d = d.json());
const everything = Object.keys(data).map(k => data[k]).flat()
.sort()
.filter((item, i, array) => array.indexOf(item) === i)

const collection = { ...data, lorem: everything}

window.collection = collection;

export default { ...data, lorem: everything};