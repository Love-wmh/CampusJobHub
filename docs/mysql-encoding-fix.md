# MySQL 中文乱码问题解决记录

## 问题现象

前端页面可以正常连接后端，后端也能正常查询 MySQL，但是示例数据中的中文显示为乱码，例如企业名称、城市、专业等字段出现类似 `æ˜Ÿæ²³` 的内容。

## 问题原因

数据库表结构和后端代码没有问题，乱码原因出在初始化 SQL 脚本的导入方式。

之前使用过类似下面的 PowerShell 管道命令：

```powershell
Get-Content .\docs\mysql\01_schema_and_seed.sql | docker exec -i campusjobhub-mysql mysql -uroot -proot123456
```

`Get-Content` 会把文件内容先按 PowerShell 的文本流处理，再通过管道传给 MySQL。这个过程可能导致 UTF-8 中文内容被错误转码，最终写入数据库时就已经变成乱码。

## 正确解决命令

在项目根目录执行下面命令，使用 `cmd` 的原始重定向方式导入 SQL 文件，并明确指定 MySQL 客户端字符集为 `utf8mb4`：

```powershell
cmd /c "docker exec -i campusjobhub-mysql mysql --default-character-set=utf8mb4 -uroot -proot123456 < docs\mysql\01_schema_and_seed.sql"
```

这个命令会重新执行初始化脚本，重新创建表、视图并插入示例数据。

## 验证中文是否正常

执行：

```powershell
docker exec campusjobhub-mysql mysql --default-character-set=utf8mb4 -uroot -proot123456 -D campus_job_hub -e "SELECT company_name, company_category, company_nature, city FROM company ORDER BY company_id; SELECT student_name, class_name, major FROM student ORDER BY student_id;"
```

如果能看到正常中文，例如：

```text
星河科技有限公司  互联网    民营企业  成都
青云教育科技      教育科技  股份制企业  重庆
海纳智能制造      智能制造  国有控股  武汉
```

说明乱码已经解决。

## 后续建议

以后初始化或重置数据库时，优先使用下面这个命令：

```powershell
cmd /c "docker exec -i campusjobhub-mysql mysql --default-character-set=utf8mb4 -uroot -proot123456 < docs\mysql\01_schema_and_seed.sql"
```

不要再使用 `Get-Content ... | docker exec ... mysql` 这种方式导入包含中文的 SQL 文件。

## 补充说明

项目的 JDBC URL 已经包含中文相关配置：

```text
jdbc:mysql://127.0.0.1:3308/campus_job_hub?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai&useSSL=false&allowPublicKeyRetrieval=true
```

数据库和表也使用了 `utf8mb4` 字符集。因此这次乱码不是后端查询或数据库字符集配置导致的，而是 SQL 文件导入时的编码处理问题。
