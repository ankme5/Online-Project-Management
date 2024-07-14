package com.project.onlineProjectManagment.Controllers;

import com.project.onlineProjectManagment.Entity.ApiResponse;
import com.project.onlineProjectManagment.Entity.AppUser;
import com.project.onlineProjectManagment.Enums.ResponseStatus;
import com.project.onlineProjectManagment.Services.CustomUserDetailsService;
import com.project.onlineProjectManagment.utils.JWTHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth/v1")
//@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {


    private Logger logger= LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private JWTHelper jwtHelper;

    @Autowired
    private AuthenticationManager manager;


    @Autowired
    private CustomUserDetailsService userDetailsService;

    @PostMapping(value = "/login")
    ResponseEntity<ApiResponse> login(@RequestBody AppUser request){

        ApiResponse apiResponse=new ApiResponse();
        try {
                  //Authenticate Username and Password
            manager.authenticate( new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

            UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());

            String token = jwtHelper.generateToken(userDetails);

            logger.info(token);
            logger.info("Login success");
            apiResponse.setMessage("Valid User");
            apiResponse.setStatus(ResponseStatus.SUCCESS);
            apiResponse.setToken(token);
            return new ResponseEntity<>(apiResponse,HttpStatus.OK);
        }catch (Exception e){
            logger.info(e.getMessage());
            apiResponse.setMessage(e.getMessage());
            apiResponse.setStatus(ResponseStatus.FAILURE);
            return new ResponseEntity<>(apiResponse,HttpStatus.FORBIDDEN);
        }

    }

}
