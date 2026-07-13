package com.konekokonekone.nekodion.api.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.konekokonekone.nekodion.api.response.AccountSummaryResponse.AccountItem;
import com.konekokonekone.nekodion.transaction.entity.Account;

@Mapper(componentModel = "spring")
public interface AccountSummaryResponseMapper {

    @Mapping(target = "accountId", source = "account.id")
    @Mapping(target = "totalAmount", expression = "java(account.calculateBalance())")
    AccountItem toResponse(Account account);
}
