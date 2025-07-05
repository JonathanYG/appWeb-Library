package cl.ucm.libraryback.controller;

import cl.ucm.libraryback.dto.in.RegisterRequest;
import cl.ucm.libraryback.security.JwtUtil;
import cl.ucm.libraryback.servicios.AccountService;
import cl.ucm.libraryback.security.SecurityConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping (path = "auth")
public class AccountController {

    @Autowired
    private AccountService service;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;


    @PostMapping(path = "create")
    public ResponseEntity<?> createUser(@RequestBody RegisterRequest dto){
        Optional<RegisterRequest> optional = service.createUser(dto);
        if(optional.isPresent()){
            return ResponseEntity.ok(optional.get());
        }
        return ResponseEntity.notFound().build();

    }
}
