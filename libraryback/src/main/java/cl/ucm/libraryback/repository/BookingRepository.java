package cl.ucm.libraryback.repository;

import cl.ucm.libraryback.entidades.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.io.Serializable;

@Repository("bookingRepository")
public interface BookingRepository extends JpaRepository<Booking, Serializable> {
}
