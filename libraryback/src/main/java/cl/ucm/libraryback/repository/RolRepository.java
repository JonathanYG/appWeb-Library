package cl.ucm.libraryback.repository;

import cl.ucm.libraryback.entidades.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.io.Serializable;

@Repository("rolRepository")
public interface RolRepository extends JpaRepository<Rol , Serializable> {
}
