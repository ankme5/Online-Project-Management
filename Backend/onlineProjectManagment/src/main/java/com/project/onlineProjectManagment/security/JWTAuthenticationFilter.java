package com.project.onlineProjectManagment.security;

import com.project.onlineProjectManagment.Services.CustomUserDetailsService;
import com.project.onlineProjectManagment.utils.JWTHelper;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;


@Component
public class JWTAuthenticationFilter extends OncePerRequestFilter {


    private static final List<String> EXCLUDED_PATHS = List.of("/auth/v1/login");
    Logger logger = LoggerFactory.getLogger(OncePerRequestFilter.class);
    @Autowired
    private JWTHelper jwtHelper;

//    @Autowired
//    public JWTAuthenticationFilter( JWTHelper jwtHelper, CustomUserDetailsService userDetailsService) {
//        this.jwtHelper = jwtHelper;
//        this.userDetailsService = userDetailsService;
//    }
    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        if (!EXCLUDED_PATHS.contains(request.getRequestURI())) {
            String requestHeader = request.getHeader("Authorization");
            String username = null;
            String token = null;

            if (requestHeader != null && requestHeader.startsWith("Bearer")) {
                token = requestHeader.substring(7);

                try {
                    username = jwtHelper.extractUsername(token);
                } catch (IllegalArgumentException e) {
                    logger.info("illegalArgument exception");
                    e.printStackTrace();
                } catch (ExpiredJwtException e) {
                    logger.info("JWT Token expire exception");
                    logger.info("JWT Token expired at " + e.getMessage());
                    e.printStackTrace();
                } catch (MalformedJwtException e) {
                    logger.info("some changes are done in JWT. INVALID TOKEN !!");
                    e.printStackTrace();
                } catch (Exception e) {
                    logger.info("Default Exception");
                    e.printStackTrace();
                }
            } else {
                logger.info("Invalid Header Value");
            }


            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                Boolean ValidateToken = jwtHelper.validateToken(token, userDetails);

                if (ValidateToken) {
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));


                    SecurityContextHolder.getContext().setAuthentication(authentication);
                } else {
                    logger.info("Validation Fails");
                }
            }
        }
        filterChain.doFilter(request, response);
    }

}
