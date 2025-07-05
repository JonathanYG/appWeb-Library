package cl.ucm.libraryback.servicios;

import cl.ucm.libraryback.entidades.Book;

import java.util.List;
import java.util.Optional;

public interface ServicioBook {

    void insertarBook(Book book);

    List<Book> getBooks();

    List<Book> buscarPorTipo(String tipo);

    List<Book> buscarPorAutor(String autor);

    List<Book> buscarPorTitulo(String titulo);

    Optional<Book> buscarBook(int id);
}
