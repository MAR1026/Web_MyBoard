package kr.hs.dgsw.myboard_back.Domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.*;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Data
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @Column(nullable = false, unique = true, length = 20)
    private String account;

    @Column(nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    public void setPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-512");
            md.update(password.getBytes(), 0, password.getBytes().length);
            this.password = new BigInteger(1, md.digest()).toString(16);
        } catch (NoSuchAlgorithmException error) {
            System.out.println("error");
            Logger logger = LoggerFactory.getLogger(User.class);
            logger.warn(error.getMessage());
            this.password = null;
        }
    }

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int gender; // 0 : 남성, 1 : 여성

    @Column(nullable = false)
    private int age;

    @Column()
    private String profileImage;
}
