package cl.ucm.libraryback.servicios;

import cl.ucm.libraryback.dto.out.BookingDTO;
import cl.ucm.libraryback.entidades.Booking;

import java.util.List;

public interface ServicioBooking {
    Booking registrarPrestamo(Booking booking);

    Booking registrarDevolucion(int idBooking, String email);

    List<BookingDTO> buscarPorEmail(String email);

    List<BookingDTO> obtenerTodos();
}
