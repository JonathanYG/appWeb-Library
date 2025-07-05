package cl.ucm.libraryback.servicios;

import cl.ucm.libraryback.entidades.Book;
import cl.ucm.libraryback.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("serviciobook")
public class ServicioBookImpl implements ServicioBook {

    @Autowired
    @Qualifier("bookRepository")
    private BookRepository crud;

    @Override
    public void insertarBook(Book book) {
        crud.save(book);
    }

    @Override
    public List<Book> getBooks() {
        return crud.findAll();
    }

    @Override
    public List<Book> buscarPorTipo(String type) {
        return crud.findByType(type);
    }

    @Override
    public List<Book> buscarPorAutor(String author) {
        return crud.findByAuthor(author);
    }

    @Override
    public List<Book> buscarPorTitulo(String title) {
        return crud.findByTitle(title);
    }

    @Override
    public Optional<Book> buscarBook(int id) {
        return crud.findById(id);
    }
}
