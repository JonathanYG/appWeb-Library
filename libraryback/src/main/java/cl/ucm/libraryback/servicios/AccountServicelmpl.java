package cl.ucm.libraryback.servicios;

import cl.ucm.libraryback.entidades.Rol;
import cl.ucm.libraryback.entidades.UserEntity;
import cl.ucm.libraryback.entidades.User_rol;
import cl.ucm.libraryback.repository.RolRepository;
import cl.ucm.libraryback.repository.UserRepository;
import cl.ucm.libraryback.repository.UserRolRepository;
import cl.ucm.libraryback.dto.in.RegisterRequest;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ServicioUserlmpl implements ServicioUser {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserRolRepository userRolRepository;
    @Autowired
    private RolRepository rolRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Optional<RegisterRequest> createUser(RegisterRequest dto){
        Optional<UserEntity> optionalUserEntity =  userRepository.findById(dto.getEmail());
        Optional<Rol> optionalRol = rolRepository.findById(Integer.valueOf(dto.getRol()));

            if (optionalUserEntity.isPresent()){
                return Optional.empty();
            }
            if(optionalRol.isEmpty()){
                return Optional.empty();
            }


            UserEntity user = new UserEntity();
            user.setEmail(dto.getEmail());
            user.setName(dto.getName());
            user.setLastName(dto.getLastName());
            user.setPassword(passwordEncoder.encode(dto.getPassword()));


            User_rol  userRol = new User_rol();
            userRol.setRolFK(Integer.parseInt(dto.getRol()));
            userRol.setUserFK(dto.getEmail());
            userRolRepository.save(userRol);

            userRepository.save(user);




        dto.setPassword(user.getPassword());
        return Optional.of(dto);
    }
}
