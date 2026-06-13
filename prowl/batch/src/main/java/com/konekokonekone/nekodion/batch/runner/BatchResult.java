package com.konekokonekone.nekodion.batch.runner;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@ToString
@RequiredArgsConstructor
public class BatchResult {

    private final String batchName;

    @Setter
    private String message;

    private int totalCount;

    private int successCount;

    private int skipCount;

    private int failureCount;

    public void add(BatchResultStatus status) {
        this.totalCount++;
        switch (status) {
            case SUCCESS -> this.successCount++;
            case SKIP -> this.skipCount++;
            case FAILURE -> this.failureCount++;
        }
    }
}
