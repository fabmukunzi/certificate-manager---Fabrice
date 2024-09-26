package dccs.academy.services;

import dccs.academy.dtos.CertificateDto;
import dccs.academy.entities.CertificateEntity;
import dccs.academy.entities.CommentEntity;
import dccs.academy.entities.SupplierEntity;
import dccs.academy.entities.UserEntity;
import dccs.academy.repositories.CertificateRepository;
import dccs.academy.repositories.CommentRepository;
import dccs.academy.repositories.SupplierRepository;
import dccs.academy.repositories.UserRepository;
import dccs.academy.utils.mappers.CertificateMapper;
import dccs.academy.utils.mappers.CommentMapper;
import dccs.academy.utils.mappers.UserMapper;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@ApplicationScoped
@Transactional
public class CertificateService {

    @Inject
    CertificateRepository certificateRepository;
    @Inject
    SupplierRepository supplierRepository;
    @Inject
    UserRepository userRepository;
    @Inject
    CommentRepository commentRepository;

    public CertificateDto createCertificate(CertificateDto certificateDto) {
        CertificateEntity certificateEntity = CertificateMapper.toEntity(certificateDto);
        if (certificateDto.getSupplier().getId() != null) {
            SupplierEntity supplier = supplierRepository.findById(certificateDto.getSupplier().getId());
            certificateEntity.setSupplier(supplier);
        } else {
            throw new EntityNotFoundException("Supplier with ID " + certificateDto.getSupplier().getId() + " is not found");
        }
        if (certificateDto.getCertificateAssignedUsers() != null) {
            List<UserEntity> users = certificateDto.getCertificateAssignedUsers().stream()
                    .map(userDto -> userRepository.findById(userDto.getId()))                                           // Remove duplicate users
                    .collect(Collectors.toList());
            certificateEntity.setUsers(users);
        }
        certificateRepository.persist(certificateEntity);
        if (certificateDto.getComments() != null) {
            List<CommentEntity> commentEntities = certificateDto.getComments().stream()
                    .map(commentDto -> CommentMapper.toEntity(commentDto, certificateEntity, userRepository))
                    .collect(Collectors.toList());
            commentEntities.forEach(commentRepository::persist);
            certificateEntity.setComments(commentEntities);
        }
        return CertificateMapper.toDto(certificateEntity);
    }

    public List<CertificateDto> getAllCertificates() {
        List<CertificateEntity> certificates = certificateRepository.listAll();
        return certificates.stream().map(CertificateMapper::toDto).collect(Collectors.toList());
    }

    public CertificateDto getCertificateById(Long id) {
        CertificateEntity certificateEntity = certificateRepository.findById(id);
        if (certificateEntity == null) {
            throw new EntityNotFoundException("Certificate with ID " + id + " is not found.");
        }
        var certificateDto = CertificateMapper.toDto(certificateEntity);
        if (certificateEntity.getComments() != null) {
            certificateDto.setComments(
                    certificateEntity.getComments().stream().map(CommentMapper::toDto).collect(Collectors.toList())
            );
        }
        if (certificateEntity.getUsers() != null) {
            certificateDto.setCertificateAssignedUsers(
                    certificateEntity.getUsers().stream()
                            .map(UserMapper::toDto)
                            .collect(Collectors.toList())
            );
        }
        return certificateDto;
    }
    public void deleteCertificateById(Long id) {
        CertificateEntity certificateEntity = certificateRepository.findById(id);
        if (certificateEntity == null) {
            throw new EntityNotFoundException("Certificate with ID " + id + " is not found.");
        }
        certificateRepository.delete(certificateEntity);
    }
}
