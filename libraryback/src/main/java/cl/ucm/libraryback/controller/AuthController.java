package cl.ucm.libraryback.controller;

import cl.ucm.libraryback.dto.in.RegisterRequest;
import cl.ucm.libraryback.dto.out.UsuarioConRol;
import cl.ucm.libraryback.entidades.Rol;
import cl.ucm.libraryback.entidades.UserEntity;
import cl.ucm.libraryback.entidades.User_rol;
import cl.ucm.libraryback.repository.RolRepository;
import cl.ucm.libraryback.repository.UserRepository;
import cl.ucm.libraryback.repository.UserRolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private UserRolRepository userRolRepository;

    // Obtener todos los usuarios
    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<UsuarioConRol>> obtenerLectoresConRol() {
        List<UserEntity> usuarios = userRepository.findAll();

        List<UsuarioConRol> salida = usuarios.stream()
                .map(user -> {
                    User_rol userRol = userRolRepository.findByUserFK(user.getEmail());

                    String rolNombre = "Sin rol";
                    if (userRol != null) {
                        Rol rol = rolRepository.findById(userRol.getRolFK()).orElse(null);
                        if (rol != null) rolNombre = rol.getName();
                    }

                    return new UsuarioConRol(
                            user.getEmail(),
                            user.getName(),
                            user.getLastName(),
                            user.isState(),
                            rolNombre
                    );
                })
                .filter(usuario -> "LECTOR".equalsIgnoreCase(usuario.getRol())) // 🔹 Solo LECTOR
                .toList();

        return ResponseEntity.ok(salida);
    }

    // Buscar usuario por email
    @GetMapping("/find/{email}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> buscarPorEmail(@PathVariable String email) {
        return userRepository.findById(email).map(user -> {
            User_rol userRol = userRolRepository.findByUserFK(user.getEmail());

            String rolNombre = "Sin rol";
            if (userRol != null) {
                Rol rol = rolRepository.findById(userRol.getRolFK()).orElse(null);
                if (rol != null) rolNombre = rol.getName();
            }

            UsuarioConRol usuarioDTO = new UsuarioConRol(
                    user.getEmail(),
                    user.getName(),
                    user.getLastName(),
                    user.isState(),
                    rolNombre
            );

            return ResponseEntity.ok(usuarioDTO);

        }).orElse(ResponseEntity.notFound().build());
    }

    // Cambiar estado activo/bloqueado de un usuario
    @PostMapping("/toggle-state/{email}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> cambiarEstado(@PathVariable String email) {
        return userRepository.findById(email).map(usuario -> {
            boolean nuevoEstado = !usuario.isState(); // invierte el estado
            usuario.setState(nuevoEstado);
            userRepository.save(usuario);
            String estadoTexto = nuevoEstado ? "activado" : "bloqueado";
            return ResponseEntity.ok("Usuario " + estadoTexto);
        }).orElse(ResponseEntity.notFound().build());
    }
}
