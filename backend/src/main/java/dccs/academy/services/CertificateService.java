package dccs.academy.services;

import dccs.academy.dtos.CertificateDto;
import dccs.academy.dtos.UserDto;
import dccs.academy.entities.CertificateEntity;
import dccs.academy.entities.CommentEntity;
import dccs.academy.entities.SupplierEntity;
import dccs.academy.entities.UserEntity;
import dccs.academy.repositories.CertificateRepository;
import dccs.academy.repositories.CommentRepository;
import dccs.academy.repositories.SupplierRepository;
import dccs.academy.repositories.UserRepository;
import dccs.academy.utils.UtilityMethods;
import dccs.academy.utils.mappers.CertificateMapper;
import dccs.academy.utils.mappers.CommentMapper;
import dccs.academy.utils.mappers.UserMapper;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import java.util.ArrayList;
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
        var newCertificateEntity = new CertificateEntity();
        newCertificateEntity.setPdfUrl(UtilityMethods.decode(certificateDto.getPdfUrl()));
        var certificateEntity = CertificateMapper.toEntity(certificateDto, newCertificateEntity);
        if (certificateDto.getSupplier().getId() != null) {
            SupplierEntity supplier = supplierRepository.findById(certificateDto.getSupplier().getId());
            certificateEntity.setSupplier(supplier);
        } else {
            throw new EntityNotFoundException("Supplier with ID " + certificateDto.getSupplier().getId() + " is not found");
        }
        if (certificateDto.getCertificateAssignedUsers() != null) {
            List<UserEntity> users = certificateDto.getCertificateAssignedUsers().stream()
                    .map(userDto -> userRepository.findById(userDto.getId()))
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
        certificateDto.setPdfUrl(UtilityMethods.encode(certificateEntity.getPdfUrl()));
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

    public CertificateDto updateCertificate(Long id, CertificateDto certificateDto) {
        CertificateEntity certificateEntity = certificateRepository.findById(id);
        if (certificateEntity == null) {
            throw new EntityNotFoundException("Certificate with ID " + id + " not found.");
        }

        certificateEntity.setPdfUrl(UtilityMethods.decode(certificateDto.getPdfUrl()));
        if (certificateDto.getCertificateAssignedUsers() != null) {
            List<UserEntity> users = new ArrayList<>();
            for (UserDto userDto : certificateDto.getCertificateAssignedUsers()) {
                UserEntity userEntity = userRepository.findById(userDto.getId());
                if (userEntity == null) {
                    throw new EntityNotFoundException("User with ID " + userDto.getId() + " not found.");
                }
                users.add(userEntity);
            }
            certificateEntity.setUsers(users);
        }
        CertificateMapper.toEntity(certificateDto, certificateEntity);
        if (certificateDto.getSupplier() != null && certificateDto.getSupplier().getId() != null) {
            SupplierEntity supplier = supplierRepository.findById(certificateDto.getSupplier().getId());
            certificateEntity.setSupplier(supplier);
        } else {
            throw new EntityNotFoundException("Supplier with ID " + certificateDto.getSupplier().getId() + " is not found");
        }
        if (certificateDto.getSupplier() != null && certificateDto.getSupplier().getId() != null) {
            SupplierEntity supplier = supplierRepository.findById(certificateDto.getSupplier().getId());
            certificateEntity.setSupplier(supplier);
        } else {
            throw new EntityNotFoundException("Supplier with ID " + certificateDto.getSupplier().getId() + " is not found");
        }
        if (certificateDto.getComments() != null) {
            List<CommentEntity> existingComments = certificateEntity.getComments();
            List<CommentEntity> commentsToRemove = new ArrayList<>(existingComments);
            existingComments.clear();
            List<CommentEntity> updatedComments = certificateDto.getComments().stream()
                    .map(commentDto -> {
                        return commentsToRemove.stream()
                                .filter(existingComment -> existingComment.getId().equals(commentDto.getId()))
                                .findFirst()
                                .map(existingComment -> {
                                    CommentMapper.toEntity(commentDto, certificateEntity, userRepository);
                                    return existingComment;
                                })
                                .orElseGet(() -> CommentMapper.toEntity(commentDto, certificateEntity, userRepository)); // If no match, create a new comment
                    })
                    .collect(Collectors.toList());
            updatedComments.forEach(commentRepository::persist);
            certificateEntity.setComments(updatedComments);
        }
        certificateRepository.persist(certificateEntity);
        return CertificateMapper.toDto(certificateEntity);
    }
}
