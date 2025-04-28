export function nameFormatter(name: string) {
  const formattedName: string[] = [];
  for(const word of name.split("-")) {
    formattedName.push(word[0].toUpperCase() + word.slice(1));
  }

  return formattedName.join(" ");
}