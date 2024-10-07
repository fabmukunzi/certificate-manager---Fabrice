package dccs.academy.entities;

import jakarta.persistence.*;
import java.util.List;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "users", schema = "certificates")
public class UserEntity extends BaseEntity {
  @Column(name = "first_name", nullable = false)
  private String firstName;

  @Column(name = "last_name", nullable = false)
  private String lastName;

  @Column(name = "user_id", nullable = false)
  private String userId;

  @Column(name = "plant")
  private String plant;

  @Column(name = "email")
  private String email;

  @ManyToOne()
  @OnDelete(action = OnDeleteAction.CASCADE)
  @JoinColumn(name = "department_id", nullable = false)
  private DepartmentEntity department;

  @ManyToMany(mappedBy = "users", cascade = CascadeType.ALL)
  private List<CertificateEntity> certificates;

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getPlant() {
    return plant;
  }

  public void setPlant(String plant) {
    this.plant = plant;
  }

  public DepartmentEntity getDepartment() {
    return department;
  }

  public void setDepartment(DepartmentEntity department) {
    this.department = department;
  }

  public List<CertificateEntity> getCertificates() {
    return certificates;
  }

  public void setCertificates(List<CertificateEntity> certificates) {
    this.certificates = certificates;
  }

  public String getUserId() {
    return userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getEmail() {
    return email;
  }
}
