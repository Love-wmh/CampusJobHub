# CampusJobHub MySQL Docker 容器说明

当前项目使用一个独立的 MySQL 容器作为本地开发数据库。

## 容器信息

- 容器名称：`campusjobhub-mysql`
- Docker 镜像：`mysql:8.0`
- 数据库名称：`campus_job_hub`
- MySQL root 密码：`root123456`
- 应用数据库用户：`campusjobhub`
- 应用数据库用户密码：`campusjobhub123`
- 主机地址：`127.0.0.1`
- 主机端口：`3308`
- 容器内端口：`3306`
- 数据卷：`campusjobhub_mysql_data`

主机端口使用 `3308`，是为了避开本机已有 MySQL 容器占用的 `3306` 和 `3307` 端口。

## 创建并启动容器

在任意终端中执行以下命令：

```powershell
docker run -d `
  --name campusjobhub-mysql `
  -p 3308:3306 `
  -e MYSQL_ROOT_PASSWORD=root123456 `
  -e MYSQL_DATABASE=campus_job_hub `
  -e MYSQL_USER=campusjobhub `
  -e MYSQL_PASSWORD=campusjobhub123 `
  -v campusjobhub_mysql_data:/var/lib/mysql `
  --restart unless-stopped `
  mysql:8.0 `
  --character-set-server=utf8mb4 `
  --collation-server=utf8mb4_unicode_ci
```

单行版本：

```powershell
docker run -d --name campusjobhub-mysql -p 3308:3306 -e MYSQL_ROOT_PASSWORD=root123456 -e MYSQL_DATABASE=campus_job_hub -e MYSQL_USER=campusjobhub -e MYSQL_PASSWORD=campusjobhub123 -v campusjobhub_mysql_data:/var/lib/mysql --restart unless-stopped mysql:8.0 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```

## 查看容器

```powershell
docker ps -a --filter "name=campusjobhub-mysql"
```

查看容器日志：

```powershell
docker logs campusjobhub-mysql
```

## 连接 MySQL

进入容器并使用 root 用户连接：

```powershell
docker exec -it campusjobhub-mysql mysql -uroot -proot123456
```

使用应用数据库用户连接：

```powershell
docker exec -it campusjobhub-mysql mysql -ucampusjobhub -pcampusjobhub123 campus_job_hub
```

外部数据库客户端连接信息：

```text
主机：127.0.0.1
端口：3308
数据库：campus_job_hub
用户名：campusjobhub
密码：campusjobhub123
```

JDBC 连接地址：

```text
jdbc:mysql://127.0.0.1:3308/campus_job_hub?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai&useSSL=false&allowPublicKeyRetrieval=true
```

## 常用命令

启动容器：

```powershell
docker start campusjobhub-mysql
```

停止容器：

```powershell
docker stop campusjobhub-mysql
```

重启容器：

```powershell
docker restart campusjobhub-mysql
```

仅删除容器，保留数据卷：

```powershell
docker rm -f campusjobhub-mysql
```

删除容器和数据卷：

```powershell
docker rm -f campusjobhub-mysql
docker volume rm campusjobhub_mysql_data
```
