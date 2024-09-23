package dccs.academy.services;

import dccs.academy.dtos.SupplierDto;
import dccs.academy.entities.SupplierEntity;
import dccs.academy.repositories.SupplierRepository;
import dccs.academy.utils.mappers.SupplierMapper;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
@Transactional
public class SupplierService {
    @Inject
    SupplierRepository supplierRepository;
    public void createSupplier(SupplierDto supplierDto){
        var supplierEntity= SupplierMapper.toEntity(supplierDto);
        supplierRepository.persist(supplierEntity);
    }

    public List<SupplierDto> supplierSearch(String names, String city, Long id){
        String query = "lower(names) like ?1 and lower(city) like ?2";
        List<Object> params = new ArrayList<>();
        params.add("%" + names.toLowerCase() + "%");
        params.add("%" + city.toLowerCase() + "%");
        if (id != null) {
            query += " and id = ?3";
            params.add(id);
        }
        var suppliers= supplierRepository.find(query, params.toArray()).list();
        return suppliers.stream().map(SupplierMapper::toDto).collect(Collectors.toList());
    }
}
