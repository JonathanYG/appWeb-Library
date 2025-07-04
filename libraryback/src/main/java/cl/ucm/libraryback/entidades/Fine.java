package cl.ucm.libraryback.entidades;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Entity
@Table(name = "fine")
@Getter
@Setter
public class Fine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_fine")
    private int id;
    private int amount;
    private String description ;
    @Column(name = "user_fk")
    private int userfk;
    private boolean state;
}
