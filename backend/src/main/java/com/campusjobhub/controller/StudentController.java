package com.campusjobhub.controller;

import com.campusjobhub.entity.Student;
import com.campusjobhub.service.StudentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/students")
public class StudentController {
    private static final Logger log = LoggerFactory.getLogger(StudentController.class);
    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        log.info("新增学生：username={}, studentName={}", student.username, student.studentName);
        return studentService.addStudent(student);
    }

    @PutMapping("/{studentId}")
    public int updateStudent(@PathVariable Long studentId, @RequestBody Student student) {
        log.info("修改学生：studentId={}, studentName={}", studentId, student.studentName);
        student.studentId = studentId;
        return studentService.updateStudent(student);
    }

    @DeleteMapping("/{studentId}")
    public int deleteStudent(@PathVariable Long studentId) {
        log.info("删除学生：studentId={}", studentId);
        return studentService.deleteStudent(studentId);
    }

    @GetMapping("/{studentId}")
    public Student findStudentById(@PathVariable Long studentId) {
        log.info("根据ID查询学生：studentId={}", studentId);
        return studentService.findStudentById(studentId);
    }

    @GetMapping("/search")
    public List<Student> findStudentsByName(@RequestParam String name) {
        log.info("根据姓名查询学生：name={}", name);
        return studentService.findStudentsByName(name);
    }

    @GetMapping
    public List<Student> findAllStudents() {
        log.info("查询所有学生");
        return studentService.findAllStudents();
    }

    @PostMapping("/login")
    public Student studentLogin(@RequestBody Map<String, String> body) {
        log.info("学生登录：username={}", body.get("username"));
        return studentService.studentLogin(body.get("username"), body.get("password"));
    }
}
