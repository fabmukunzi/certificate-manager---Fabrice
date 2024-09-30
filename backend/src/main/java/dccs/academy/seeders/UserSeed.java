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
        user1.setDepartment("Engineering");
        user1.setPlant("Plant A");
        user1.setEmail("johndoe@example.com");
        users.add(user1);

        UserDto user2 = new UserDto();
        user2.setFirstName("Jane");
        user2.setLastName("Smith");
        user2.setDepartment("Sales");
        user2.setPlant("Plant B");
        user2.setEmail("janesmith@example.com");
        users.add(user2);

        UserDto user3 = new UserDto();
        user3.setFirstName("Alice");
        user3.setLastName("Brown");
        user3.setDepartment("Finance");
        user3.setPlant("Plant C");
        user3.setEmail("alicebrown@example.com");
        users.add(user3);

        UserDto user4 = new UserDto();
        user4.setFirstName("Bob");
        user4.setLastName("Taylor");
        user4.setDepartment("Finance");
        user4.setPlant("Plant D");
        user4.setEmail("bobtaylor@example.com");
        users.add(user4);

        UserDto user5 = new UserDto();
        user5.setFirstName("Charlie");
        user5.setLastName("Wilson");
        user5.setDepartment("HR");
        user5.setPlant("Plant E");
        user5.setEmail("charliewilson@example.com");
        users.add(user5);

        if(userRepository.count()==0){
            for (UserDto user : users) {
                userService.createUser(user);
            }
        }
    }
}
