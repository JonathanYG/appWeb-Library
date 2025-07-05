package cl.ucm.libraryback.servicios;

import cl.ucm.libraryback.dto.out.BookingDTO;
import cl.ucm.libraryback.entidades.*;
import cl.ucm.libraryback.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@Service("serviciobooking")
public class ServicioBookingImpl implements ServicioBooking {

    @Autowired @Qualifier("bookingRepository")
    private BookingRepository bookingRepository;

    @Autowired @Qualifier("copybookRepository")
    private CopybookRepository copybookRepository;

    @Autowired @Qualifier("userRepository")
    private UserRepository userRepository;

    @Autowired @Qualifier("fineRepository")
    private FineRepository fineRepository;

    @Override
    public Booking registrarPrestamo(Booking booking) {
        Copy_book copia = copybookRepository.findById(booking.getCopybookFk()).orElseThrow();
        UserEntity lector = userRepository.findById(booking.getUserFk()).orElseThrow();

        if (!copia.isState()) throw new RuntimeException("Copia no disponible");
        if (!lector.isState()) throw new RuntimeException("Usuario bloqueado o multado");

        LocalDate fechaHoy = LocalDate.now();
        LocalDate fechaDev = fechaHoy.plusDays(5);

        booking.setDateBooking(java.sql.Date.valueOf(fechaHoy));
        booking.setDateReturn(java.sql.Date.valueOf(fechaDev));
        booking.setState(true);

        copia.setState(false);
        copybookRepository.save(copia);

        return bookingRepository.save(booking);
    }

    @Override
    public Booking registrarDevolucion(int idBooking, String email) {
        Booking booking = bookingRepository.findById(idBooking).orElseThrow();
        Copy_book copia = booking.getCopy();
        Book libro = copia.getBook();
        UserEntity lector = userRepository.findById(email).orElseThrow();

        Date hoy = new Date();
        long diferencia = hoy.getTime() - booking.getDateReturn().getTime();
        long diasRetraso = diferencia / (1000 * 60 * 60 * 24);
        booking.setDateReturn(hoy);

        booking.setState(false);
        bookingRepository.save(booking);

        copia.setState(true);
        copybookRepository.save(copia);

        if (diasRetraso > 0) {
            int multaTotal = (int) diasRetraso * 1000;

            Fine multa = new Fine();
            multa.setUserFk(email);
            multa.setAmount(multaTotal);
            multa.setDescription("Devolución tardía: " + libro.getTitle());
            multa.setState(true);
            fineRepository.save(multa);

            lector.setState(false); // usuario multado
            userRepository.save(lector);
        }

        return booking;
    }

    @Override
    public List<BookingDTO> buscarPorEmail(String email) {
        List<Booking> bookings = bookingRepository.findByUserFk(email);
        return mapBookingsToDTO(bookings);
    }

    @Override
    public List<BookingDTO> obtenerTodos() {
        List<Booking> bookings = bookingRepository.findAll();
        return mapBookingsToDTO(bookings);
    }

    private List<BookingDTO> mapBookingsToDTO(List<Booking> bookings) {
        List<BookingDTO> lista = new ArrayList<>();
        for (Booking b : bookings) {
            Book libro = b.getCopy().getBook();
            UserEntity lector = b.getUser();

            String base64Image = libro.getImage64() != null
                    ? Base64.getEncoder().encodeToString(libro.getImage64())
                    : "";

            lista.add(new BookingDTO(
                    b.getId(),
                    lector.getName() + " " + lector.getLastName(),
                    lector.getEmail(),
                    base64Image,
                    libro.getTitle(),
                    libro.getAuthor(),
                    libro.getType(),
                    b.isState() ? "Prestado" : "Devuelto",
                    b.getDateBooking().toString(),
                    b.getDateReturn().toString()
            ));
        }
        return lista;
    }
}
