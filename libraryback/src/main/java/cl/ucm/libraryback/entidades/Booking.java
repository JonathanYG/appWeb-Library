package cl.ucm.libraryback.entidades;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;



@Entity
@Getter
@Setter
@ToString
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_booking")
    private int id;
    @Column(name = "copybook_fk")
    private int copybookfk;
    @Column(name = "date_booking")
    private Date datebooking;
    @Column(name = "date_return")
    private Date   datereturn;
    @Column(name = "user_fk")
    private String userfk;
    private boolean state;
}
