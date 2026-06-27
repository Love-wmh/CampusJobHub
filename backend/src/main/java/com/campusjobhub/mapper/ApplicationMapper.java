package com.campusjobhub.mapper;

import com.campusjobhub.entity.ApplicationInfo;
import com.campusjobhub.entity.ApplicationView;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface ApplicationMapper {
    @Insert("INSERT INTO application_info(student_id, job_id, resume_url) VALUES(#{studentId}, #{jobId}, #{resumeUrl})")
    @Options(useGeneratedKeys = true, keyProperty = "applicationId")
    int addApplication(ApplicationInfo applicationInfo);

    @Update("UPDATE application_info SET student_id=#{studentId}, job_id=#{jobId}, resume_url=#{resumeUrl} WHERE application_id=#{applicationId}")
    int updateApplication(ApplicationInfo applicationInfo);

    @Delete("DELETE FROM application_info WHERE application_id=#{applicationId}")
    int deleteApplication(Long applicationId);

    @Select("""
            SELECT av.* FROM application_view av
            WHERE av.company_id=#{companyId}
            ORDER BY av.application_id DESC
            """)
    List<ApplicationView> findApplicationsByCompanyId(Long companyId);

    @Select("""
            SELECT av.* FROM application_view av
            WHERE av.student_id=#{studentId}
            ORDER BY av.application_id DESC
            """)
    List<ApplicationView> findApplicationsByStudentId(Long studentId);

    @Select("SELECT * FROM application_info WHERE application_id=#{applicationId}")
    ApplicationInfo findApplicationById(Long applicationId);

    @Select("SELECT * FROM application_view ORDER BY application_id DESC")
    List<ApplicationView> findAllApplications();
}
