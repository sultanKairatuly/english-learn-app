export function useCapitalize() {
  function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  return {
    capitalize,
  };
}
