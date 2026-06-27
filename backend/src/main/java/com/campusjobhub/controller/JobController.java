package com.campusjobhub.controller;

import com.campusjobhub.entity.Job;
import com.campusjobhub.service.JobService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {
    private static final Logger log = LoggerFactory.getLogger(JobController.class);
    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @PostMapping
    public Job addJob(@RequestBody Job job) {
        log.info("新增岗位：companyId={}, jobName={}", job.companyId, job.jobName);
        return jobService.addJob(job);
    }

    @PutMapping("/{jobId}")
    public int updateJob(@PathVariable Long jobId, @RequestBody Job job) {
        log.info("修改岗位：jobId={}, jobName={}", jobId, job.jobName);
        job.jobId = jobId;
        return jobService.updateJob(job);
    }

    @DeleteMapping("/{jobId}")
    public int deleteJob(@PathVariable Long jobId) {
        log.info("删除岗位：jobId={}", jobId);
        return jobService.deleteJob(jobId);
    }

    @GetMapping("/{jobId}")
    public Job findJobById(@PathVariable Long jobId) {
        log.info("根据ID查询岗位：jobId={}", jobId);
        return jobService.findJobById(jobId);
    }

    @GetMapping("/salary")
    public List<Job> findJobsBySalaryRange(@RequestParam BigDecimal min, @RequestParam BigDecimal max) {
        log.info("根据薪资区间查询岗位：min={}, max={}", min, max);
        return jobService.findJobsBySalaryRange(min, max);
    }

    @GetMapping
    public List<Job> findAllJobs() {
        log.info("查询所有岗位");
        return jobService.findAllJobs();
    }
}
