package cl.ucm.libraryback.repository;
import cl.ucm.libraryback.entidades.Copy_book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.io.Serializable;

@Repository("copybookrepository")
public interface CopybookRepository  extends JpaRepository<Copy_book, Serializable> {

}
