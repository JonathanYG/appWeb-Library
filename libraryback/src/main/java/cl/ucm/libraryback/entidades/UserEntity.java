package cl.ucm.libraryback.entidades;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "user")
@Getter
@Setter
@ToString
public class UserEntity {
    @Id
    private String email;
    private String name;
    @Column(name = "last_name")
    private String lastName;
    private String password;
    private boolean state;
}
