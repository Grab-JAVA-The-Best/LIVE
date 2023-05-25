package com.ssafy.live.contract.service;

import static com.ssafy.live.common.exception.ErrorCode.CONTRACT_NOT_FOUND;
import static com.ssafy.live.common.exception.ErrorCode.ITEM_NOT_FOUND;
import static com.ssafy.live.common.exception.ErrorCode.REALTOR_NOT_FOUND;
import static com.ssafy.live.common.exception.ErrorCode.USER_NOT_FOUND;
import static com.ssafy.live.common.exception.ErrorCode.WRONG_AUTHENTICATION_TYPE;

import com.ssafy.live.account.realtor.domain.entity.Realtor;
import com.ssafy.live.account.realtor.domain.repository.RealtorRepository;
import com.ssafy.live.account.user.domain.entity.Users;
import com.ssafy.live.account.user.domain.repository.UsersRepository;
import com.ssafy.live.common.domain.Entity.status.ContractStatus;
import com.ssafy.live.common.domain.Response;
import com.ssafy.live.common.domain.SMSContent;
import com.ssafy.live.common.exception.BadRequestException;
import com.ssafy.live.common.service.SMSService;
import com.ssafy.live.contract.controller.dto.ContractRequest;
import com.ssafy.live.contract.controller.dto.ContractRequest.Update;
import com.ssafy.live.contract.controller.dto.ContractResponse;
import com.ssafy.live.contract.domain.entity.Contract;
import com.ssafy.live.contract.domain.repository.ContractRepository;
import com.ssafy.live.house.domain.entity.Item;
import com.ssafy.live.house.domain.entity.ItemImage;
import com.ssafy.live.house.domain.repository.ItemImageRepository;
import com.ssafy.live.house.domain.repository.ItemRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ContractService {

    private final Response response;
    private final ContractRepository contractRepository;
    private final UsersRepository usersRepository;
    private final RealtorRepository realtorRepository;
    private final ItemImageRepository itemImageRepository;
    private final ItemRepository itemRepository;
    private final SMSService smsService;

    public ResponseEntity<?> regist(ContractRequest.Regist regist) {
        Users users = usersRepository.findById(regist.getUserNo())
            .orElseThrow(() -> new BadRequestException(USER_NOT_FOUND));
        Realtor realtor = realtorRepository.findById(regist.getRealtorNo())
            .orElseThrow(() -> new BadRequestException(REALTOR_NOT_FOUND));
        Item item = itemRepository.findById(regist.getItemNo())
            .orElseThrow(() -> new BadRequestException(ITEM_NOT_FOUND));
        Contract contract = ContractRequest.Regist.toEntity(users, realtor, item, regist);
        contractRepository.save(contract);

        smsService.sendSMS(contract.getNo(), SMSContent.NEW_CONTRACT, contract.getUsers());
        smsService.sendSMS(contract.getNo(), SMSContent.NEW_CONTRACT, contract.getRealtor());

        return response.success("계약신청이 완료되었습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> contractList(UserDetails user, int status) {
        ContractStatus contractStatus = ContractStatus.ofValue(status);
        List<ContractResponse.ContractList> list = null;
        if (user.getAuthorities().contains(new SimpleGrantedAuthority("USER"))) {
            list = contractRepository.findByContractStateAndUsersOrderByCreatedDateDesc(
                    contractStatus,
                    usersRepository.findById(user.getUsername()).get()).stream()
                .map((contract) ->
                    ContractResponse.ContractList.toResponse(
                        contract.getNo(),
                        ContractResponse.ContractList.MemberInfo.toRealtor(contract.getRealtor()),
                        ContractResponse.ContractList.ItemInfo.toResponse(contract.getItem(),
                            itemImageRepository.findByItem(contract.getItem()).get(0).getImageSrc())
                    )
                )
                .collect(Collectors.toList());
        } else if (user.getAuthorities().contains(new SimpleGrantedAuthority("REALTOR"))) {
            list = contractRepository.findByContractStateAndRealtorOrderByCreatedDateDesc(
                    contractStatus,
                    realtorRepository.findByBusinessNumber(user.getUsername()).get()).stream()
                .map((contract) ->
                    ContractResponse.ContractList.toResponse(
                        contract.getNo(),
                        ContractResponse.ContractList.MemberInfo.toUser(contract.getUsers(),
                            contract.getTenantAge()),
                        ContractResponse.ContractList.ItemInfo.toResponse(contract.getItem(),
                            itemImageRepository.findByItem(contract.getItem()).get(0).getImageSrc())
                    )
                )
                .collect(Collectors.toList());
        } else {
            throw new BadRequestException(WRONG_AUTHENTICATION_TYPE);
        }
        return response.success(list, "계약 목록을 조회하였습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> contractDetail(Long contractNo) {
        Contract contract = contractRepository.findById(contractNo).get();
        List<ItemImage> itemImages = itemImageRepository.findByItem(contract.getItem());
        List<String> images = itemImages.stream().map((i) -> i.getImageSrc())
            .collect(Collectors.toList());
        ContractResponse.ContractDetail contractDetail = ContractResponse.ContractDetail
            .toEntity(
                ContractResponse.ContractDetail.RealtorInfo.toEntity(contract.getRealtor()),
                ContractResponse.ContractDetail.UserInfo.toEntity(contract.getUsers()),
                ContractResponse.ContractDetail.ItemInfo.toEntity(contract.getItem(), images),
                ContractResponse.ContractDetail.ContractInfo.toDto(contract)
            );

        return response.success(contractDetail, "계약 상세를 조회하였습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> contractUpdate(Update update, Long contractNo) {
        Contract contract = contractRepository.findById(contractNo).get();
        Item item = itemRepository.findById(contract.getItem().getNo()).get();
        item.updatePayment(update.getDeposit(), update.getRent(), update.getMaintenanceFee());
        contract.updateInfo(update.getMoveOnDate(), update.getTermOfContract(),
            update.getSpecialContract(), update.getCommission(), item.getDeposit());
        itemRepository.save(item);
        contractRepository.save(contract);

        smsService.sendSMS(contract.getNo(), SMSContent.CONTRACT_UPDATE, contract.getUsers());
        return response.success("계약 정보가 수정되었습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> contractChangeStatus(Long contractNo, int status) {
        Contract contract = contractRepository.findById(contractNo)
            .orElseThrow(() -> new BadRequestException(CONTRACT_NOT_FOUND));
        contract.changeStatus(status);
        if (status == 2) {
            Users users = contract.getUsers();
            users.updateScore(10);
            usersRepository.save(users);
        }
        contractRepository.save(contract);

        smsService.sendSMS(contract.getNo(), SMSContent.CONTRACT_UPDATE, contract.getUsers());

        return response.success("계약이 상태가 변경되었습니다.", HttpStatus.OK);
    }
}
