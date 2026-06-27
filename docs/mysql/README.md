# CampusJobHub MySQL 学习说明

本目录保存和数据库有关的命令、建表语句、视图语句和示例数据，主要给开发者学习和维护使用。

## 1. 创建并启动 MySQL 容器

如果还没有创建容器，先执行：

```powershell
docker run -d --name campusjobhub-mysql -p 3308:3306 -e MYSQL_ROOT_PASSWORD=root123456 -e MYSQL_DATABASE=campus_job_hub -e MYSQL_USER=campusjobhub -e MYSQL_PASSWORD=campusjobhub123 -v campusjobhub_mysql_data:/var/lib/mysql --restart unless-stopped mysql:8.0 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```

## 2. 进入 MySQL

```powershell
docker exec -it campusjobhub-mysql mysql -uroot -proot123456
```

## 3. 执行建表和示例数据脚本

在项目根目录执行：

```powershell
cmd /c "docker exec -i campusjobhub-mysql mysql --default-character-set=utf8mb4 -uroot -proot123456 < docs\mysql\01_schema_and_seed.sql"
```

脚本会完成以下工作：

- 创建数据库：`campus_job_hub`
- 创建企业信息表：`company`
- 创建企业用户表：`company_user`
- 创建学生信息表：`student`
- 创建岗位信息表：`job`
- 创建应聘信息表：`application_info`
- 创建应聘信息视图：`application_view`
- 插入少量示例数据，方便前端页面展示

## 4. 常用查询命令

查看所有企业：

```sql
SELECT * FROM company;
```

根据企业名称模糊查询：

```sql
SELECT * FROM company WHERE company_name LIKE '%科技%';
```

查看所有学生：

```sql
SELECT * FROM student;
```

学生登录查询示例：

```sql
SELECT * FROM student WHERE username = 'student001' AND password = '123456';
```

根据薪资区间查询岗位：

```sql
SELECT * FROM job WHERE salary_min >= 3000 AND salary_max <= 6000;
```

查看应聘信息视图：

```sql
SELECT * FROM application_view;
```

根据企业 ID 查询应聘信息：

```sql
SELECT * FROM application_view WHERE company_id = 1;
```

根据学生 ID 查询应聘信息：

```sql
SELECT * FROM application_view WHERE student_id = 1;
```

## 5. 后端数据库连接信息

```text
地址：127.0.0.1
端口：3308
数据库：campus_job_hub
用户名：campusjobhub
密码：campusjobhub123
```

JDBC 地址：

```text
jdbc:mysql://127.0.0.1:3308/campus_job_hub?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai&useSSL=false&allowPublicKeyRetrieval=true
```
