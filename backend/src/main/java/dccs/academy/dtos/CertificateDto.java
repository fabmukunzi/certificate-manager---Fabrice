package dccs.academy.dtos;

import dccs.academy.utils.enums.CertificateType;
import java.time.LocalDate;
import java.util.List;

public class CertificateDto {
  private Long id;
  private LocalDate validFrom;
  private LocalDate validTo;
  private CertificateType type;
  private String pdfUrl;
  private SupplierDto supplier;
  private List<UserDto> assignedUsers;
  private List<CommentDto> comments;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public LocalDate getValidFrom() {
    return validFrom;
  }

  public void setValidFrom(LocalDate validFrom) {
    this.validFrom = validFrom;
  }

  public LocalDate getValidTo() {
    return validTo;
  }

  public void setValidTo(LocalDate validTo) {
    this.validTo = validTo;
  }

  public CertificateType getType() {
    return type;
  }

  public void setType(CertificateType type) {
    this.type = type;
  }

  public String getPdfUrl() {
    return pdfUrl;
  }

  public void setPdfUrl(String pdfUrl) {
    this.pdfUrl = pdfUrl;
  }

  public SupplierDto getSupplier() {
    return supplier;
  }

  public void setSupplier(SupplierDto supplier) {
    this.supplier = supplier;
  }

  public List<UserDto> getAssignedUsers() {
    return assignedUsers;
  }

  public void setAssignedUsers(List<UserDto> assignedUsers) {
    this.assignedUsers = assignedUsers;
  }

  public List<CommentDto> getComments() {
    return comments;
  }

  public void setComments(List<CommentDto> comments) {
    this.comments = comments;
  }
}
