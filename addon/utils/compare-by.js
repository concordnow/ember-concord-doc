export default function compareBy(a, b, prop) {
  if (a[prop] < b[prop]) {
    return -1;
  }
  if (a[prop] > b[prop]) {
    return 1;
  }

  return 0;
}
