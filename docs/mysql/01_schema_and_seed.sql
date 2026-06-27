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
('海纳智能制造', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab', '智能制造', '国有控股', '提供自动化生产线和工业软件解决方案。', '武汉', '东湖高新区光谷大道88号'),
('启明云计算有限公司', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa', '云计算', '民营企业', '为中小企业提供云原生平台和运维服务。', '杭州', '滨江区物联网街88号'),
('南山数科集团', 'https://images.unsplash.com/photo-1497366216548-37526070297c', '大数据', '国有企业', '围绕政企数据治理、数据资产和智能分析提供服务。', '深圳', '南山区科技园科苑路16号'),
('北辰人力资源服务有限公司', 'https://images.unsplash.com/photo-1521737711867-e3b97375f902', '人力资源', '民营企业', '专注校园招聘、人才测评和实习生外包服务。', '西安', '雁塔区高新一路20号'),
('远航金融科技', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f', '金融科技', '股份制企业', '为银行和保险机构提供风控系统与移动端产品。', '上海', '浦东新区张江高科园区'),
('蓝图文化传媒', 'https://images.unsplash.com/photo-1497366412874-3415097a27e7', '文化传媒', '民营企业', '提供品牌视觉、短视频运营和新媒体营销服务。', '长沙', '岳麓区麓谷企业广场'),
('锦程医疗科技', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d', '医疗科技', '民营企业', '研发医院信息系统和智能随访平台。', '南京', '江宁区秣周东路12号');

INSERT INTO company_user(name, password, phone) VALUES
('企业管理员', '123456', '13800000001'),
('招聘老师', '123456', '13800000002'),
('星河HR', '123456', '13800000003'),
('青云招聘专员', '123456', '13800000004'),
('海纳人事主管', '123456', '13800000005'),
('校园合作经理', '123456', '13800000006');

INSERT INTO student(username, password, student_name, class_name, major, email, phone) VALUES
('student001', '123456', '李明', '软件2461', '软件工程', 'liming@example.com', '13900000001'),
('student002', '123456', '王晓雨', '计科2462', '计算机科学与技术', 'wangxy@example.com', '13900000002'),
('student003', '123456', '陈晨', '数媒2463', '数字媒体技术', 'chenchen@example.com', '13900000003'),
('student004', '123456', '赵一航', '软件2461', '软件工程', 'zhaoyh@example.com', '13900000004'),
('student005', '123456', '刘佳宁', '计科2462', '计算机科学与技术', 'liujn@example.com', '13900000005'),
('student006', '123456', '周雨桐', '信管2464', '信息管理与信息系统', 'zhouyt@example.com', '13900000006'),
('student007', '123456', '何思源', '电商2465', '电子商务', 'hesy@example.com', '13900000007'),
('student008', '123456', '孙浩然', '软件2461', '软件工程', 'sunhr@example.com', '13900000008'),
('student009', '123456', '马欣怡', '数媒2463', '数字媒体技术', 'maxy@example.com', '13900000009'),
('student010', '123456', '吴泽宇', '计科2462', '计算机科学与技术', 'wuzy@example.com', '13900000010'),
('student011', '123456', '郑可欣', '信管2464', '信息管理与信息系统', 'zhengkx@example.com', '13900000011'),
('student012', '123456', '唐俊杰', '电商2465', '电子商务', 'tangjj@example.com', '13900000012');

INSERT INTO job(company_id, job_name, job_description, ability_description, recruit_count, salary_min, salary_max) VALUES
(1, 'Java 后端实习生', '参与高校招聘平台后端接口开发。', '熟悉 Java、Spring Boot、MySQL，有良好编码习惯。', 5, 3000, 6000),
(1, '前端开发实习生', '负责管理后台页面与接口联调。', '熟悉 React、TypeScript、基础 UI 组件使用。', 3, 2800, 5500),
(2, '产品助理', '协助整理用户需求、编写产品原型。', '沟通能力强，熟悉办公软件，有校园项目经验优先。', 2, 2500, 4500),
(3, '数据分析实习生', '整理生产数据并完成基础报表。', '了解 SQL，具备基础统计分析能力。', 4, 3000, 5200),
(4, '云平台运维实习生', '参与云服务器巡检、监控告警和部署脚本维护。', '了解 Linux、Docker、Shell，有责任心。', 4, 3500, 6500),
(4, '测试开发实习生', '编写接口自动化测试用例，维护测试报告。', '熟悉 Python 或 Java，了解接口测试流程。', 3, 3000, 5800),
(5, '数据治理助理', '协助完成数据清洗、质量核验和数据目录维护。', '熟悉 SQL，做事细致，具备文档能力。', 5, 3200, 6200),
(5, 'BI 报表实习生', '使用可视化工具制作经营分析报表。', '了解数据分析方法，熟悉 Excel 或 BI 工具。', 2, 3000, 5600),
(6, '校园招聘顾问助理', '跟进企业招聘需求，维护学生候选人信息。', '表达清晰，沟通主动，熟悉校园活动组织。', 6, 2500, 4800),
(7, '风控模型实习生', '参与金融风控数据整理和模型效果评估。', '了解统计学、机器学习基础，熟悉 SQL。', 3, 4500, 8000),
(7, '移动端产品实习生', '协助金融 App 需求调研、竞品分析和版本验收。', '逻辑清晰，具备产品文档和原型能力。', 2, 3500, 6500),
(8, '新媒体运营实习生', '负责账号内容选题、图文排版和数据复盘。', '熟悉短视频平台，有基础文案和审美能力。', 5, 2500, 5000),
(8, '视觉设计助理', '协助完成海报、活动主视觉和品牌物料设计。', '熟悉 Photoshop、Figma 或相关设计工具。', 2, 3000, 5500),
(9, '医疗系统实施实习生', '协助医院信息系统上线配置、培训和问题跟踪。', '沟通能力强，能接受短期出差。', 4, 3200, 6000),
(9, 'Web 全栈实习生', '参与医疗随访平台前后端功能开发。', '熟悉 JavaScript、Java、MySQL 基础。', 3, 4000, 7500);

INSERT INTO application_info(student_id, job_id, resume_url) VALUES
(1, 1, 'https://example.com/resumes/liming.pdf'),
(2, 2, 'https://example.com/resumes/wangxy.pdf'),
(3, 4, 'https://example.com/resumes/chenchen.pdf'),
(4, 1, 'https://example.com/resumes/zhaoyh.pdf'),
(5, 6, 'https://example.com/resumes/liujn.pdf'),
(6, 7, 'https://example.com/resumes/zhouyt.pdf'),
(7, 9, 'https://example.com/resumes/hesy.pdf'),
(8, 12, 'https://example.com/resumes/sunhr.pdf'),
(9, 11, 'https://example.com/resumes/maxy.pdf'),
(10, 10, 'https://example.com/resumes/wuzy.pdf'),
(11, 8, 'https://example.com/resumes/zhengkx.pdf'),
(12, 13, 'https://example.com/resumes/tangjj.pdf'),
(1, 5, 'https://example.com/resumes/liming-cloud.pdf'),
(2, 6, 'https://example.com/resumes/wangxy-test.pdf'),
(4, 14, 'https://example.com/resumes/zhaoyh-fullstack.pdf'),
(6, 3, 'https://example.com/resumes/zhouyt-product.pdf'),
(9, 2, 'https://example.com/resumes/maxy-frontend.pdf');
