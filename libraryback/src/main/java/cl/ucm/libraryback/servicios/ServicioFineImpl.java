package cl.ucm.libraryback.servicios;

import cl.ucm.libraryback.entidades.Fine;
import cl.ucm.libraryback.repository.FineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("serviciofine")
public class ServicioFineImpl implements ServicioFine {

    @Autowired
    @Qualifier("fineRepository")
    private FineRepository fineRepository;

    @Override
    public List<Fine> buscarMultasPorUsuario(String email) {
        return fineRepository.findByUserFk(email);
    }
}
