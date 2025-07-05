package cl.ucm.libraryback.servicios;

import cl.ucm.libraryback.dto.in.RegisterRequest;

import java.util.Optional;

public interface ServicioUser
{
    Optional<RegisterRequest> createUser(RegisterRequest dto);
}
