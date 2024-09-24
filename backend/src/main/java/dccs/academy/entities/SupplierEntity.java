package dccs.academy.entities;

import jakarta.persistence.*;

import java.security.SecureRandom;

@Entity
@Table(name = "suppliers", schema = "certificates")
public class SupplierEntity extends BaseEntity{

    @Column(name = "name")
    private String name;

    @Column(name = "city")
    private String city;

    @Column(name = "index",nullable = false,unique = true)
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

    @PrePersist
    public void generateIndex() {
        this.index = generateRandomString(6);
    }

    private String generateRandomString(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        SecureRandom random = new SecureRandom();
        StringBuilder result = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            result.append(characters.charAt(random.nextInt(characters.length())));
        }
        return result.toString();
    }
}
