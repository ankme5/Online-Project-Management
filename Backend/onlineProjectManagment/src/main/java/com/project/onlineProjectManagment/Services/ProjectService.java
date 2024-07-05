package com.project.onlineProjectManagment.Services;

import com.project.onlineProjectManagment.Entity.Count;
import com.project.onlineProjectManagment.Entity.Project;
import com.project.onlineProjectManagment.repositories.ProjectRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    private static final Logger log = LoggerFactory.getLogger(ProjectService.class);
    @Autowired
    private ProjectRepo projectRepo;

    public Project saveProject(Project project){
        return projectRepo.save(project);
    }

    public List<Project> fetchAllProject(){
        log.info("fetching all records");
        return projectRepo.findAll();

    }


    public Map<String,Integer> getStatusCount(){
        log.info("fetching all counts");
        Map<String,Integer> statusCode= projectRepo.fetchAllCount().stream().collect(Collectors.toMap(
                result -> result[0].toString(),
                result -> ((Long) result[1]).intValue()
        ));
        statusCode.put("Total",statusCode.values().stream().mapToInt(Integer::intValue).sum());
        return statusCode;

    }
}
