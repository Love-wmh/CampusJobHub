package com.campusjobhub.controller;

import com.campusjobhub.entity.Student;
import com.campusjobhub.service.StudentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/students")
public class StudentController {
    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return studentService.addStudent(student);
    }

    @PutMapping("/{studentId}")
    public int updateStudent(@PathVariable Long studentId, @RequestBody Student student) {
        student.studentId = studentId;
        return studentService.updateStudent(student);
    }

    @DeleteMapping("/{studentId}")
    public int deleteStudent(@PathVariable Long studentId) {
        return studentService.deleteStudent(studentId);
    }

    @GetMapping("/{studentId}")
    public Student findStudentById(@PathVariable Long studentId) {
        return studentService.findStudentById(studentId);
    }

    @GetMapping("/search")
    public List<Student> findStudentsByName(@RequestParam String name) {
        return studentService.findStudentsByName(name);
    }

    @GetMapping
    public List<Student> findAllStudents() {
        return studentService.findAllStudents();
    }

    @PostMapping("/login")
    public Student studentLogin(@RequestBody Map<String, String> body) {
        return studentService.studentLogin(body.get("username"), body.get("password"));
    }
}
