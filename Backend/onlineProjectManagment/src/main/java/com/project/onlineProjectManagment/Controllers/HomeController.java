package com.project.onlineProjectManagment.Controllers;

import com.project.onlineProjectManagment.Entity.ApiResponse;
import com.project.onlineProjectManagment.Entity.ChartEntity;
import com.project.onlineProjectManagment.Entity.Project;
import com.project.onlineProjectManagment.Enums.ResponseStatus;
import com.project.onlineProjectManagment.Services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/home")
public class HomeController {

    @Autowired
    private ProjectService projectService;

    @PostMapping("/add-project")
    public ResponseEntity<ApiResponse> addProject(@RequestBody Project project){

        ApiResponse apiResponse=new ApiResponse();
        try {
            projectService.saveProject(project);
            apiResponse.setMessage("New project added successfully");
            apiResponse.setStatus(ResponseStatus.SUCCESS);
            return new ResponseEntity<>(apiResponse,HttpStatus.OK);
        }catch (Exception e){
            apiResponse.setMessage(e.getMessage());
            apiResponse.setStatus(ResponseStatus.FAILURE);
            return new ResponseEntity<>(apiResponse,HttpStatus.OK);
        }
    }

    @GetMapping("/all-projects")
    public List<Project> fetchAllProjects(){
        return projectService.fetchAllProject();
    }

    @GetMapping("/all-counts")
    public Map<String,Integer> fetchAllCounts(){
        return projectService.getStatusCount();
    }

    @GetMapping("/dept-totalCount")
    public List<ChartEntity> DepartWiseFatch(){
        return projectService.getDeptWiseTotalCount();
    }

    @PutMapping("/update-status/{id}/{status}")
    public void updateStatus(@PathVariable String status, @PathVariable String id){

        projectService.updateStatusbyID(status, Integer.parseInt(id));
    }
}
