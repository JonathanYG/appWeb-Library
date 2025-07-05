package cl.ucm.libraryback.servicios;

import cl.ucm.libraryback.entidades.Fine;

import java.util.List;

public interface ServicioFine {
    List<Fine> buscarMultasPorUsuario(String email);
}
