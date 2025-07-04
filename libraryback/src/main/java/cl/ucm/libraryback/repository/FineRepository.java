package cl.ucm.libraryback.repository;

import cl.ucm.libraryback.entidades.Fine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FineRepository extends JpaRepository<Fine, Integer> {

    // Buscar todas las multas de un usuario por email
    List<Fine> findByUserFk(String email);

    // Buscar solo multas activas (no pagadas)
    List<Fine> findByUserFkAndStateTrue(String email);
}
