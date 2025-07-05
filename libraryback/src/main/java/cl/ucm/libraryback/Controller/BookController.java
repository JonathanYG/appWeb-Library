package cl.ucm.libraryback.Controller;

import cl.ucm.libraryback.entidades.Book;
import cl.ucm.libraryback.servicios.ServicioBook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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


    @GetMapping("/book/{id}")
    public Book buscarBook(@PathVariable int id) {
        return servicioBook.buscarBook(id);
    }


    @PostMapping(path = "/create")
    public String create(Book book){
    servicioBook.insertarBook(book);
    return "ok";
    }
}