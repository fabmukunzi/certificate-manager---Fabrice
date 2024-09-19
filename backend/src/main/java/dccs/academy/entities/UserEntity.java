package dccs.academy.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;
import java.util.List;


@Entity
@Table(name = "users", schema = "certificates")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",unique = true,nullable = false)
    private Long id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "plant")
    private String plant;

    @ManyToOne()
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "department_id", nullable = false)
    private DepartmentEntity department;

    @ManyToMany(mappedBy = "users", cascade = CascadeType.ALL)
    private List<CertificateEntity> certificates;

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

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setPlant(String plant) {
        this.plant = plant;
    }

    public void setDepartment(DepartmentEntity department) {
        this.department = department;
    }

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getPlant() {
        return plant;
    }

    public DepartmentEntity getDepartment() {
        return department;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
