package com.konekokonekone.nekodion.transaction.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum DirectionType {

    IN("IN", "入金"),
    OUT("OUT", "出金");

    private final String code;

    private final String directionTypeName;

    public static DirectionType codeOf(String code) {
        return code == null
                ? null
                : switch (code) {
                    case "IN" -> IN;
                    case "OUT" -> OUT;
                    default -> null;
                };
    }
}
