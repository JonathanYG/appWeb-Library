package cl.ucm.libraryback.servicios;

import cl.ucm.libraryback.dto.in.RegisterRequest;

import java.util.Optional;

public interface AccountService
{
    Optional<RegisterRequest> createUser(RegisterRequest dto);
}
