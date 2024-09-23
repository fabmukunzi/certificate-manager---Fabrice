package dccs.academy.seeders;

import dccs.academy.dtos.UserDto;
import dccs.academy.repositories.UserRepository;
import dccs.academy.services.UserService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class UserSeed {

    @Inject
    UserService userService;
    @Inject
    UserRepository userRepository;

    public void seedUser() {
        List<UserDto> users = new ArrayList<>();

        UserDto user1 = new UserDto();
        user1.setFirstName("John");
        user1.setLastName("Doe");
        user1.setDepartment(1L);
        user1.setPlant("Plant A");
        users.add(user1);

        UserDto user2 = new UserDto();
        user2.setFirstName("Jane");
        user2.setLastName("Smith");
        user2.setDepartment(2L);
        user2.setPlant("Plant B");
        users.add(user2);

        UserDto user3 = new UserDto();
        user3.setFirstName("Alice");
        user3.setLastName("Brown");
        user3.setDepartment(3L);
        user3.setPlant("Plant C");
        users.add(user3);

        UserDto user4 = new UserDto();
        user4.setFirstName("Bob");
        user4.setLastName("Taylor");
        user4.setDepartment(3L);
        user4.setPlant("Plant D");
        users.add(user4);

        UserDto user5 = new UserDto();
        user5.setFirstName("Charlie");
        user5.setLastName("Wilson");
        user5.setDepartment(4L);
        user5.setPlant("Plant E");
        users.add(user5);

        if(userRepository.listAll().isEmpty()){
            for (UserDto user : users) {
                userService.createUser(user);
            }
        }
    }
}
