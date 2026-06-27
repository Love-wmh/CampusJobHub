# CampusJobHub 高校企业岗位招聘网站

本项目是数据库课程作业，包含前端、后端和 MySQL 数据库脚本。

- 前端：React Router + TypeScript + shadcn/ui
- 后端：Java 17 + Spring Boot + MyBatis
- 数据库：MySQL 8.0，使用 Docker 容器运行

## 目录说明

```text
backend/              Java 后端项目
frontend/             React 前端项目
docs/                 项目文档
docs/design.md        系统设计说明
docs/mysql/           MySQL 建表、视图、示例数据和学习命令
docs/mysql-container.md  MySQL Docker 容器说明
```

## 1. 启动 MySQL

如果已经创建过容器，直接启动：

```powershell
docker start campusjobhub-mysql
```

如果还没有创建容器，执行：

```powershell
docker run -d --name campusjobhub-mysql -p 3308:3306 -e MYSQL_ROOT_PASSWORD=root123456 -e MYSQL_DATABASE=campus_job_hub -e MYSQL_USER=campusjobhub -e MYSQL_PASSWORD=campusjobhub123 -v campusjobhub_mysql_data:/var/lib/mysql --restart unless-stopped mysql:8.0 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```

查看容器状态：

```powershell
docker ps -a --filter "name=campusjobhub-mysql"
```

## 2. 初始化数据库

在项目根目录执行：

```powershell
cmd /c "docker exec -i campusjobhub-mysql mysql --default-character-set=utf8mb4 -uroot -proot123456 < docs\mysql\01_schema_and_seed.sql"
```

这个脚本会创建数据库、数据表、应聘信息视图，并插入示例数据。

数据库连接信息：

```text
主机：127.0.0.1
端口：3308
数据库：campus_job_hub
用户名：campusjobhub
密码：campusjobhub123
```

## 3. 启动后端

进入后端目录：

```powershell
cd backend
```

启动 Spring Boot：

```powershell
mvn spring-boot:run
```

后端默认地址：

```text
http://localhost:8080
```

常用验证命令：

```powershell
mvn test
```

## 4. 启动前端

另开一个终端，进入前端目录：

```powershell
cd frontend
```

安装依赖。如果已经安装过，可以跳过：

```powershell
pnpm install
```

启动前端：

```powershell
pnpm dev
```

前端默认地址：

```text
http://localhost:5173
```

常用验证命令：

```powershell
pnpm typecheck
pnpm build
```

## 5. 推荐启动顺序

```text
1. 启动 MySQL 容器
2. 初始化数据库脚本
3. 启动 backend 后端
4. 启动 frontend 前端
5. 浏览器访问 http://localhost:5173
```

## 6. 常用接口

查询所有企业：

```text
GET http://localhost:8080/api/companies
```

查询所有学生：

```text
GET http://localhost:8080/api/students
```

查询所有岗位：

```text
GET http://localhost:8080/api/jobs
```

查询所有应聘视图数据：

```text
GET http://localhost:8080/api/applications
```

学生登录：

```text
POST http://localhost:8080/api/students/login
```

## 7. 说明

前端会优先请求 `http://localhost:8080/api`。如果后端没有启动，页面会显示内置示例数据，方便先查看 UI；但要进行真实增删改查，需要先启动 MySQL 和后端。
