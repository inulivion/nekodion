package com.konekokonekone.nekodion.batch.job;

import com.konekokonekone.nekodion.batch.runner.BatchResult;

/**
 * バッチ処理を実行するためのインターフェース
 */
public interface BatchJob {
    BatchResult execute();
}
