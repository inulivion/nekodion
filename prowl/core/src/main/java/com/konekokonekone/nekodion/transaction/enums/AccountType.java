package com.konekokonekone.nekodion.transaction.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

@Getter
@AllArgsConstructor
public enum AccountType {
    BANK("BANK", "銀行口座", 1),
    CREDIT("CREDIT", "クレカ口座", 2),
    MANUAL("MANUAL", "手動管理口座", 3),
    UNCATEGORIZED("UNCATEGORIZED", "未分類口座", 4);

    private final String code;

    private final String accountTypeName;

    private final Integer sortOrder;

    public static AccountType codeOf(String code) {
        return code == null
                ? null
                : Arrays.stream(AccountType.values())
                .filter(e -> e.code.equals(code))
                .findFirst()
                .orElse(null);
    }
}
