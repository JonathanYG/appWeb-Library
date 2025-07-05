package cl.ucm.libraryback.dto.in;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
    private String email;
    private String name;
    private String lastName;
    private String password;
    private String rol; // "ADMIN" o "LECTOR"
}
