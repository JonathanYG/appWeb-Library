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
public class User {

    @Id
    private String email;
    @Column(name = "last_name")
    private int lastname;
    private String name;
    private String password;
    private boolean state;
}
