package com.campusjobhub.controller;

import com.campusjobhub.entity.Job;
import com.campusjobhub.service.JobService;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {
    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @PostMapping
    public Job addJob(@RequestBody Job job) {
        return jobService.addJob(job);
    }

    @PutMapping("/{jobId}")
    public int updateJob(@PathVariable Long jobId, @RequestBody Job job) {
        job.jobId = jobId;
        return jobService.updateJob(job);
    }

    @DeleteMapping("/{jobId}")
    public int deleteJob(@PathVariable Long jobId) {
        return jobService.deleteJob(jobId);
    }

    @GetMapping("/{jobId}")
    public Job findJobById(@PathVariable Long jobId) {
        return jobService.findJobById(jobId);
    }

    @GetMapping("/salary")
    public List<Job> findJobsBySalaryRange(@RequestParam BigDecimal min, @RequestParam BigDecimal max) {
        return jobService.findJobsBySalaryRange(min, max);
    }

    @GetMapping
    public List<Job> findAllJobs() {
        return jobService.findAllJobs();
    }
}
