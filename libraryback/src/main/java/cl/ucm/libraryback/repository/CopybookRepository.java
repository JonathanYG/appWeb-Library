package cl.ucm.libraryback.repository;

import cl.ucm.libraryback.entidades.Copy_book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CopybookRepository extends JpaRepository<Copy_book, Integer> {

    // Buscar todas las copias asociadas a un libro específico
    List<Copy_book> findByBook_Id(int bookId);

    // Buscar todas las copias disponibles
    List<Copy_book> findByStateTrue();

    // Buscar copias disponibles de un libro específico
    List<Copy_book> findByBook_IdAndStateTrue(int bookId);
}
