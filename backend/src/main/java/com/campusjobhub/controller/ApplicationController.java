package com.campusjobhub.controller;

import com.campusjobhub.entity.ApplicationInfo;
import com.campusjobhub.entity.ApplicationView;
import com.campusjobhub.service.ApplicationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {
    private static final Logger log = LoggerFactory.getLogger(ApplicationController.class);
    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping
    public ApplicationInfo addApplication(@RequestBody ApplicationInfo applicationInfo) {
        log.info("新增应聘信息：studentId={}, jobId={}", applicationInfo.studentId, applicationInfo.jobId);
        return applicationService.addApplication(applicationInfo);
    }

    @PutMapping("/{applicationId}")
    public int updateApplication(@PathVariable Long applicationId, @RequestBody ApplicationInfo applicationInfo) {
        log.info("修改应聘信息：applicationId={}, studentId={}, jobId={}", applicationId, applicationInfo.studentId, applicationInfo.jobId);
        applicationInfo.applicationId = applicationId;
        return applicationService.updateApplication(applicationInfo);
    }

    @DeleteMapping("/{applicationId}")
    public int deleteApplication(@PathVariable Long applicationId) {
        log.info("删除应聘信息：applicationId={}", applicationId);
        return applicationService.deleteApplication(applicationId);
    }

    @GetMapping("/{applicationId}")
    public ApplicationInfo findApplicationById(@PathVariable Long applicationId) {
        log.info("根据ID查询应聘信息：applicationId={}", applicationId);
        return applicationService.findApplicationById(applicationId);
    }

    @GetMapping("/company/{companyId}")
    public List<ApplicationView> findApplicationsByCompanyId(@PathVariable Long companyId) {
        log.info("根据企业ID查询应聘视图：companyId={}", companyId);
        return applicationService.findApplicationsByCompanyId(companyId);
    }

    @GetMapping("/student/{studentId}")
    public List<ApplicationView> findApplicationsByStudentId(@PathVariable Long studentId) {
        log.info("根据学生ID查询应聘视图：studentId={}", studentId);
        return applicationService.findApplicationsByStudentId(studentId);
    }

    @GetMapping
    public List<ApplicationView> findAllApplications() {
        log.info("查询所有应聘视图");
        return applicationService.findAllApplications();
    }
}
