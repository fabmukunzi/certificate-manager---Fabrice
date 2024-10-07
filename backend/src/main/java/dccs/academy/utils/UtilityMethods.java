package dccs.academy.utils;

import java.security.SecureRandom;
import java.util.Base64;

public class UtilityMethods {
  public static String generateRandomString(int length) {
    String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    SecureRandom random = new SecureRandom();
    StringBuilder result = new StringBuilder(length);
    for (int i = 0; i < length; i++) {
      result.append(characters.charAt(random.nextInt(characters.length())));
    }
    return result.toString();
  }

  private static final String PREFIX = "data:application/pdf;base64,";

  public static String encode(byte[] data) {
    if (data == null) {
      return null;
    }
    return PREFIX + Base64.getEncoder().encodeToString(data);
  }

  public static byte[] decode(String base64String) {
    if (base64String == null || base64String.isEmpty()) {
      return null;
    }

    if (base64String.startsWith(PREFIX)) {
      base64String = base64String.substring(PREFIX.length());
    }

    return Base64.getDecoder().decode(base64String);
  }
}
