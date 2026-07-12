package com.konekokonekone.nekodion.api.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.konekokonekone.nekodion.api.response.AccountDetailResponse;
import com.konekokonekone.nekodion.transaction.entity.Account;

@Mapper(componentModel = "spring")
public interface AccountDetailResponseMapper {

    @Mapping(target = "accountId", source = "account.id")
    @Mapping(target = "accountType", expression = "java(account.getAccountType().getCode())")
    @Mapping(target = "accountTemplateId", expression = "java(account.getAccountTemplate() != null ? account.getAccountTemplate().getId() : null)")
    @Mapping(target = "totalAmount", expression = "java(account.calculateBalance())")
    AccountDetailResponse toResponse(Account account);
}
