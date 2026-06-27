package com.campusjobhub.service;

import com.campusjobhub.entity.Company;
import com.campusjobhub.mapper.CompanyMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {
    private final CompanyMapper companyMapper;

    public CompanyService(CompanyMapper companyMapper) {
        this.companyMapper = companyMapper;
    }

    public Company addCompany(Company company) {
        companyMapper.addCompany(company);
        return company;
    }

    public int updateCompany(Company company) {
        return companyMapper.updateCompany(company);
    }

    public int deleteCompany(Long companyId) {
        return companyMapper.deleteCompany(companyId);
    }

    public Company findCompanyById(Long companyId) {
        return companyMapper.findCompanyById(companyId);
    }

    public List<Company> findCompaniesByName(String companyName) {
        return companyMapper.findCompaniesByName(companyName == null ? "" : companyName);
    }

    public List<Company> findAllCompanies() {
        return companyMapper.findAllCompanies();
    }
}
