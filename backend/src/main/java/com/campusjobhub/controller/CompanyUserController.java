package com.campusjobhub.controller;

import com.campusjobhub.entity.CompanyUser;
import com.campusjobhub.service.CompanyUserService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/company-users")
public class CompanyUserController {
    private final CompanyUserService companyUserService;

    public CompanyUserController(CompanyUserService companyUserService) {
        this.companyUserService = companyUserService;
    }

    @PostMapping
    public CompanyUser addCompanyUser(@RequestBody CompanyUser companyUser) {
        return companyUserService.addCompanyUser(companyUser);
    }

    @PutMapping("/{companyUserId}")
    public int updateCompanyUser(@PathVariable Long companyUserId, @RequestBody CompanyUser companyUser) {
        companyUser.companyUserId = companyUserId;
        return companyUserService.updateCompanyUser(companyUser);
    }

    @DeleteMapping("/{companyUserId}")
    public int deleteCompanyUser(@PathVariable Long companyUserId) {
        return companyUserService.deleteCompanyUser(companyUserId);
    }

    @PostMapping("/login")
    public CompanyUser companyUserLogin(@RequestBody Map<String, String> body) {
        return companyUserService.companyUserLogin(body.get("name"), body.get("password"));
    }

    @GetMapping("/{companyUserId}")
    public CompanyUser findCompanyUserById(@PathVariable Long companyUserId) {
        return companyUserService.findCompanyUserById(companyUserId);
    }
}
