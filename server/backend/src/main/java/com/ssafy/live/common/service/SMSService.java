package com.ssafy.live.common.service;

import static com.ssafy.live.common.domain.Entity.status.ConsultingStatus.CONSULTING_CONFIRMED;
import static com.ssafy.live.common.domain.Entity.status.ConsultingStatus.CONSULTING_PROCESSING;

import com.ssafy.live.account.realtor.domain.entity.Realtor;
import com.ssafy.live.account.user.domain.entity.Users;
import com.ssafy.live.common.domain.SMSContent;
import com.ssafy.live.consulting.domain.entity.Consulting;
import com.ssafy.live.consulting.domain.repository.ConsultingRepository;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@RequiredArgsConstructor
public class SMSService {

    private final ConsultingRepository consultingRepository;

    private String hostNameUrl = "https://sens.apigw.ntruss.com";
    private String requestUrl = "/sms/v2/services/";
    private String requestUrlType = "/messages";

    @Value("${naver.accessKey}")
    private String accessKey;
    @Value("${naver.secretKey}")
    private String secretKey;
    @Value("${naver.serviceId}")
    private String serviceId;
    @Value("${naver.callingNumber}")
    private String callingNumber;


    public void sendSMS(Long no, SMSContent smsContent, Realtor realtor) {
        String content = realtor.getName() + "님 " + smsContent.getMessage() + "(" + no + ")";
        sendSMS(content, realtor.getPhone());
    }

    public void sendSMS(Long no, SMSContent smsContent, Users user) {
        String content = user.getName() + "님 " + smsContent.getMessage() + "(" + no + ")";
        sendSMS(content, user.getPhone());
    }

    private void sendSMS(SMSContent smsContent, Users user) {
        String content = user.getName() + "님 " + smsContent.getMessage();
        sendSMS(content, user.getPhone());
    }

    public void sendSMS(String content, String phone) {
        JSONObject bodyJson = makeBodyJson(content, phone, callingNumber);
        String body = bodyJson.toString();

        trySMS(body);
    }

    public void sendSMS(Long no, String smsContent, Users users) {
        String content = users.getName() + "님 " + smsContent + "(" + no + ")";
        sendSMS(content, users.getPhone());
    }

    @Scheduled(cron = "0 15 1 * * ?", zone = "Asia/Seoul")
    @Transactional
    public void reserveSMSScheduler() {
        List<Consulting> consultingList = consultingRepository.findByStatusBetweenAndConsultingDateStartigWith(
            CONSULTING_CONFIRMED.getValue(), CONSULTING_PROCESSING.getValue());

        if (consultingList != null && !consultingList.isEmpty()) {
            Set<Users> set = new HashSet<>();
            for (Consulting consulting : consultingList) {
                set.add(consulting.getUsers());
            }
            for (Users user : set) {
                sendSMS(SMSContent.TODAY_CONSULTING, user);
            }
        }
    }


    private void reserveSMS(String content, String phone, LocalDateTime consultingDate) {
        LocalDateTime reserveTime = LocalDateTime.of(
            consultingDate.getYear(),
            consultingDate.getMonth(),
            consultingDate.getDayOfMonth(),
            8,
            0);

        String reserveTimeFormat = reserveTime.format(
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
        JSONObject bodyJson = makeBodyJson(content, phone, callingNumber);
        bodyJson.put("reserveTime", reserveTimeFormat);
        String body = bodyJson.toString();

        trySMS(body);
    }


    private void trySMS(String body) {

        String method = "POST";
        String timestamp = Long.toString(
            System.currentTimeMillis());
        String smsRequestUrl = requestUrl + serviceId + requestUrlType;
        String apiUrl = hostNameUrl + smsRequestUrl;

        try {
            URL url = new URL(apiUrl);

            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setUseCaches(false);
            con.setDoOutput(true);
            con.setDoInput(true);
            con.setRequestProperty("content-type", "application/json");
            con.setRequestProperty("x-ncp-apigw-timestamp", timestamp);
            con.setRequestProperty("x-ncp-iam-access-key", accessKey);
            con.setRequestProperty("x-ncp-apigw-signature-v2",
                makeSignature(smsRequestUrl, timestamp, method, accessKey, secretKey));
            con.setRequestMethod(method);
            con.setDoOutput(true);
            DataOutputStream wr = new DataOutputStream(con.getOutputStream());

            wr.write(body.getBytes());
            wr.flush();
            wr.close();

            int responseCode = con.getResponseCode();
            BufferedReader br;
            if (responseCode == 202) {
                br = new BufferedReader(new InputStreamReader(con.getInputStream()));
            } else {
                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
            }

            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }
            br.close();
        } catch (Exception e) {
            log.debug(String.valueOf(e));
        }
    }

    private JSONObject makeBodyJson(String content, String phone, String callingNumber) {
        JSONObject bodyJson = new JSONObject();
        JSONObject toJson = new JSONObject();
        JSONArray toArr = new JSONArray();

        toJson.put("to",
            phone);
        toArr.put(toJson);

        if(content.getBytes().length < 80){
            bodyJson.put("type",
                "SMS");
        }
        else{
            bodyJson.put("type",
                "LMS");
        }
        bodyJson.put("from",
            callingNumber);
        bodyJson.put("content",
            content);
        bodyJson.put("messages",
            toArr);
        return bodyJson;
    }

    private String makeSignature(String url, String timestamp, String method, String accessKey,
        String secretKey) throws NoSuchAlgorithmException, InvalidKeyException {
        String space = " ";
        String newLine = "\n";

        String message = method +
            space +
            url +
            newLine +
            timestamp +
            newLine +
            accessKey;

        SecretKeySpec signingKey;
        String encodeBase64String;

        signingKey = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(signingKey);
        byte[] rawHmac = mac.doFinal(message.getBytes(StandardCharsets.UTF_8));
        encodeBase64String = Base64.getEncoder().encodeToString(rawHmac);
        return encodeBase64String;
    }

}
