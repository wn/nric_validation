function is_nric_valid(nric) {
  if (
    nric.length !== 9 ||
    !['S', 'T', 'G', 'F'].includes(nric[0].toUpperCase())
  ) {
    return false;
  }
  var lastLetter = nric[8].toUpperCase();
  var nricCheckDigits = '0ABCDEFGHIZJ';
  var finCheckDigits = '0KLMNPQRTUWX';
  var digits = nric.slice(1, 8);
  var weights = [2, 7, 6, 5, 4, 3, 2];
  var sum = 0;

  if (isNaN(digits)) {
    return false;
  }
  for (var i = 0; i < digits.length; i++) {
    sum += parseInt(digits.charAt(i), 10) * weights[i];
  }
  if (['S', 'F'].includes(nric[0].toUpperCase())) {
    return nricCheckDigits.charAt(11 - (sum % 11)) === lastLetter;
  }
  return finCheckDigits.charAt(11 - ((sum + 4) % 11)) === lastLetter;
}
