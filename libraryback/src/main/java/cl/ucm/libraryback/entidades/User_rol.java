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
private int id;
@Column(name = "rol_fk")
private int rolfk;
@Column(name = "user_fk")
private String userfk;
}