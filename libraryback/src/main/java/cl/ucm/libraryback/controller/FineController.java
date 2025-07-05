package cl.ucm.libraryback.controller;

import cl.ucm.libraryback.entidades.Fine;
import cl.ucm.libraryback.servicios.ServicioFine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fine")
public class FineController {

    @Autowired
    @Qualifier("serviciofine")
    private ServicioFine servicioFine;

    // GET: Buscar multas por email
    // Falta agregar para cuando se tenga token que Si es lector, solo puede ver sus propias multas
    @GetMapping("/find/{email}")
    public ResponseEntity<List<Fine>> obtenerMultasPorEmail(@PathVariable String email) {
        List<Fine> multas = servicioFine.buscarMultasPorUsuario(email);
        if (multas.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(multas);
    }
}
