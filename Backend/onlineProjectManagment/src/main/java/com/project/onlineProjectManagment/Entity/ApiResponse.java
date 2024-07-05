package com.project.onlineProjectManagment.Entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.onlineProjectManagment.ResponseStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse {
    private ResponseStatus status;
    private String message;
    private String token;

}
