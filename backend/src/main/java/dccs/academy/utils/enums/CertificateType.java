package dccs.academy.utils.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum CertificateType {

    PERMISSION_OF_PRINTING("Permission of Printing"),
    OHSAS_18001("OHSAS 18001");

    private final String displayName;

    CertificateType(String displayName) {
        this.displayName = displayName;
    }

    @JsonValue
    public String getDisplayName() {
        return displayName;
    }

    public static CertificateType stringToEnum(String type) {
        try {
            return CertificateType.valueOf(type);
        } catch (IllegalArgumentException e) {
            for (CertificateType certificateType : CertificateType.values()) {
                if (certificateType.displayName.equalsIgnoreCase(type)) {
                    return certificateType;
                }
            }
        }
        throw new IllegalArgumentException("No constant with text " + type + " found");
    }

}