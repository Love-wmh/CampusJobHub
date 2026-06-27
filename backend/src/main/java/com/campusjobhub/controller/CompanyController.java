package com.campusjobhub.controller;

import com.campusjobhub.entity.Company;
import com.campusjobhub.service.CompanyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {
    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @PostMapping
    public Company addCompany(@RequestBody Company company) {
        return companyService.addCompany(company);
    }

    @PutMapping("/{companyId}")
    public int updateCompany(@PathVariable Long companyId, @RequestBody Company company) {
        company.companyId = companyId;
        return companyService.updateCompany(company);
    }

    @DeleteMapping("/{companyId}")
    public int deleteCompany(@PathVariable Long companyId) {
        return companyService.deleteCompany(companyId);
    }

    @GetMapping("/{companyId}")
    public Company findCompanyById(@PathVariable Long companyId) {
        return companyService.findCompanyById(companyId);
    }

    @GetMapping("/search")
    public List<Company> findCompaniesByName(@RequestParam String name) {
        return companyService.findCompaniesByName(name);
    }

    @GetMapping
    public List<Company> findAllCompanies() {
        return companyService.findAllCompanies();
    }
}
