package cl.ucm.libraryback.servicios;

import cl.ucm.libraryback.entidades.Rol;
import cl.ucm.libraryback.entidades.UserEntity;
import cl.ucm.libraryback.entidades.User_rol;
import cl.ucm.libraryback.repository.RolRepository;
import cl.ucm.libraryback.repository.UserRepository;
import cl.ucm.libraryback.repository.UserRolRepository;
import cl.ucm.libraryback.dto.in.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountServicelmpl implements AccountService {

    @Autowired private UserRepository userRepository;
    @Autowired private UserRolRepository userRolRepository;
    @Autowired private RolRepository rolRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    @Override
    public Optional<RegisterRequest> createUser(RegisterRequest dto) {

        // 1. ¿usuario ya existe?
        if (userRepository.existsById(dto.getEmail())) {
            return Optional.empty();              // devolverá 404 en el controlador
        }

        // 2. Rol por defecto "LECTOR"
        Rol rol = rolRepository.findByName("LECTOR")
                .orElseThrow(() -> new IllegalStateException("Rol 'LECTOR' no existe"));

        // 3. Guardar usuario
        UserEntity user = new UserEntity();
        user.setEmail(dto.getEmail());
        user.setName(dto.getName());
        user.setLastName(dto.getLastName());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        userRepository.save(user);

        // 4. Relación usuario-rol
        User_rol link = new User_rol();
        link.setUserFK(user.getEmail());
        link.setRolFK(rol.getId());
        userRolRepository.save(link);

        // 5. No devuelvas password
        dto.setPassword(null);
        return Optional.of(dto);                  // el controlador responderá 200
    }
}
