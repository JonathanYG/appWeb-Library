package cl.ucm.libraryback.entidades;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "user_rol")
@Getter
@Setter
@ToString
public class User_rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rol_user")
    private Integer id;

    @Column(name = "rol_fk")
    private Integer rolFK;

    @Column(name = "user_fk")
    private String userFK;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "rol_fk", referencedColumnName = "id_rol", insertable = false, updatable = false)
    private Rol rol;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_fk", referencedColumnName = "email", insertable = false, updatable = false)
    private UserEntity user;
}