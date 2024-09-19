package dccs.academy.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "suppliers", schema = "certificates")
public class SupplierEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "names")
    private String names;

    @Column(name = "city")
    private String city;

    @Column(name = "created_at",updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    private void onCreate(){
        this.createdAt=LocalDateTime.now();
    }

    @PreUpdate
    private void onUpdate(){
        this.updatedAt=LocalDateTime.now();
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setNames(String names) {
        this.names = names;
    }

    public Long getId() {
        return id;
    }

    public String getCity() {
        return city;
    }

    public String getNames() {
        return names;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
