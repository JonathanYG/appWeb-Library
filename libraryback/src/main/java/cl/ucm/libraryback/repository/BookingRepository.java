package cl.ucm.libraryback.repository;

import cl.ucm.libraryback.entidades.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
    // Buscar todos los préstamos de un usuario por email
    List<Booking> findByUserFk(String email);

    // Buscar préstamos activos por usuario (no debueltos)
    List<Booking> findByUserFkAndStateTrue(String email);
}
