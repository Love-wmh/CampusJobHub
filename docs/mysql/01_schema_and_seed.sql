CREATE DATABASE IF NOT EXISTS campus_job_hub
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE campus_job_hub;

DROP VIEW IF EXISTS application_view;
DROP TABLE IF EXISTS application_info;
DROP TABLE IF EXISTS job;
DROP TABLE IF EXISTS student;
DROP TABLE IF EXISTS company_user;
DROP TABLE IF EXISTS company;

CREATE TABLE company (
  company_id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '企业ID',
  company_name VARCHAR(100) NOT NULL COMMENT '企业名称',
  company_image VARCHAR(255) COMMENT '企业图片',
  company_category VARCHAR(50) COMMENT '企业类别',
  company_nature VARCHAR(50) COMMENT '企业性质',
  company_intro TEXT COMMENT '企业简介',
  city VARCHAR(50) COMMENT '所在城市',
  address VARCHAR(255) COMMENT '详细地址'
) COMMENT='企业信息表';

CREATE TABLE company_user (
  company_user_id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '企业用户ID',
  name VARCHAR(50) NOT NULL COMMENT '姓名',
  password VARCHAR(100) NOT NULL COMMENT '密码',
  phone VARCHAR(30) COMMENT '联系电话'
) COMMENT='企业用户表';

CREATE TABLE student (
  student_id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '学生ID',
  username VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
  password VARCHAR(100) NOT NULL COMMENT '密码',
  student_name VARCHAR(50) NOT NULL COMMENT '学生姓名',
  class_name VARCHAR(80) COMMENT '班级',
  major VARCHAR(80) COMMENT '专业',
  email VARCHAR(100) COMMENT '邮箱',
  phone VARCHAR(30) COMMENT '联系电话'
) COMMENT='学生信息表';

CREATE TABLE job (
  job_id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '岗位ID',
  company_id BIGINT NOT NULL COMMENT '企业ID',
  job_name VARCHAR(100) NOT NULL COMMENT '岗位名称',
  job_description TEXT COMMENT '岗位描述',
  ability_description TEXT COMMENT '招聘人能力描述',
  recruit_count INT DEFAULT 1 COMMENT '招聘人数',
  salary_min DECIMAL(10,2) COMMENT '薪资起限',
  salary_max DECIMAL(10,2) COMMENT '薪资上限',
  CONSTRAINT fk_job_company
    FOREIGN KEY (company_id) REFERENCES company(company_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) COMMENT='岗位信息表';

CREATE TABLE application_info (
  application_id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '应聘ID',
  student_id BIGINT NOT NULL COMMENT '学生ID',
  job_id BIGINT NOT NULL COMMENT '岗位ID',
  resume_url VARCHAR(255) COMMENT '简历文件上传链接地址',
  CONSTRAINT fk_application_student
    FOREIGN KEY (student_id) REFERENCES student(student_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_application_job
    FOREIGN KEY (job_id) REFERENCES job(job_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) COMMENT='应聘信息表';

CREATE VIEW application_view AS
SELECT
  ai.application_id,
  s.student_id,
  s.student_name,
  s.class_name,
  s.major,
  s.email,
  s.phone AS student_phone,
  j.job_id,
  j.job_name,
  j.salary_min,
  j.salary_max,
  c.company_id,
  c.company_name,
  c.city,
  ai.resume_url
FROM application_info ai
JOIN student s ON ai.student_id = s.student_id
JOIN job j ON ai.job_id = j.job_id
JOIN company c ON j.company_id = c.company_id;

INSERT INTO company(company_name, company_image, company_category, company_nature, company_intro, city, address) VALUES
('星河科技有限公司', 'https://images.unsplash.com/photo-1497366754035-f200968a6e72', '互联网', '民营企业', '专注校园招聘和企业数字化服务。', '成都', '高新区天府软件园A区'),
('青云教育科技', 'https://images.unsplash.com/photo-1497366811353-6870744d04b2', '教育科技', '股份制企业', '为高校提供智慧教学和实习就业平台。', '重庆', '渝北区创新经济走廊'),
('海纳智能制造', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab', '智能制造', '国有控股', '提供自动化生产线和工业软件解决方案。', '武汉', '东湖高新区光谷大道88号');

INSERT INTO company_user(name, password, phone) VALUES
('企业管理员', '123456', '13800000001'),
('招聘老师', '123456', '13800000002');

INSERT INTO student(username, password, student_name, class_name, major, email, phone) VALUES
('student001', '123456', '李明', '软件2461', '软件工程', 'liming@example.com', '13900000001'),
('student002', '123456', '王晓雨', '计科2462', '计算机科学与技术', 'wangxy@example.com', '13900000002'),
('student003', '123456', '陈晨', '数媒2463', '数字媒体技术', 'chenchen@example.com', '13900000003');

INSERT INTO job(company_id, job_name, job_description, ability_description, recruit_count, salary_min, salary_max) VALUES
(1, 'Java 后端实习生', '参与高校招聘平台后端接口开发。', '熟悉 Java、Spring Boot、MySQL，有良好编码习惯。', 5, 3000, 6000),
(1, '前端开发实习生', '负责管理后台页面与接口联调。', '熟悉 React、TypeScript、基础 UI 组件使用。', 3, 2800, 5500),
(2, '产品助理', '协助整理用户需求、编写产品原型。', '沟通能力强，熟悉办公软件，有校园项目经验优先。', 2, 2500, 4500),
(3, '数据分析实习生', '整理生产数据并完成基础报表。', '了解 SQL，具备基础统计分析能力。', 4, 3000, 5200);

INSERT INTO application_info(student_id, job_id, resume_url) VALUES
(1, 1, 'https://example.com/resumes/liming.pdf'),
(2, 2, 'https://example.com/resumes/wangxy.pdf'),
(3, 4, 'https://example.com/resumes/chenchen.pdf');
