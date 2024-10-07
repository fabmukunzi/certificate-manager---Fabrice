package dccs.academy.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "comments", schema = "certificates")
public class CommentEntity extends BaseEntity {

  @Column(name = "content", nullable = false)
  private String content;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "certificate_id", nullable = false)
  private CertificateEntity certificates;

  @ManyToOne()
  @JoinColumn(name = "user_id", nullable = false)
  private UserEntity user;

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public CertificateEntity getCertificates() {
    return certificates;
  }

  public void setCertificates(CertificateEntity certificates) {
    this.certificates = certificates;
  }

  public UserEntity getUser() {
    return user;
  }

  public void setUser(UserEntity user) {
    this.user = user;
  }
}
