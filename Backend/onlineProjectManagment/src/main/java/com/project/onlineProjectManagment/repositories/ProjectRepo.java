package com.project.onlineProjectManagment.repositories;

import com.project.onlineProjectManagment.Entity.ChartEntity;
import com.project.onlineProjectManagment.Entity.Project;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ProjectRepo extends JpaRepository<Project,Long> {


    @Query(value = "SELECT p.status,count(p.status) FROM projects p group by p.status union all select 'closure_delay',count(id) from projects where end_date < SYSDATE",nativeQuery = true)
    List<Object[]> fetchAllCount();

    @Query(value = "SELECT department,COUNT(id) AS total,SUM(CASE WHEN status = 'Closed' THEN 1 ELSE 0 END) AS closed FROM projects GROUP BY department", nativeQuery = true)
    List<Object[]> fetchDeptWiseCount();

    @Modifying
    @Transactional
    @Query(value = "UPDATE projects p SET p.status=?1 where p.id=?2",nativeQuery = true)
    int updateStatuByID(String status,int projId);
}
