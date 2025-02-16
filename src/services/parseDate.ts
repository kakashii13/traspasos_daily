function parseDate(date: string, isMono: boolean = false): string {
  if (isMono) {
    return `${date.slice(0, 4)}-${date.slice(4, 6)}-01`;
  }

  const [day, month, year] = date.split("/");
  return `${year}-${month}-${day}`;
}

export default parseDate;
