package com.project.onlineProjectManagment.Entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.onlineProjectManagment.Enums.ResponseStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse {
    private ResponseStatus status;
    private String message;
    private String token;

}
