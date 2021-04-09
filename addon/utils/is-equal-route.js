export default function isEqualRoute(routeNameA = '', routeNameB = '') {
  return (
    routeNameA.replace(/\.index$/, '') === routeNameB.replace(/\.index$/, '')
  );
}
