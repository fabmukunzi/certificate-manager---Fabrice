package dccs.academy.utils.mappers;

import dccs.academy.dtos.SupplierDto;
import dccs.academy.entities.SupplierEntity;

public class SupplierMapper {

  public static SupplierEntity toEntity(SupplierDto supplierDto) {
    if (supplierDto == null) {
      return null;
    }

    SupplierEntity supplierEntity = new SupplierEntity();
    supplierEntity.setName(supplierDto.getName());
    supplierEntity.setCity(supplierDto.getCity());
    return supplierEntity;
  }

  public static SupplierDto toDto(SupplierEntity supplierEntity) {
    if (supplierEntity == null) {
      return null;
    }

    SupplierDto supplierDto = new SupplierDto();
    supplierDto.setId(supplierEntity.getId());
    supplierDto.setName(supplierEntity.getName());
    supplierDto.setIndex(supplierEntity.getIndex());
    supplierDto.setCity(supplierEntity.getCity());
    return supplierDto;
  }
}
