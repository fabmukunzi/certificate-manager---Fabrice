package dccs.academy.utils.mappers;

import dccs.academy.dtos.CommentDto;
import dccs.academy.dtos.UserDto;
import dccs.academy.entities.CertificateEntity;
import dccs.academy.entities.CommentEntity;
import dccs.academy.entities.UserEntity;
import dccs.academy.repositories.UserRepository;

public class CommentMapper {
  public static CommentDto toDto(CommentEntity commentEntity) {
    CommentDto commentDto = new CommentDto();
    commentDto.setContent(commentEntity.getContent());
    commentDto.setId(commentEntity.getId());
    if (commentEntity.getUser() != null) {
      UserDto userDto = UserMapper.toDto(commentEntity.getUser());
      commentDto.setUser(userDto);
    }
    return commentDto;
  }

  public static CommentEntity toEntity(
      CommentDto commentDto, CertificateEntity certificate, UserRepository userRepository) {
    CommentEntity commentEntity = new CommentEntity();
    commentEntity.setContent(commentDto.getContent());
    commentEntity.setCertificates(certificate);

    UserEntity user = userRepository.findById(commentDto.getUser().getId());
    commentEntity.setUser(user);

    return commentEntity;
  }
}
