package com.project.onlineProjectManagment.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "projects")
public class Project {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String project_name;

    @Column
    private String reason;

    @Column
    private String type;

    @Column
    private String division;

    @Column
    private String category;

    @Column
    private String priority;

    @Column
    private String department;

    @Column
    @Temporal(TemporalType.DATE)
    private Date start_date;

    @Column
    @Temporal(TemporalType.DATE)
    private Date end_date;

    @Column
    private String location;

    @Column
    private String status;


}
