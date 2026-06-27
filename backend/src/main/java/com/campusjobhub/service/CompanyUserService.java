package com.campusjobhub.service;

import com.campusjobhub.entity.CompanyUser;
import com.campusjobhub.mapper.CompanyUserMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyUserService {
    private final CompanyUserMapper companyUserMapper;

    public CompanyUserService(CompanyUserMapper companyUserMapper) {
        this.companyUserMapper = companyUserMapper;
    }

    public CompanyUser addCompanyUser(CompanyUser companyUser) {
        companyUserMapper.addCompanyUser(companyUser);
        return companyUser;
    }

    public int updateCompanyUser(CompanyUser companyUser) {
        return companyUserMapper.updateCompanyUser(companyUser);
    }

    public int deleteCompanyUser(Long companyUserId) {
        return companyUserMapper.deleteCompanyUser(companyUserId);
    }

    public CompanyUser companyUserLogin(String name, String password) {
        return companyUserMapper.companyUserLogin(name, password);
    }

    public CompanyUser findCompanyUserById(Long companyUserId) {
        return companyUserMapper.findCompanyUserById(companyUserId);
    }

    public List<CompanyUser> findAllCompanyUsers() {
        return companyUserMapper.findAllCompanyUsers();
    }
}
