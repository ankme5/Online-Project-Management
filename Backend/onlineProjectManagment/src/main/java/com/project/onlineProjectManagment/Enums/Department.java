package com.project.onlineProjectManagment.Enums;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Department {

    INFORMATION_TECHNOLOGY("information technology","IT"),
    FINANCE("finance", "FIN"),
    HUMAN_RESOURCE("Human resource", "HR"),
    STRATEGY("strategy","STR"),
    QUALITY("quality","QLT"),
    SALES("sales","SLS"),
    LEGAL("legal","LGL");

    private final String name;
    private final String shortCode;

    public static String getShortCodeByName(String name){
        for(Department department: values()){
            if(department.getName().equalsIgnoreCase(name)){
                return department.getShortCode();
            }
        }
        return name;
    }

}
