package com.campusjobhub.mapper;

import com.campusjobhub.entity.Student;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface StudentMapper {
    @Insert("""
            INSERT INTO student(username, password, student_name, class_name, major, email, phone)
            VALUES(#{username}, #{password}, #{studentName}, #{className}, #{major}, #{email}, #{phone})
            """)
    @Options(useGeneratedKeys = true, keyProperty = "studentId")
    int addStudent(Student student);

    @Update("""
            UPDATE student
            SET username=#{username}, password=#{password}, student_name=#{studentName},
                class_name=#{className}, major=#{major}, email=#{email}, phone=#{phone}
            WHERE student_id=#{studentId}
            """)
    int updateStudent(Student student);

    @Delete("DELETE FROM student WHERE student_id=#{studentId}")
    int deleteStudent(Long studentId);

    @Select("SELECT * FROM student WHERE student_id=#{studentId}")
    Student findStudentById(Long studentId);

    @Select("SELECT * FROM student WHERE student_name LIKE CONCAT('%', #{studentName}, '%') ORDER BY student_id DESC")
    List<Student> findStudentsByName(String studentName);

    @Select("SELECT * FROM student ORDER BY student_id DESC")
    List<Student> findAllStudents();

    @Select("SELECT * FROM student WHERE username=#{username} AND password=#{password}")
    Student studentLogin(@Param("username") String username, @Param("password") String password);
}
