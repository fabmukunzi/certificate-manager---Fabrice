package dccs.academy.services;

import dccs.academy.dtos.SupplierDto;
import dccs.academy.entities.SupplierEntity;
import dccs.academy.entities.SupplierEntity_;
import dccs.academy.repositories.SupplierRepository;
import dccs.academy.utils.SearchQueryBuilder;
import dccs.academy.utils.mappers.SupplierMapper;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@ApplicationScoped
@Transactional
public class SupplierService {

    @Inject
    SupplierRepository supplierRepository;

    public void createSupplier(SupplierDto supplierDto) {
        var supplierEntity = SupplierMapper.toEntity(supplierDto);
        supplierRepository.persist(supplierEntity);
    }
}
