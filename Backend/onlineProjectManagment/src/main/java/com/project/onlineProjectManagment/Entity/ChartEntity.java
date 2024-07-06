package com.project.onlineProjectManagment.Entity;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChartEntity {
    private String department;
    private Long total;
    private Long closed;

}
