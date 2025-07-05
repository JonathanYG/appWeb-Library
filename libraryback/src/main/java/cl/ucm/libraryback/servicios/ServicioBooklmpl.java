package cl.ucm.libraryback.servicios;

import cl.ucm.libraryback.entidades.Book;
import cl.ucm.libraryback.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("serviciobook")
public class ServicioBooklmpl implements ServicioBook{

    @Autowired

    @Qualifier("bookRepository")
    private BookRepository crud;

    @Override
    public void insertarBook(Book book) {
        crud.save(book);
    }

    @Override
    public List<Book> getBook() {
        return crud.findAll();
    }

    @Override
    public Book buscarBook(int id) {
        Optional<Book> bookOptional = crud.findById(id);
        return null;
    }



}
