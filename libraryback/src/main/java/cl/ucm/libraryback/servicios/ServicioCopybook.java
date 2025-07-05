package cl.ucm.libraryback.servicios;

import cl.ucm.libraryback.entidades.Copy_book;

import java.util.List;

public interface ServicioCopybook {

    void insertarCopy(Copy_book copy);

    List<Copy_book> buscarPorLibroDisponible(int bookId);

    List<Copy_book> buscarPorLibro(int bookId);
}
