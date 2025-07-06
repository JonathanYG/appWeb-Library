package cl.ucm.libraryback.controller;

import cl.ucm.libraryback.dto.in.LoginDto;
import cl.ucm.libraryback.dto.in.RegisterRequest;
import cl.ucm.libraryback.security.JwtUtil;
import cl.ucm.libraryback.servicios.AccountService;
import cl.ucm.libraryback.security.SecurityConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping (path = "/api/auth")
@Slf4j
public class AccountController {

    @Autowired
    private AccountService service;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;


    @PostMapping(path = "/create")
    public ResponseEntity<?> createUser(@RequestBody RegisterRequest dto) {
        Optional<RegisterRequest> optional = service.createUser(dto);
        if (optional.isPresent()) {
            return ResponseEntity.ok(optional.get());
        }
        return ResponseEntity.notFound().build();
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto dto) {

        // autentica con e-mail y contraseña
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()));

        // authorities = [ROLE_ADMIN, ROLE_LECTOR, …]
        String jwt = jwtUtil.create(
                dto.getEmail(),                       // sujeto
                authentication.getAuthorities());     // ← roles

        return ResponseEntity.ok(Map.of("token", jwt));
    }

}