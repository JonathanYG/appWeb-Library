package cl.ucm.libraryback.controller;

import cl.ucm.libraryback.dto.out.BookingDTO;
import cl.ucm.libraryback.entidades.Booking;
import cl.ucm.libraryback.servicios.ServicioBooking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/booking")
public class BookingController {

    @Autowired
    @Qualifier("serviciobooking")
    private ServicioBooking servicioBooking;

    @PostMapping("/new")
    public ResponseEntity<Booking> crearPrestamo(@RequestBody Booking booking) {
        Booking resultado = servicioBooking.registrarPrestamo(booking);
        return ResponseEntity.ok(resultado);
    }

    @PostMapping("/return/{idBooking}")
    public ResponseEntity<Booking> devolver(@PathVariable int idBooking, @RequestParam String email) {
        Booking resultado = servicioBooking.registrarDevolucion(idBooking, email);
        return ResponseEntity.ok(resultado);
    }

    @GetMapping("/find/{email}")
    public ResponseEntity<List<BookingDTO>> buscarPorEmail(@PathVariable String email) {
        return ResponseEntity.ok(servicioBooking.buscarPorEmail(email));
    }

    @GetMapping("/all")
    public ResponseEntity<List<BookingDTO>> obtenerTodos() {
        return ResponseEntity.ok(servicioBooking.obtenerTodos());
    }
}
