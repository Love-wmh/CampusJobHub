package com.campusjobhub;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan("com.campusjobhub.mapper")
@SpringBootApplication
public class CampusJobHubApplication {
    public static void main(String[] args) {
        SpringApplication.run(CampusJobHubApplication.class, args);
    }
}

