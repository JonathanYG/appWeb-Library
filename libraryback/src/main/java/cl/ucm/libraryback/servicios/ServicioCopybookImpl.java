package cl.ucm.libraryback.servicios;

import cl.ucm.libraryback.entidades.Copy_book;
import cl.ucm.libraryback.repository.CopybookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("serviciocopybook")
public class ServicioCopybookImpl implements ServicioCopybook {

    @Autowired
    @Qualifier("copybookRepository")
    private CopybookRepository copybookRepository;

    @Override
    public void insertarCopy(Copy_book copy) {
        copybookRepository.save(copy);
    }

    @Override
    public List<Copy_book> buscarPorLibroDisponible(int bookId) {
        return copybookRepository.findByBook_IdAndStateTrue(bookId);
    }

    @Override
    public List<Copy_book> buscarPorLibro(int bookId) {
        return copybookRepository.findByBook_Id(bookId);
    }
}
