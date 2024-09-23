package dccs.academy.services;

import dccs.academy.dtos.SupplierDto;
import dccs.academy.entities.SupplierEntity;
import dccs.academy.repositories.SupplierRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped
@Transactional
public class SupplierService {
    @Inject
    SupplierRepository supplierRepository;
    public SupplierDto createSupplier(SupplierDto supplierDto){
        var supplierEntity= new SupplierEntity();
        supplierEntity.setNames(supplierDto.getNames());
        supplierEntity.setCity(supplierDto.getCity());
        supplierRepository.persist(supplierEntity);
        supplierDto.setId(supplierEntity.getId());
        return supplierDto;
    }
}
