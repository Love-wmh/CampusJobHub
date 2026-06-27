package com.campusjobhub.controller;

import com.campusjobhub.entity.Company;
import com.campusjobhub.service.CompanyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {
    private static final Logger log = LoggerFactory.getLogger(CompanyController.class);
    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @PostMapping
    public Company addCompany(@RequestBody Company company) {
        log.info("新增企业：{}", company.companyName);
        return companyService.addCompany(company);
    }

    @PutMapping("/{companyId}")
    public int updateCompany(@PathVariable Long companyId, @RequestBody Company company) {
        log.info("修改企业：companyId={}, companyName={}", companyId, company.companyName);
        company.companyId = companyId;
        return companyService.updateCompany(company);
    }

    @DeleteMapping("/{companyId}")
    public int deleteCompany(@PathVariable Long companyId) {
        log.info("删除企业：companyId={}", companyId);
        return companyService.deleteCompany(companyId);
    }

    @GetMapping("/{companyId}")
    public Company findCompanyById(@PathVariable Long companyId) {
        log.info("根据ID查询企业：companyId={}", companyId);
        return companyService.findCompanyById(companyId);
    }

    @GetMapping("/search")
    public List<Company> findCompaniesByName(@RequestParam String name) {
        log.info("根据名称查询企业：name={}", name);
        return companyService.findCompaniesByName(name);
    }

    @GetMapping
    public List<Company> findAllCompanies() {
        log.info("查询所有企业");
        return companyService.findAllCompanies();
    }
}
