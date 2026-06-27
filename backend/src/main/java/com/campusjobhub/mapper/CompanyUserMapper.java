package com.campusjobhub.mapper;

import com.campusjobhub.entity.CompanyUser;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface CompanyUserMapper {
    @Insert("INSERT INTO company_user(name, password, phone) VALUES(#{name}, #{password}, #{phone})")
    @Options(useGeneratedKeys = true, keyProperty = "companyUserId")
    int addCompanyUser(CompanyUser companyUser);

    @Update("UPDATE company_user SET name=#{name}, password=#{password}, phone=#{phone} WHERE company_user_id=#{companyUserId}")
    int updateCompanyUser(CompanyUser companyUser);

    @Delete("DELETE FROM company_user WHERE company_user_id=#{companyUserId}")
    int deleteCompanyUser(Long companyUserId);

    @Select("SELECT * FROM company_user WHERE name=#{name} AND password=#{password}")
    CompanyUser companyUserLogin(@Param("name") String name, @Param("password") String password);

    @Select("SELECT * FROM company_user WHERE company_user_id=#{companyUserId}")
    CompanyUser findCompanyUserById(Long companyUserId);

    @Select("SELECT * FROM company_user ORDER BY company_user_id DESC")
    List<CompanyUser> findAllCompanyUsers();
}
