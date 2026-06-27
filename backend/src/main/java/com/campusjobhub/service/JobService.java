package com.campusjobhub.service;

import com.campusjobhub.entity.Job;
import com.campusjobhub.mapper.JobMapper;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class JobService {
    private final JobMapper jobMapper;

    public JobService(JobMapper jobMapper) {
        this.jobMapper = jobMapper;
    }

    public Job addJob(Job job) {
        jobMapper.addJob(job);
        return job;
    }

    public int updateJob(Job job) {
        return jobMapper.updateJob(job);
    }

    public int deleteJob(Long jobId) {
        return jobMapper.deleteJob(jobId);
    }

    public Job findJobById(Long jobId) {
        return jobMapper.findJobById(jobId);
    }

    public List<Job> findJobsBySalaryRange(BigDecimal minSalary, BigDecimal maxSalary) {
        return jobMapper.findJobsBySalaryRange(minSalary, maxSalary);
    }

    public List<Job> findAllJobs() {
        return jobMapper.findAllJobs();
    }
}
