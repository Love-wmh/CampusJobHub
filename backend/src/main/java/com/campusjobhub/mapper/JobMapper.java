package com.campusjobhub.mapper;

import com.campusjobhub.entity.Job;
import org.apache.ibatis.annotations.*;

import java.math.BigDecimal;
import java.util.List;

public interface JobMapper {
    @Insert("""
            INSERT INTO job(company_id, job_name, job_description, ability_description, recruit_count, salary_min, salary_max)
            VALUES(#{companyId}, #{jobName}, #{jobDescription}, #{abilityDescription}, #{recruitCount}, #{salaryMin}, #{salaryMax})
            """)
    @Options(useGeneratedKeys = true, keyProperty = "jobId")
    int addJob(Job job);

    @Update("""
            UPDATE job
            SET company_id=#{companyId}, job_name=#{jobName}, job_description=#{jobDescription},
                ability_description=#{abilityDescription}, recruit_count=#{recruitCount},
                salary_min=#{salaryMin}, salary_max=#{salaryMax}
            WHERE job_id=#{jobId}
            """)
    int updateJob(Job job);

    @Delete("DELETE FROM job WHERE job_id=#{jobId}")
    int deleteJob(Long jobId);

    @Select("SELECT * FROM job WHERE job_id=#{jobId}")
    Job findJobById(Long jobId);

    @Select("""
            SELECT * FROM job
            WHERE salary_min >= #{minSalary} AND salary_max <= #{maxSalary}
            ORDER BY salary_min DESC
            """)
    List<Job> findJobsBySalaryRange(@Param("minSalary") BigDecimal minSalary, @Param("maxSalary") BigDecimal maxSalary);

    @Select("SELECT * FROM job ORDER BY job_id DESC")
    List<Job> findAllJobs();
}
