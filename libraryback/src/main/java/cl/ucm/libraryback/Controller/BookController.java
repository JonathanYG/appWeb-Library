package cl.ucm.libraryback.Controller;

import cl.ucm.libraryback.entidades.Book;
import cl.ucm.libraryback.servicios.ServicioBook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BookController {

    @Autowired
    private ServicioBook servicioBook;

    @GetMapping("/book")
    public List<Book> book() {
        return servicioBook.getBook();
    }


    @GetMapping("/hello")
    public String hello() {
        return "¡Hola, mundo!";
    }
}
