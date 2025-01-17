package dccs.academy.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "suppliers", schema = "certificates")
public class SupplierEntity extends BaseEntity {

  @Column(name = "name")
  private String name;

  @Column(name = "city")
  private String city;

  @Column(name = "index", nullable = false, unique = true)
  private String index;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public void setIndex(String index) {
    this.index = index;
  }

  public String getIndex() {
    return index;
  }
}
