# CampusJobHub 高校企业岗位招聘网站设计说明

## 1. 作业基本信息

- 学号：24611602009
- 姓名：蒲自旭
- 题目：高校企业岗位招聘网站
- 技术栈：React Router + shadcn/ui + Spring Boot + MyBatis + MySQL

## 2. 系统目标

本系统用于完成数据库课程作业，重点体现数据库表设计、实体类、Mapper 接口、基础业务方法和前后端数据交互。

系统功能从简实现，主要包括：

- 企业信息管理
- 企业用户管理与简单登录
- 学生信息管理与简单登录
- 岗位信息管理
- 应聘信息管理
- 应聘信息多表查询视图展示

## 3. 数据库设计

数据库名称：`campus_job_hub`

数据表：

- `company`：企业信息表
- `company_user`：企业用户表
- `student`：学生信息表
- `job`：岗位信息表
- `application_info`：应聘信息表
- `application_view`：应聘信息视图

视图 `application_view` 以应聘信息表为主表，连接学生信息表、岗位信息表、企业信息表，用于一次性查看“学生-岗位-企业”的完整应聘信息。

完整 SQL 位于：

```text
docs/mysql/01_schema_and_seed.sql
```

## 4. 后端设计

后端目录：

```text
backend
```

后端采用 Spring Boot 3、Java 17、MyBatis 注解式 Mapper。为了便于作业检查，代码分为以下层：

- `entity`：实体类
- `mapper`：Mapper 接口
- `service`：业务类
- `controller`：REST API 控制器
- `config`：跨域配置

### 实体类对应关系

- `Company`：企业信息实体类
- `CompanyUser`：企业用户实体类
- `Student`：学生信息实体类
- `Job`：岗位信息实体类
- `ApplicationInfo`：应聘信息实体类
- `ApplicationView`：应聘视图实体类

### Mapper 接口方法对应关系

企业信息：

- `addCompany`
- `updateCompany`
- `deleteCompany`
- `findCompanyById`
- `findCompaniesByName`
- `findAllCompanies`

企业用户：

- `addCompanyUser`
- `updateCompanyUser`
- `deleteCompanyUser`
- `companyUserLogin`
- `findCompanyUserById`

学生信息：

- `addStudent`
- `updateStudent`
- `deleteStudent`
- `findStudentById`
- `findStudentsByName`
- `findAllStudents`
- `studentLogin`

岗位信息：

- `addJob`
- `updateJob`
- `deleteJob`
- `findJobById`
- `findJobsBySalaryRange`
- `findAllJobs`

应聘信息：

- `addApplication`
- `updateApplication`
- `deleteApplication`
- `findApplicationsByCompanyId`
- `findApplicationsByStudentId`
- `findAllApplications`

## 5. 前端设计

前端目录：

```text
frontend
```

前端采用 React Router + shadcn/ui，页面参考用户提供的浅色管理后台界面风格，设计为：

- 左侧导航栏：企业信息、学生信息、岗位信息、应聘信息、企业用户
- 顶部工具栏：系统标题、搜索入口、刷新按钮、用户头像
- 数据统计区：企业数量、学生数量、岗位数量、应聘记录
- 数据表格区：展示当前模块数据
- 右侧表单区：新增或编辑当前模块记录

前端会优先请求后端接口：

```text
http://localhost:8080/api
```

如果后端未启动，页面会展示内置示例数据，便于先查看 UI。

## 6. 运行步骤

### 6.1 启动 MySQL 容器

```powershell
docker start campusjobhub-mysql
```

如果容器还没创建，请参考：

```text
docs/mysql/README.md
```

### 6.2 初始化数据库

在项目根目录执行：

```powershell
cmd /c "docker exec -i campusjobhub-mysql mysql --default-character-set=utf8mb4 -uroot -proot123456 < docs\mysql\01_schema_and_seed.sql"
```

### 6.3 启动后端

```powershell
cd backend
mvn spring-boot:run
```

后端地址：

```text
http://localhost:8080
```

### 6.4 启动前端

```powershell
cd frontend
pnpm dev
```

前端地址：

```text
http://localhost:5173
```

## 7. 接口示例

查询所有企业：

```text
GET /api/companies
```

添加学生：

```text
POST /api/students
```

学生登录：

```text
POST /api/students/login
```

查询薪资区间岗位：

```text
GET /api/jobs/salary?min=3000&max=6000
```

查询所有应聘视图数据：

```text
GET /api/applications
```
