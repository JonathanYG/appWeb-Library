package cl.ucm.libraryback.repository;

import cl.ucm.libraryback.entidades.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("bookRepository")
public interface BookRepository extends JpaRepository<Book, Integer> {

    // todos los libros de un tipo específico
    List<Book> findByType(String type);

    // libros por autor
    List<Book> findByAuthor(String author);

    // retorna varios si el título no es único
    List<Book> findByTitle(String title);
}
