package com.campusjobhub.service;

import com.campusjobhub.entity.Student;
import com.campusjobhub.mapper.StudentMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    private final StudentMapper studentMapper;

    public StudentService(StudentMapper studentMapper) {
        this.studentMapper = studentMapper;
    }

    public Student addStudent(Student student) {
        studentMapper.addStudent(student);
        return student;
    }

    public int updateStudent(Student student) {
        return studentMapper.updateStudent(student);
    }

    public int deleteStudent(Long studentId) {
        return studentMapper.deleteStudent(studentId);
    }

    public Student findStudentById(Long studentId) {
        return studentMapper.findStudentById(studentId);
    }

    public List<Student> findStudentsByName(String studentName) {
        return studentMapper.findStudentsByName(studentName == null ? "" : studentName);
    }

    public List<Student> findAllStudents() {
        return studentMapper.findAllStudents();
    }

    public Student studentLogin(String username, String password) {
        return studentMapper.studentLogin(username, password);
    }
}
