package cl.ucm.libraryback.controller;

import cl.ucm.libraryback.entidades.Book;
import cl.ucm.libraryback.entidades.Copy_book;
import cl.ucm.libraryback.servicios.ServicioBook;
import cl.ucm.libraryback.servicios.ServicioCopybook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@SuppressWarnings("unused")
@RestController
@RequestMapping("/api/book")
public class BookController {

    @Autowired
    @Qualifier("serviciobook")
    private ServicioBook servicioBook;

    @Autowired
    @Qualifier("serviciocopybook")
    private ServicioCopybook servicioCopyBook;

    // POST: Crear un libro y automáticamente una copia disponible
    @PostMapping("/new")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Book> crearLibro(@RequestBody Book libro) {
        servicioBook.insertarBook(libro);

        // Crear copia automáticamente
        Copy_book copia = new Copy_book();
        copia.setBook(libro);
        copia.setState(true);
        servicioCopyBook.insertarCopy(copia);

        return ResponseEntity.ok(libro);
    }

    // POST: Crear una nueva copia de un libro existente
    @PostMapping("/newcopy/{bookId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Copy_book> crearCopia(@PathVariable int bookId) {
        Book libro = servicioBook.buscarBook(bookId).orElse(null);
        if (libro == null) {
            return ResponseEntity.notFound().build();
        }

        Copy_book copia = new Copy_book();
        copia.setBook(libro);
        copia.setState(true); // disponible por defecto
        servicioCopyBook.insertarCopy(copia);

        return ResponseEntity.ok(copia);
    }

    // GET: Obtener todas las copias disponibles de un libro
    @GetMapping("/copy/available/{bookId}")
    public ResponseEntity<List<Copy_book>> buscarCopiasDisponibles(@PathVariable int bookId) {
        List<Copy_book> disponibles = servicioCopyBook.buscarPorLibroDisponible(bookId);
        return ResponseEntity.ok(disponibles);
    }

    // GET: Obtener copias disponibles por título del libro
    @GetMapping("/copy/{title}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<Copy_book>> buscarCopiasPorTitulo(@PathVariable String title) {
        List<Book> libros = servicioBook.buscarPorTitulo(title);
        if (libros.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        // Asumimos que puede haber varios libros con el mismo título, se juntan todas las copias disponibles
        List<Copy_book> todasDisponibles = new java.util.ArrayList<>();
        for (Book libro : libros) {
            List<Copy_book> disponibles = servicioCopyBook.buscarPorLibroDisponible(libro.getId());
            todasDisponibles.addAll(disponibles);
        }

        return ResponseEntity.ok(todasDisponibles);
    }

    // GET: Obtener todos los libros
    @GetMapping("/all")
    public List<Book> obtenerTodos() {
        return servicioBook.getBooks();
    }

    // GET: Buscar libros por tipo
    @GetMapping("/all/type/{type}")
    public List<Book> buscarPorTipo(@PathVariable String type) {
        return servicioBook.buscarPorTipo(type);
    }

    // GET: Buscar libros por autor
    @GetMapping("/all/author/{author}")
    public List<Book> buscarPorAutor(@PathVariable String author) {
        return servicioBook.buscarPorAutor(author);
    }

    // GET: Buscar libros por título
    @GetMapping("/all/title/{title}")
    public List<Book> buscarPorTitulo(@PathVariable String title) {
        return servicioBook.buscarPorTitulo(title);
    }
}

