const ROMAN_NUMBERS = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V',
  6: 'VI',
}

export function toRomanNumber(decimalNumber){
    return ROMAN_NUMBERS[decimalNumber].padEnd(3, ' ');
}