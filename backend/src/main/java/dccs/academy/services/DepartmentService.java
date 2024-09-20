package dccs.academy.services;

import dccs.academy.dtos.DepartmentDto;
import dccs.academy.entities.DepartmentEntity;
import dccs.academy.repositories.DepartmentRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped
@Transactional
public class DepartmentService {
    @Inject
    DepartmentRepository departmentRepository;
    public DepartmentDto createDepartment(DepartmentDto departmentDto){
        var departmentEntity=new DepartmentEntity();
        departmentEntity.setTitle(departmentDto.getTitle());
        departmentRepository.persist(departmentEntity);
        departmentDto.setId(departmentEntity.getId());
        return departmentDto;
    }
}
