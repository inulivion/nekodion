package com.konekokonekone.nekodion.batch;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Slf4j
@SpringBootApplication
@ComponentScan(basePackages = "com.konekokonekone.nekodion")
@EntityScan(basePackages = "com.konekokonekone.nekodion")
@EnableJpaRepositories(basePackages = "com.konekokonekone.nekodion")
public class NekodionBatchApplication {

    public static void main(String[] args) {

        ApplicationContext runtimeContext = null;

        try {
            runtimeContext = SpringApplication.run(NekodionBatchApplication.class, args);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            System.exit(1);
        }

        System.exit(SpringApplication.exit(runtimeContext));
    }
}
