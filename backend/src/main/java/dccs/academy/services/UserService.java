package dccs.academy.services;

import dccs.academy.dtos.UserDto;
import dccs.academy.entities.UserEntity;
import dccs.academy.repositories.DepartmentRepository;
import dccs.academy.repositories.UserRepository;
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

    public UserDto createUser(UserDto userDto){
        var userEntity=new UserEntity();
        userEntity.setFirstName(userDto.getFirstName());
        userEntity.setLastName(userDto.getLastName());
        userEntity.setPlant(userDto.getPlant());
        var department=departmentRepository.findById(userDto.getDepartment());
        if(department!=null) {
            userEntity.setDepartment(department);
        } else {
            throw new EntityNotFoundException("Department with id "+userDto.getDepartment()+" doesn't exists");
        }
        userRepository.persist(userEntity);
        userDto.setId(userEntity.getId());

        return userDto;
    }
}
