package dccs.academy.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "suppliers", schema = "certificates")
public class SupplierEntity extends BaseEntity{

    @Column(name = "names")
    private String names;

    @Column(name = "city")
    private String city;

    public String getNames() {
        return names;
    }

    public void setNames(String names) {
        this.names = names;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
