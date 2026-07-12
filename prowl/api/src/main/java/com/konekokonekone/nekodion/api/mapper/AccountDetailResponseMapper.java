package com.konekokonekone.nekodion.api.mapper;

import java.math.BigDecimal;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.konekokonekone.nekodion.api.response.AccountDetailResponse;
import com.konekokonekone.nekodion.transaction.entity.Account;

@Mapper(componentModel = "spring")
public interface AccountDetailResponseMapper {

    @Mapping(target = "accountId", source = "account.id")
    @Mapping(target = "accountType", expression = "java(account.getAccountType().getCode())")
    @Mapping(target = "accountTemplateId", expression = "java(account.getAccountTemplate() != null ? account.getAccountTemplate().getId() : null)")
    @Mapping(target = "totalAmount", expression = "java(getTotalAmount(account))")
    AccountDetailResponse toResponse(Account account);

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
