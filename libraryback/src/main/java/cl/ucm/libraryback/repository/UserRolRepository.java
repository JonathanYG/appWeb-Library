package cl.ucm.libraryback.repository;

import cl.ucm.libraryback.entidades.User_rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRolRepository extends JpaRepository<User_rol, Integer> {

    @Query(value = """
        SELECT r.name
        FROM rol r
        INNER JOIN user_rol ur ON ur.rol_fk = r.id_rol
        INNER JOIN user u ON ur.user_fk = u.email
        WHERE u.email = :username
    """, nativeQuery = true)
    List<String> getRolesByUsername(String username);

    User_rol findByUserFK(String userFk);
}

