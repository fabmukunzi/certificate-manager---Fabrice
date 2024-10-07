package dccs.academy.services;

import dccs.academy.dtos.DepartmentDto;
import dccs.academy.repositories.DepartmentRepository;
import dccs.academy.utils.mappers.DepartmentMapper;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped
@Transactional
public class DepartmentService {
  @Inject DepartmentRepository departmentRepository;

  public void createDepartment(DepartmentDto departmentDto) {
    var departmentEntity = DepartmentMapper.toEntity(departmentDto);
    departmentRepository.persist(departmentEntity);
  }
}
