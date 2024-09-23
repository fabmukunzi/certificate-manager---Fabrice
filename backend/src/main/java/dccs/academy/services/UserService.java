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

    @Inject DepartmentRepository departmentRepository;

    public void createUser(UserDto userDto){
        var userEntity= UserMapper.toEntity(userDto);
        var department=departmentRepository.findById(userDto.getDepartmentId());
        if(department!=null) {
            userEntity.setDepartment(department);
            userRepository.persist(userEntity);
        } else {
            throw new EntityNotFoundException("Department with Id "+ + userDto.getDepartmentId()+" is not found ");
        }
    }

    public List<UserDto> userSearch(String firstName, String lastName, String plant,Long id ,Long departmentId){
        String query = "lower(firstName) like ?1 and lower(lastName) like ?2 and lower(plant) like ?3";
        List<Object> params = new ArrayList<>();
        params.add("%" + firstName.toLowerCase() + "%");
        params.add("%" + lastName.toLowerCase() + "%");
        params.add("%" + plant.toLowerCase() + "%");
        int nextIndex=4;
        if (id != null) {
            query += " and id = ?"+nextIndex;
            params.add(id);
            nextIndex++;
        }
        System.out.println(departmentId+"===========");
        if (departmentId != null) {
            var departmentEntity = departmentRepository.findById(departmentId);
            if (departmentEntity != null) {
                query += " and department = ?"+nextIndex;
                params.add(departmentEntity);
            }
        }
        var users= userRepository.find(query, params.toArray()).list();
        return users.stream().map(UserMapper::toDto).collect(Collectors.toList());
    }

}
