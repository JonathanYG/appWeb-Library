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

    //  Registro de usuario
    @PostMapping("/register")
    public ResponseEntity<?> registrarUsuario(@RequestBody RegisterRequest request) {
        if (userRepository.existsById(request.getEmail())) {
            return ResponseEntity.badRequest().body("El usuario ya existe");
        }

        // Buscar o crear rol
        Rol rol = rolRepository.findByName(request.getRol());
        if (rol == null) {
            rol = new Rol();
            rol.setName(request.getRol());
            rolRepository.save(rol);
        }

        // Crear usuario
        UserEntity usuario = new UserEntity();
        usuario.setEmail(request.getEmail());
        usuario.setName(request.getName());
        usuario.setLastName(request.getLastName());
        usuario.setPassword(request.getPassword());
        usuario.setState(true);
        userRepository.save(usuario);

        // Crear relación UserRol
        User_rol ur = new User_rol();
        ur.setUserFK(request.getEmail());
        ur.setRolFK(rol.getId());
        userRolRepository.save(ur);

        return ResponseEntity.ok("Usuario registrado con éxito");
    }

    // Obtener todos los usuarios
    @GetMapping("/all")
    public ResponseEntity<List<UsuarioConRol>> obtenerTodosConRol() {
        List<UserEntity> usuarios = userRepository.findAll();

        List<UsuarioConRol> salida = usuarios.stream().map(user -> {
            // Obtener relación usuario-rol (asumiendo 1 rol por usuario)
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
        }).toList();

        return ResponseEntity.ok(salida);
    }

    // Cambiar estado activo/bloqueado de un usuario
    @PostMapping("/toggle-state/{email}")
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
