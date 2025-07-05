package cl.ucm.libraryback.servicios;

import cl.ucm.libraryback.entidades.Book;

import java.util.List;
import java.util.Optional;

public interface ServicioBook {
    void insertarBook(Book book);

    List<Book> getBook();
    Book buscarBook(int id);


}
