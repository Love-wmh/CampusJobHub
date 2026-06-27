package com.campusjobhub.mapper;

import com.campusjobhub.entity.Company;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface CompanyMapper {
    @Insert("""
            INSERT INTO company(company_name, company_image, company_category, company_nature, company_intro, city, address)
            VALUES(#{companyName}, #{companyImage}, #{companyCategory}, #{companyNature}, #{companyIntro}, #{city}, #{address})
            """)
    @Options(useGeneratedKeys = true, keyProperty = "companyId")
    int addCompany(Company company);

    @Update("""
            UPDATE company
            SET company_name=#{companyName}, company_image=#{companyImage}, company_category=#{companyCategory},
                company_nature=#{companyNature}, company_intro=#{companyIntro}, city=#{city}, address=#{address}
            WHERE company_id=#{companyId}
            """)
    int updateCompany(Company company);

    @Delete("DELETE FROM company WHERE company_id=#{companyId}")
    int deleteCompany(Long companyId);

    @Select("SELECT * FROM company WHERE company_id=#{companyId}")
    Company findCompanyById(Long companyId);

    @Select("SELECT * FROM company WHERE company_name LIKE CONCAT('%', #{companyName}, '%') ORDER BY company_id DESC")
    List<Company> findCompaniesByName(String companyName);

    @Select("SELECT * FROM company ORDER BY company_id DESC")
    List<Company> findAllCompanies();
}
