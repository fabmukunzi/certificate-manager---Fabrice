package dccs.academy.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;


@Entity
@Table(name = "comments", schema = "certificates")
public class CommentEntity extends BaseEntity{

    @Column(name = "content",nullable = false)
    private String content;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "certificate_id",nullable = false)
    private  CertificateEntity certificates;

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
