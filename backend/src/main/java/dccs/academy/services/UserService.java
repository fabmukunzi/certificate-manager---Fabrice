package dccs.academy.services;

import dccs.academy.dtos.UserDto;
import dccs.academy.entities.UserEntity;
import dccs.academy.repositories.DepartmentRepository;
import dccs.academy.repositories.UserRepository;
import dccs.academy.utils.mappers.UserMapper;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@ApplicationScoped
@Transactional
public class UserService {
    @Inject
    UserRepository userRepository;

    @Inject
    DepartmentRepository departmentRepository;

    public void createUser(UserDto userDto){
        var userEntity= UserMapper.toEntity(userDto);
        var department=departmentRepository.findById(userDto.getDepartmentId());
        if(department!=null) {
            userEntity.setDepartment(department);
        } else {
            throw new EntityNotFoundException("Department with id "+userDto.getDepartmentId()+" doesn't exists");
        }
        userRepository.persist(userEntity);
    }
}
