package cl.ucm.libraryback.repository;

import cl.ucm.libraryback.entidades.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.io.Serializable;

@Repository("bookRepository")
public interface BookRepository extends JpaRepository<Book, Serializable> {
}
