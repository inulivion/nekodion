package com.konekokonekone.nekodion.api.mapper;

import java.math.BigDecimal;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.konekokonekone.nekodion.api.response.AccountSummaryResponse.AccountItem;
import com.konekokonekone.nekodion.transaction.entity.Account;

@Mapper(componentModel = "spring")
public interface AccountSummaryResponseMapper {

    @Mapping(target = "accountId", source = "account.id")
    @Mapping(target = "totalAmount", expression = "java(getTotalAmount(account))")
    AccountItem toResponse(Account account);

    default BigDecimal getTotalAmount(Account account) {
        var base = account.getInitialAmount() != null ? account.getInitialAmount() : BigDecimal.ZERO;
        return account.getTransactions().stream()
                .map(t -> switch (t.getDirection()) {
                    case IN -> t.getAmount();
                    case OUT -> t.getAmount().negate();
                    default -> BigDecimal.ZERO;
                })
                .reduce(base, BigDecimal::add);
    }
}
