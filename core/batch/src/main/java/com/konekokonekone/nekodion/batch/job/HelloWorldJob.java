package com.konekokonekone.nekodion.batch.job;

import com.konekokonekone.nekodion.batch.runner.BatchResult;
import com.konekokonekone.nekodion.batch.runner.BatchResultStatus;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(name = "batch.execute", havingValue = "HelloWorld")
public class HelloWorldJob implements BatchJob {

    BatchResult result = new BatchResult("Hello Worldバッチ");

    @Override
    public BatchResult execute() {
        result.add(BatchResultStatus.SUCCESS);
        result.setMessage("子猫こねこね");
        return result;
    }
}
