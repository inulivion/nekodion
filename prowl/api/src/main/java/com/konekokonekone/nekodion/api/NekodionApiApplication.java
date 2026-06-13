package com.konekokonekone.nekodion.api;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "com.konekokonekone.nekodion")
@EntityScan(basePackages = "com.konekokonekone.nekodion")
@EnableJpaRepositories(basePackages = "com.konekokonekone.nekodion")
public class NekodionApiApplication {

    public static void main(String[] args) {
        org.springframework.boot.SpringApplication.run(NekodionApiApplication.class, args);
    }
}
