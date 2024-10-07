package dccs.academy.services;

import dccs.academy.dtos.SupplierDto;
import dccs.academy.repositories.SupplierRepository;
import dccs.academy.utils.mappers.SupplierMapper;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped
@Transactional
public class SupplierService {

  @Inject SupplierRepository supplierRepository;

  public void createSupplier(SupplierDto supplierDto) {
    var supplierEntity = SupplierMapper.toEntity(supplierDto);
    supplierRepository.persist(supplierEntity);
  }
}
