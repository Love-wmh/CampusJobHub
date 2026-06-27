package com.campusjobhub.controller;

import com.campusjobhub.entity.CompanyUser;
import com.campusjobhub.service.CompanyUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/company-users")
public class CompanyUserController {
    private static final Logger log = LoggerFactory.getLogger(CompanyUserController.class);
    private final CompanyUserService companyUserService;

    public CompanyUserController(CompanyUserService companyUserService) {
        this.companyUserService = companyUserService;
    }

    @PostMapping
    public CompanyUser addCompanyUser(@RequestBody CompanyUser companyUser) {
        log.info("新增企业用户：name={}, phone={}", companyUser.name, companyUser.phone);
        return companyUserService.addCompanyUser(companyUser);
    }

    @PutMapping("/{companyUserId}")
    public int updateCompanyUser(@PathVariable Long companyUserId, @RequestBody CompanyUser companyUser) {
        log.info("修改企业用户：companyUserId={}, name={}", companyUserId, companyUser.name);
        companyUser.companyUserId = companyUserId;
        return companyUserService.updateCompanyUser(companyUser);
    }

    @DeleteMapping("/{companyUserId}")
    public int deleteCompanyUser(@PathVariable Long companyUserId) {
        log.info("删除企业用户：companyUserId={}", companyUserId);
        return companyUserService.deleteCompanyUser(companyUserId);
    }

    @PostMapping("/login")
    public CompanyUser companyUserLogin(@RequestBody Map<String, String> body) {
        log.info("企业用户登录：name={}", body.get("name"));
        return companyUserService.companyUserLogin(body.get("name"), body.get("password"));
    }

    @GetMapping
    public List<CompanyUser> findAllCompanyUsers() {
        log.info("查询所有企业用户");
        return companyUserService.findAllCompanyUsers();
    }

    @GetMapping("/{companyUserId}")
    public CompanyUser findCompanyUserById(@PathVariable Long companyUserId) {
        log.info("根据ID查询企业用户：companyUserId={}", companyUserId);
        return companyUserService.findCompanyUserById(companyUserId);
    }
}
