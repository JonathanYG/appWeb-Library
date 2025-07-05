package cl.ucm.libraryback.dto.out;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UsuarioConRol {
    private String email;
    private String name;
    private String lastName;
    private boolean state;
    private String rol;
}
