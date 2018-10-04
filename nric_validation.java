import java.util.Arrays;
import java.util.stream.Stream;

public class NRIC {
    public static boolean checkSum(String ic) {
        ic = ic.trim().toUpperCase(); // Force uppercase for consistency.

        String[] validPrefix = {"S", "T", "G", "F"};
        Stream<String> icPrefixStream = Arrays.stream(validPrefix);

        if (ic == null || ic.length() != 9 || icPrefixStream.noneMatch(String.valueOf(ic.charAt(0))::equals)) {
            return false;
        }

        String prefix = String.valueOf(ic.charAt(0));
        String checksum = String.valueOf(ic.charAt(8));
        String digits = ic.substring(1, 8);

        int[] weights = {2, 7, 6, 5, 4, 3, 2};
        int sum = 0;

        if (Double.isNaN(Integer.valueOf(digits))) {
            return false;
        }

        // Generate checksum
        for (int i = 0; i < digits.length(); i++) {
            sum += Integer.parseInt(String.valueOf(digits.charAt(i))) * weights[i];
        }

        if (prefix.equals("S") || prefix.equals("T")) {
            String[] nricCheckDigits = {"J", "Z", "I", "H", "G", "F", "E", "D", "C", "B", "A"};
            return nricCheckDigits[sum % 11].equals(checksum);
        } else {
            sum += 4; // This rule was designed by the Singapore government.
            String[] finCheckDigits = {"X", "W", "U", "T", "R", "Q", "P", "N", "M", "L", "K"};
            return finCheckDigits[sum % 11].equals(checksum);
        }
    }
}
