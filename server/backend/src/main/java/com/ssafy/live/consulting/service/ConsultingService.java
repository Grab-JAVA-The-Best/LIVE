package com.ssafy.live.consulting.service;

import static com.ssafy.live.common.domain.Entity.status.ConsultingStatus.CONSULTING_CANCLED;
import static com.ssafy.live.common.domain.Entity.status.ConsultingStatus.CONSULTING_CONFIRMED;
import static com.ssafy.live.common.domain.Entity.status.ConsultingStatus.CONSULTING_PROCESSING;
import static com.ssafy.live.common.exception.ErrorCode.CONSULTING_NOT_FOUND;
import static com.ssafy.live.common.exception.ErrorCode.ITEM_NOT_FOUND;
import static com.ssafy.live.common.exception.ErrorCode.REALTOR_NOT_FOUND;
import static com.ssafy.live.common.exception.ErrorCode.USER_NOT_FOUND;

import com.ssafy.live.account.realtor.domain.entity.Realtor;
import com.ssafy.live.account.realtor.domain.repository.RealtorRepository;
import com.ssafy.live.account.user.domain.entity.Users;
import com.ssafy.live.account.user.domain.repository.UsersRepository;
import com.ssafy.live.common.domain.Entity.status.ConsultingStatus;
import com.ssafy.live.common.domain.Response;
import com.ssafy.live.common.domain.SMSContent;
import com.ssafy.live.common.exception.BadRequestException;
import com.ssafy.live.common.service.SMSService;
import com.ssafy.live.consulting.controller.dto.ConsultingRequest;
import com.ssafy.live.consulting.controller.dto.ConsultingRequest.AddItem;
import com.ssafy.live.consulting.controller.dto.ConsultingResponse;
import com.ssafy.live.consulting.domain.entity.Consulting;
import com.ssafy.live.consulting.domain.entity.ConsultingItem;
import com.ssafy.live.consulting.domain.entity.Record;
import com.ssafy.live.consulting.domain.repository.ConsultingItemRepository;
import com.ssafy.live.consulting.domain.repository.ConsultingRepository;
import com.ssafy.live.consulting.domain.repository.RecordRepository;
import com.ssafy.live.house.domain.entity.House;
import com.ssafy.live.house.domain.entity.Item;
import com.ssafy.live.house.domain.entity.ItemImage;
import com.ssafy.live.house.domain.repository.ItemImageRepository;
import com.ssafy.live.house.domain.repository.ItemRepository;
import com.ssafy.live.notice.domain.entity.Notice;
import com.ssafy.live.notice.domain.repository.NoticeRepository;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpRange;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.MediaTypeFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class ConsultingService {

    private final RecordRepository recordRepository;

    private final Response response;
    private final ConsultingRepository consultingRepository;
    private final UsersRepository usersRepository;
    private final RealtorRepository realtorRepository;
    private final ItemRepository itemRepository;
    private final ItemImageRepository itemImageRepository;
    private final NoticeRepository noticeRepository;
    private final ConsultingItemRepository consultingItemRepository;
    private final SMSService smsService;

    public ResponseEntity<?> reserve(UserDetails user, ConsultingRequest.Reserve reserve) {
        Users users = usersRepository.findById(user.getUsername())
            .orElseThrow(() -> new BadRequestException(USER_NOT_FOUND));
        Realtor realtor = realtorRepository.findById(reserve.getRealtorNo())
            .orElseThrow(() -> new BadRequestException(REALTOR_NOT_FOUND));
        Consulting consulting = Consulting.builder().realtor(realtor).users(users)
            .consultingDate(reserve.getConsultingDate()).requirement(reserve.getRequirement())
            .status(ConsultingStatus.RESERVERVATION_PROCESSING).build();
        consultingRepository.save(consulting);

        reserve.getItemList().stream().forEach(no -> {
            Item item = itemRepository.findById(no).get();
            ConsultingItem consultingItem = ConsultingItem.builder().consulting(consulting)
                .item(item).build();
            consultingItemRepository.save(consultingItem);
        });

        smsService.sendSMS(consulting.getNo(), SMSContent.NEW_CONSULTING, consulting.getUsers());
        return response.success("예약이 완료되었습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> reservationListByRealtor(UserDetails user, int status) {
        ConsultingStatus[] statuses = ConsultingStatus.setStatus(status);
        if (user.getAuthorities().contains(new SimpleGrantedAuthority("USER"))) {
            Long no = usersRepository.findById(user.getUsername()).get().getNo();
            List<Consulting> consultingsList = consultingRepository.findByUsersAndStatusOrStatusOrderByConsultingDate(
                usersRepository.findById(no).get(), statuses[0], statuses[1]);
            return listByUserOrRealtor(consultingsList, "USER");
        } else {
            Long no = realtorRepository.findByBusinessNumber(user.getUsername()).get().getNo();
            List<Consulting> consultingsList = consultingRepository.findByRealtorAndStatusOrStatusOrderByConsultingDate(
                realtorRepository.findById(no).get(), statuses[0], statuses[1]);
            return listByUserOrRealtor(consultingsList, "REALTOR");
        }
    }

    private ResponseEntity<?> listByUserOrRealtor(List<Consulting> consultingsList, String target) {
        List<ConsultingResponse.ReservationInfo> list = new ArrayList<>();
        if (consultingsList.isEmpty()) {
            listNotFound();
        }
        consultingsList.stream().forEach(consulting -> {
            List<ConsultingItem> consultingItems = consulting.getConsultingItems();
            int count = 0;
            String buildingName = "";
            if (consultingItems.size() > 0) {
                count = consultingItems.size() - 1;
                buildingName = consultingItems.get(0).getItem().getHouse().getBuildingName();
            }
            if (target.equals("USER")) {
                Realtor realtor = consulting.getRealtor();
                list.add(
                    ConsultingResponse.ReservationInfo.toResponse(consulting, realtor, buildingName,
                        count));
            } else {
                Users user = consulting.getUsers();
                list.add(
                    ConsultingResponse.ReservationInfo.toResponse(consulting, user, buildingName,
                        count));
            }
        });
        if (list.isEmpty()) {
            listNotFound();
        }
        return response.success(list, "상담 목록을 조회하였습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> changeStatus(UserDetails user,
        ConsultingRequest.ChangeStatus request) {
        Consulting consulting = consultingRepository.findById(request.getConsultingNo())
            .orElseThrow(() -> new BadRequestException(CONSULTING_NOT_FOUND));

        consulting.updateStatus(request.getStatus());
        consultingRepository.save(consulting);
        String writer, info;
        SMSContent smsContent;
        if (user.getAuthorities().contains(new SimpleGrantedAuthority("USER"))) {
            writer = consulting.getRealtor().getName();
        } else {
            writer = consulting.getUsers().getName();
        }
        if (request.getStatus() == CONSULTING_CONFIRMED.getValue()) {
            info = "예약이 확정되었습니다.";
            smsContent = SMSContent.CONSULTING_CONFIRMED;
        } else if (request.getStatus() == CONSULTING_PROCESSING.getValue()) {
            info = "상담이 시작되었습니다.";
            smsContent = SMSContent.CONSULTING_PROCESSING;
        } else {
            info = "예약이 취소되었습니다.";
            smsContent = SMSContent.CONSULTING_CANCLED;
        }
        Notice notice = Notice.builder().users(consulting.getUsers())
            .realtor(consulting.getRealtor()).noticeInfo(info).noticeWriter(writer).build();
        noticeRepository.save(notice);

        smsService.sendSMS(consulting.getNo(), smsContent, consulting.getUsers());

        return response.success("예약상태가 변경되었습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> listNotFound() {
        return response.success("목록이 존재하지 않습니다.", HttpStatus.NO_CONTENT);
    }

    public ResponseEntity<?> detailReservation(Long consultingNo) {
        Consulting consulting = consultingRepository.findById(consultingNo)
            .orElseThrow(() -> new BadRequestException(CONSULTING_NOT_FOUND));
        if (consulting == null) {
            return response.fail("해당하는 상담 정보를 찾을 수 없습니다.", HttpStatus.BAD_REQUEST);
        }
        List<ConsultingItem> consultingItems = consultingItemRepository.findByConsultingNo(
            consultingNo);
        List<ConsultingResponse.ReservationDetail.MyConsultingItem> items = new ArrayList<>();
        consultingItems.stream().forEach(consultingItem -> {
            Item item = consultingItem.getItem();
            House house = consultingItem.getItem().getHouse();
            List<ItemImage> itemImages = itemImageRepository.findByItem(item);
            items.add(ConsultingResponse.ReservationDetail.MyConsultingItem.toResponse(item, house,
                itemImages.get(0).getImageSrc()));
        });
        ConsultingResponse.ReservationDetail detail = ConsultingResponse.ReservationDetail.toResponse(
            consultingNo, consulting, items);
        return response.success(detail, "예약 상세 내역을 조회하였습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> addConsultingItems(Long consultingNo, AddItem addItem) {
        Set<Long> noList = addItem.getItemList();
        Consulting consulting = consultingRepository.findById(consultingNo)
            .orElseThrow(() -> new BadRequestException(CONSULTING_NOT_FOUND));

        List<ConsultingItem> consultingItems = consultingItemRepository.findByConsultingNo(
            consultingNo);
        if (consultingItems.isEmpty()) {
            return response.fail("해당하는 상담 정보를 찾을 수 없습니다.", HttpStatus.BAD_REQUEST);
        }
        consultingItems.stream().forEach(consultingItem -> {
            if (noList.contains(consultingItem.getItem().getNo())) {
                noList.remove(consultingItem.getItem().getNo());
            } else {
                consultingItemRepository.delete(consultingItem);
            }
        });
        noList.stream().forEach(index -> {
            Item item = itemRepository.findById(index)
                .orElseThrow(() -> new BadRequestException(ITEM_NOT_FOUND));
            ConsultingItem consultingItem = ConsultingItem.builder().consulting(consulting)
                .item(item).build();
            consultingItemRepository.save(consultingItem);
        });
        Notice notice = Notice.builder().users(consulting.getUsers())
            .realtor(consulting.getRealtor()).noticeInfo("상담 매물이 변경되었습니다.")
            .noticeWriter(consulting.getRealtor().getName()).build();
        noticeRepository.save(notice);

        consulting.updateStatus(1);
        consultingRepository.save(consulting);

        smsService.sendSMS(consulting.getNo(), SMSContent.CONSULTING_CHANGE, consulting.getUsers());

        return response.success("상담 매물 수정이 완료되었습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> infoForContact(UserDetails user, Long itemNo) {
        Item item = itemRepository.findById(itemNo)
            .orElseThrow(() -> new BadRequestException(ITEM_NOT_FOUND));
        ConsultingResponse.ItemForContract.RealtorInfo realtor = ConsultingResponse.ItemForContract.RealtorInfo.toResponse(
            item.getRealtor());
        ConsultingResponse.ItemForContract.UserInfo users = ConsultingResponse.ItemForContract.UserInfo.toResponse(
            usersRepository.findById(user.getUsername()).get());

        List<ItemImage> itemImages = itemImageRepository.findByItem(item);
        List<String> images = itemImages.stream().map((i) -> i.getImageSrc())
            .collect(Collectors.toList());

        ConsultingResponse.ItemForContract.ItemInfo itemInfo = ConsultingResponse.ItemForContract.ItemInfo.toResponse(
            item, images);
        ConsultingResponse.ItemForContract contractInfo = ConsultingResponse.ItemForContract.toResponse(
            realtor, users, itemInfo);
        return response.success(contractInfo, "계약 할 매물 정보를 조회하였습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> consultingLink(Long consultingNo, ConsultingRequest.AddLink link) {
        Consulting consulting = consultingRepository.findById(consultingNo)
            .orElseThrow(() -> new BadRequestException(CONSULTING_NOT_FOUND));
        consulting.addLink(link.getLink());
        consulting.updateStatus(CONSULTING_PROCESSING.getValue());
        consultingRepository.save(consulting);
        Notice notice = ConsultingRequest.AddLink.toEntity(consulting, link);
        noticeRepository.save(notice);
        smsService.sendSMS(consulting.getNo(), SMSContent.CONSULTING_START.getMessage()+" https://live-live.store"+link.getLink(), consulting.getUsers());
        return response.success("상담링크가 전송되었습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> saveRec(Long consultingNo, List<MultipartFile> records) {
        Consulting consulting = consultingRepository.findById(consultingNo)
            .orElseThrow(() -> new BadRequestException(CONSULTING_NOT_FOUND));

        for (MultipartFile rec : records) {
            if (!rec.isEmpty()) {
                try {
                    String originalFile = rec.getOriginalFilename();

                    int pos = originalFile.lastIndexOf(".");
                    String type = originalFile.substring(pos + 1);

                    String saveFolder = "/live/records/" + consultingNo.toString();
                    String saveFile = UUID.randomUUID() + "." + type;

                    File file = new File(saveFolder + "/" + saveFile);
                    file.getParentFile().mkdirs();
                    rec.transferTo(file);
                    Record record = Record.builder()
                        .saveFolder(saveFolder)
                        .saveFile(saveFile)
                        .originalFile(originalFile)
                        .consulting(consulting)
                        .build();

                    recordRepository.save(record);
                } catch (IOException e) {
                    e.printStackTrace();
                    return response.fail("녹화영상 저장에 실패했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
        }
        return response.success("녹화영상이 저장되었습니다.", HttpStatus.OK);
    }

    public ResponseEntity<?> getRecList(Long consultingNo) {
        consultingRepository.findById(consultingNo)
            .orElseThrow(() -> new BadRequestException(CONSULTING_NOT_FOUND));

        List<Long> recordPathList = recordRepository.findByConsultingNo(consultingNo)
            .stream()
            .map(record -> record.getNo())
            .collect(Collectors.toList());

        return response.success(recordPathList, "녹화영상 목록이 조회되었습니다.", HttpStatus.OK);
    }

    public ResponseEntity<ResourceRegion> streamRecord(HttpHeaders headers, Long recordNo)
        throws IOException {
        Record record = recordRepository.findById(recordNo).get();

        Resource resource = new FileSystemResource(record.getPath());
        ResourceRegion resourceRegion;

        final long chunkSize = 1000000L;
        long contentLength = resource.contentLength();

        Optional<HttpRange> optional = headers.getRange().stream().findFirst();
        HttpRange httpRange;

        if (optional.isPresent()) {
            httpRange = optional.get();
            long start = httpRange.getRangeStart(contentLength);
            long end = httpRange.getRangeEnd(contentLength);
            long rangeLength = Long.min(chunkSize, end - start + 1);
            resourceRegion = new ResourceRegion(resource, start, rangeLength);
        } else {
            long rangeLength = Long.min(chunkSize, contentLength);
            resourceRegion = new ResourceRegion(resource, 0, rangeLength);
        }

        return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
            .contentType(
                MediaTypeFactory.getMediaType(resource)
                    .orElse(MediaType.APPLICATION_OCTET_STREAM))
            .body(resourceRegion);

    }

    public ResponseEntity<?> todayList(UserDetails user) {
        Realtor realtor = realtorRepository.findByBusinessNumber(user.getUsername())
            .orElseThrow(() -> new BadRequestException(CONSULTING_NOT_FOUND));

        List<Consulting> consultingsList = consultingRepository.findByRealtorNoAndStatusBetweenAndConsultingDateStartigWith(
            realtor.getNo(),
            CONSULTING_CONFIRMED.getValue(), CONSULTING_PROCESSING.getValue());
        List<ConsultingResponse.TodayConsulting> list = new ArrayList<>();
        consultingsList.stream().forEach(consulting -> {
            List<ConsultingItem> consultingItems = consulting.getConsultingItems();
            int count = 0;
            String buildingName = "";
            if (consultingItems.size() > 0) {
                count = consultingItems.size() - 1;
                buildingName = consultingItems.get(0).getItem().getHouse().getBuildingName();
            }
            Users users = consulting.getUsers();
            list.add(
                ConsultingResponse.TodayConsulting.toResponse(consulting, users, buildingName,
                    count));

        });
        if (list.isEmpty()) {
            listNotFound();
        }
        return response.success(list, "오늘의 상담 목록이 조회되었습니다.", HttpStatus.OK);
    }
}
