package cl.ucm.libraryback.repository;

import cl.ucm.libraryback.entidades.User_rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.io.Serializable;

@Repository("userRolRepository")
public interface UserRolRepository extends JpaRepository<User_rol , Serializable> {
}
