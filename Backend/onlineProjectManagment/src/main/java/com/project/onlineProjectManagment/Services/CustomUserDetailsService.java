package com.project.onlineProjectManagment.Services;

import com.project.onlineProjectManagment.Entity.AppUser;
import com.project.onlineProjectManagment.repositories.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {


    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

//    @Autowired
//    public CustomUserDetailsService(UserRepo userRepo, PasswordEncoder passwordEncoder) {
//        this.userRepo = userRepo;
//        this.passwordEncoder = passwordEncoder;
//    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

            AppUser user=userRepo.findByUsername(username);

            if(user==null){
                throw new UsernameNotFoundException("USER NOT FOUND");
            }

        return new User(user.getUsername(),passwordEncoder.encode(user.getPassword()), Collections.emptyList());
    }
}
