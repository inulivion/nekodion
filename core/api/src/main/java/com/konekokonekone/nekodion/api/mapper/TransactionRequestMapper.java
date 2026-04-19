package com.konekokonekone.nekodion.api.mapper;

import com.konekokonekone.nekodion.api.request.TransactionRequest;
import com.konekokonekone.nekodion.transaction.dto.TransactionRequestDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TransactionRequestMapper {

    TransactionRequestDto toDto(TransactionRequest request);
}
