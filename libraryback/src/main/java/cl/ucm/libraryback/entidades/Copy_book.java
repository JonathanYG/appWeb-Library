package cl.ucm.libraryback.entidades;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "copy_book")
@Getter
@Setter
public class Copy_book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_copybook")
    private int id;
    @Column(name = "book_fk")
    private int bookfk;
    private boolean state;

}
