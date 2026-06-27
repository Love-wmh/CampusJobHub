package com.campusjobhub.service;

import com.campusjobhub.entity.ApplicationInfo;
import com.campusjobhub.entity.ApplicationView;
import com.campusjobhub.mapper.ApplicationMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {
    private final ApplicationMapper applicationMapper;

    public ApplicationService(ApplicationMapper applicationMapper) {
        this.applicationMapper = applicationMapper;
    }

    public ApplicationInfo addApplication(ApplicationInfo applicationInfo) {
        applicationMapper.addApplication(applicationInfo);
        return applicationInfo;
    }

    public int updateApplication(ApplicationInfo applicationInfo) {
        return applicationMapper.updateApplication(applicationInfo);
    }

    public int deleteApplication(Long applicationId) {
        return applicationMapper.deleteApplication(applicationId);
    }

    public List<ApplicationView> findApplicationsByCompanyId(Long companyId) {
        return applicationMapper.findApplicationsByCompanyId(companyId);
    }

    public List<ApplicationView> findApplicationsByStudentId(Long studentId) {
        return applicationMapper.findApplicationsByStudentId(studentId);
    }

    public ApplicationInfo findApplicationById(Long applicationId) {
        return applicationMapper.findApplicationById(applicationId);
    }

    public List<ApplicationView> findAllApplications() {
        return applicationMapper.findAllApplications();
    }
}
