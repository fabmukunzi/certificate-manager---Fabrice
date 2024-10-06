package dccs.academy.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "departments", schema = "certificates")
public class DepartmentEntity extends BaseEntity {
  @Column(name = "title", nullable = false, unique = true)
  private String title;

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }
}
