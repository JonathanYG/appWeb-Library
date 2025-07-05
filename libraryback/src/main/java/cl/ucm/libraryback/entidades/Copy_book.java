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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "book_fk", referencedColumnName = "id_book", nullable = false)
    private Book book;

    @Column(nullable = true)
    private boolean state;

}
