package com.project.onlineProjectManagment.repositories;

import com.project.onlineProjectManagment.Entity.Count;
import com.project.onlineProjectManagment.Entity.Project;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ProjectRepo extends JpaRepository<Project,Long> {


    @Query(value = "SELECT p.status,count(p.status) FROM projects p group by p.status",nativeQuery = true)
    List<Object[]> fetchAllCount();
}
