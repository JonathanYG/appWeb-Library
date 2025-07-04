package cl.ucm.libraryback.repository;

import cl.ucm.libraryback.entidades.Fine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.io.Serializable;

@Repository("fineRepository")
public interface FineRepository extends JpaRepository<Fine , Serializable> {
}
