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
    private int copybookFk;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "copybook_fk", referencedColumnName = "id_copybook", insertable = false, updatable = false)
    private Copy_book copy;

    @Temporal(TemporalType.DATE)
    @Column(name = "date_booking")
    private Date dateBooking;

    @Temporal(TemporalType.DATE)
    @Column(name = "date_return")
    private Date dateReturn;

    @Column(name = "user_fk")
    private String userFk;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_fk", referencedColumnName = "email", insertable = false, updatable = false)
    private UserEntity  user;

    private boolean state;
}
