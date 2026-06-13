package com.konekokonekone.nekodion.batch.runner;

import com.konekokonekone.nekodion.batch.job.BatchJob;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class BatchRunner implements ApplicationRunner {

    private final BatchJob batchJob;

    @Override
    public void run(ApplicationArguments args) {
        List<String> values = args.getOptionValues("batch.execute");
        String batchName = (values != null && !values.isEmpty()) ? values.getFirst() : null;

        log.info("実行するバッチ: {}", batchName);

        BatchResult result = batchJob.execute();

        if (result.getFailureCount() > 0) {
            log.error("バッチ処理に失敗が発生しました。{}", result);
        } else {
            log.info("バッチ処理が正常に完了しました。{}", result);
        }
    }
}
