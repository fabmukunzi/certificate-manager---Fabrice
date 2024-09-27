package dccs.academy.dtos;

import dccs.academy.entities.SupplierEntity;
import dccs.academy.utils.enums.CertificateType;

import java.time.LocalDateTime;
import java.util.List;

public class CertificateDto {
    private Long id;
    private LocalDateTime validFrom;
    private LocalDateTime validTo;
    private CertificateType certificateType;
    private String pdfUrl;
    private SupplierEntity supplier;
    private List<UserDto> certificateAssignedUsers;
    private List<CommentDto> comments;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getValidFrom() {
        return validFrom;
    }

    public void setValidFrom(LocalDateTime validFrom) {
        this.validFrom = validFrom;
    }

    public LocalDateTime getValidTo() {
        return validTo;
    }

    public void setValidTo(LocalDateTime validTo) {
        this.validTo = validTo;
    }

    public CertificateType getCertificateType() {
        return certificateType;
    }

    public void setCertificateType(CertificateType certificateType) {
        this.certificateType = certificateType;
    }

    public String getPdfUrl() {
        return pdfUrl;
    }

    public void setPdfUrl(String pdfUrl) {
        this.pdfUrl = pdfUrl;
    }

    public SupplierEntity getSupplier() {
        return supplier;
    }

    public void setSupplier(SupplierEntity supplier) {
        this.supplier = supplier;
    }

    public List<UserDto> getCertificateAssignedUsers() {
        return certificateAssignedUsers;
    }

    public void setCertificateAssignedUsers(List<UserDto> certificateAssignedUsers) {
        this.certificateAssignedUsers = certificateAssignedUsers;
    }

    public List<CommentDto> getComments() {
        return comments;
    }

    public void setComments(List<CommentDto> comments) {
        this.comments = comments;
    }
}
