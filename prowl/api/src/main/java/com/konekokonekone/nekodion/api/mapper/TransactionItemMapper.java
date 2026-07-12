package com.konekokonekone.nekodion.api.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.konekokonekone.nekodion.api.response.DailyTransactionResponse.TransactionItem;
import com.konekokonekone.nekodion.transaction.entity.Transaction;

@Mapper(componentModel = "spring")
public interface TransactionItemMapper {

    @Mapping(target = "transactionType", source = "transactionType.code")
    @Mapping(target = "direction", source = "direction.code")
    @Mapping(target = "transactionDescription", source = "description")
    @Mapping(target = "categoryName", source = "category.categoryName")
    @Mapping(target = "categoryTypeName", source = "category.categoryType.categoryTypeName")
    TransactionItem toItem(Transaction transaction);
}
