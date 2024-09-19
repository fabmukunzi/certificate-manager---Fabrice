package dccs.academy.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;


@Entity
@Table(name = "comments", schema = "certificates")
public class CommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "content",nullable = false)
    private String content;

    @ManyToOne()
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "certificate_id",nullable = false)
    private  CertificateEntity certificates;

    @ManyToOne()
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

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

    public void setContent(String content) {
        this.content = content;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public void setCertificate(CertificateEntity certificate) {
        this.certificates = certificate;
    }

    public Long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public UserEntity getUser() {
        return user;
    }

    public CertificateEntity getCertificates() {
        return certificates;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
