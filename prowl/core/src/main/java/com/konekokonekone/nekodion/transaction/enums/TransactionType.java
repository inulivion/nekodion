package com.konekokonekone.nekodion.transaction.enums;

import java.util.Arrays;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum TransactionType {
    NORMAL("NORMAL", "通常取引", 1),
    TRANSFER("TRANSFER", "振替取引", 2),
    ADJUSTMENT("ADJUSTMENT", "調整取引", 3);

    private final String code;

    private final String transactionTypeName;

    private final Integer sortOrder;

    public static TransactionType codeOf(String code) {
        return code == null
                ? null
                : Arrays.stream(TransactionType.values())
                        .filter(e -> e.code.equals(code))
                        .findFirst()
                        .orElse(null);
    }
}
