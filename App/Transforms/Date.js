export default () => {
  const d = new Date();
  const month = `0${d.getMonth() + 1}`;
  const date = d.getDate();
  let hours = d.getHours().toString();
  let min = d.getMinutes().toString();
  let second = d.getSeconds().toString();
  if (second.length === 1) {
    second = `0${second}`;
  }
  if (min.length === 1) {
    min = `0${min}`;
  }
  if (hours.length === 1) {
    hours = `0${hours}`;
  }
  return `${d.getFullYear()}-${month}-${date} ${hours}:${min}:${second}`;
}
;