package com.campusjobhub.controller;

import com.campusjobhub.entity.ApplicationInfo;
import com.campusjobhub.entity.ApplicationView;
import com.campusjobhub.service.ApplicationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {
    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping
    public ApplicationInfo addApplication(@RequestBody ApplicationInfo applicationInfo) {
        return applicationService.addApplication(applicationInfo);
    }

    @PutMapping("/{applicationId}")
    public int updateApplication(@PathVariable Long applicationId, @RequestBody ApplicationInfo applicationInfo) {
        applicationInfo.applicationId = applicationId;
        return applicationService.updateApplication(applicationInfo);
    }

    @DeleteMapping("/{applicationId}")
    public int deleteApplication(@PathVariable Long applicationId) {
        return applicationService.deleteApplication(applicationId);
    }

    @GetMapping("/{applicationId}")
    public ApplicationInfo findApplicationById(@PathVariable Long applicationId) {
        return applicationService.findApplicationById(applicationId);
    }

    @GetMapping("/company/{companyId}")
    public List<ApplicationView> findApplicationsByCompanyId(@PathVariable Long companyId) {
        return applicationService.findApplicationsByCompanyId(companyId);
    }

    @GetMapping("/student/{studentId}")
    public List<ApplicationView> findApplicationsByStudentId(@PathVariable Long studentId) {
        return applicationService.findApplicationsByStudentId(studentId);
    }

    @GetMapping
    public List<ApplicationView> findAllApplications() {
        return applicationService.findAllApplications();
    }
}
