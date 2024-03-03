function generateKeyFromWord(word: string): number {
  const key = word.split('')
    .reduce((multiply, symbol) => multiply * symbol.charCodeAt(0), 1)
    + word.split('')
      .reduce((sum, symbol) => sum + symbol.charCodeAt(0), 0);
  return key;
}

export default generateKeyFromWord;
