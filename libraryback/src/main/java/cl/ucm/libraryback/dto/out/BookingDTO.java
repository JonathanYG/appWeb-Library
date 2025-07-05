package cl.ucm.libraryback.dto.out;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BookingDTO {
    private int id;
    private String lector;
    private String email;
    private String image64;
    private String title;
    private String author;
    private String type;
    private String estado;
    private String dateBooking;
    private String dateReturn;
}
