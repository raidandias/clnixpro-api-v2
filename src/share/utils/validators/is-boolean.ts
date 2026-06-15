export function stringToBoolean(
  str: string | boolean,
  defaultValue: boolean = false,
): boolean {
  //@ts-ignore
  const normalizedStr = str.toLowerCase();
  if (normalizedStr === 'true') {
    return true;
  } else if (normalizedStr === 'false') {
    return false;
  }

  // Retorna o valor padrão se a string não for válida
  return defaultValue;
}
