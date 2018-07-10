function is_nric_valid(nric) {
        if (
          nric.length !== 9 ||
          !['S', 'T', 'G', 'F'].includes(nric[0].toUpperCase())
        ) {
          return false;
        }
        var lastLetter = nric[8].toUpperCase();
        var nricCheckDigits = 'JZIHGFEDCBA';
        var finCheckDigits = 'XWUTRQPNMLK';
        var digits = nric.slice(1, 8);
        var weights = [2, 7, 6, 5, 4, 3, 2];
        var sum = 0;

        if (isNaN(digits)) {
          return false;
        }
        if (['T', 'G'].includes(nric[0].toUpperCase())) {
          sum += 4;
        }
        for (var i = 0; i < digits.length; i++) {
          sum += parseInt(digits.charAt(i), 10) * weights[i];
        }
        if (['S', 'T'].includes(nric[0].toUpperCase())) {
          return nricCheckDigits.charAt(sum % 11) === lastLetter;
        }
        return finCheckDigits.charAt(sum % 11) === lastLetter;
      }
