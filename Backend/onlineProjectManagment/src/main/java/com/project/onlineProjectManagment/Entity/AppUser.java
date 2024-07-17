package com.project.onlineProjectManagment.Entity;


import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name="users")
public class AppUser {

    @Id
    @Column(unique = true,nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

}
