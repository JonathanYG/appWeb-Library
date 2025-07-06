package cl.ucm.libraryback.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Component
public class JwtUtil {

    private static final String  SECRET_KEY = "Ucm-4p1s3rv1c3";
    private static final Algorithm ALGORITHM  = Algorithm.HMAC256(SECRET_KEY);
    private static final long     EXP_DAYS   = 15;               // tiempo de vida

    /*----------------------------------------------------------
     * 1. CREAR TOKEN: recibe username y authorities
     *---------------------------------------------------------*/
    public String create(String username,
                         Collection<? extends GrantedAuthority> authorities) {

        // ["ROLE_ADMIN","ROLE_LECTOR", ...]
        String[] roles = authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .toArray(String[]::new);

        return JWT.create()
                .withSubject(username)                    // solo el usuario
                .withIssuer("ucm-2025")                  // quien firma
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(
                        System.currentTimeMillis() +
                                TimeUnit.DAYS.toMillis(EXP_DAYS)))
                .withArrayClaim("roles", roles)          // claim de roles
                .sign(ALGORITHM);
    }

    /*----------------------------------------------------------
     * 2. VALIDAR TOKEN (firma + caducidad)
     *---------------------------------------------------------*/
    public boolean isValid(String jwt) {
        try {
            JWT.require(ALGORITHM).build().verify(jwt);
            return true;
        } catch (JWTVerificationException ex) {
            return false;
        }
    }

    /*----------------------------------------------------------
     * 3. EXTRAER USUARIO
     *---------------------------------------------------------*/
    public String getUsername(String jwt) {
        return decode(jwt).getSubject();
    }

    /*----------------------------------------------------------
     * 4. EXTRAER ROLES
     *---------------------------------------------------------*/
    public List<String> getRoles(String jwt) {
        return decode(jwt).getClaim("roles").asList(String.class);
    }

    /*----------------------------------------------------------
     * 5. HELPER PRIVADO
     *---------------------------------------------------------*/
    private DecodedJWT decode(String jwt) {
        return JWT.require(ALGORITHM).build().verify(jwt);
    }
}
