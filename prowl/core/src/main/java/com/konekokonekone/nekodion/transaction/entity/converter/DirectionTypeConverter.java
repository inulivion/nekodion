package com.konekokonekone.nekodion.transaction.entity.converter;

import com.konekokonekone.nekodion.transaction.enums.DirectionType;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class DirectionTypeConverter implements AttributeConverter<DirectionType, String> {

    @Override
    public String convertToDatabaseColumn(DirectionType attribute) {
        return attribute == null ? null : attribute.getCode();
    }

    @Override
    public DirectionType convertToEntityAttribute(String dbData) {
        return DirectionType.codeOf(dbData);
    }
}
