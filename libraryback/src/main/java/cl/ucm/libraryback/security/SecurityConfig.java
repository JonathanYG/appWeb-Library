package cl.ucm.libraryback.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

@EnableWebSecurity
@Configuration
public class SecurityConfig {
    @Autowired
    private CorsConfigurationSource corsConfigurationSource;
    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(c -> c.configurationSource(corsConfigurationSource))
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth

                        /* =========== 1. PUBLIC  =========== */
                        .requestMatchers(HttpMethod.POST, "/api/auth/**").permitAll()   // /register, /login
                        .requestMatchers(HttpMethod.GET , "/api/book/all/**").permitAll()

                        /* =========== 2. SOLO ADMIN  =========== */
                        // Libros
                        .requestMatchers(HttpMethod.POST, "/api/book/new", "/api/book/newcopy").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET , "/api/book/find/**", "/api/book/copy/**").hasRole("ADMIN")
                        // Reservas / Devoluciones
                        .requestMatchers(HttpMethod.POST, "/api/booking/new",
                                "/api/booking/return/**").hasRole("ADMIN")
                        // Lectores, multas, estados
                        .requestMatchers(HttpMethod.GET , "/api/reader/find/**",
                                "/api/fine/find/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/reader/state/**").hasRole("ADMIN")

                        /* =========== 3. ADMIN  o  LECTOR =========== */
                        // El mismo end-point lo usan ambos perfiles
                        .requestMatchers(HttpMethod.GET , "/api/booking/find/**").hasAnyRole("ADMIN", "LECTOR")
                        .requestMatchers(HttpMethod.GET , "/api/fine/find/**").hasAnyRole("ADMIN", "LECTOR")

                        /* =========== 4. RESTO =========== */
                        .anyRequest().authenticated()
                );

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}