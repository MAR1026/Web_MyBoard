package kr.hs.dgsw.myboard_back.Controller;

import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.net.URLConnection;
import java.util.UUID;

@RestController
@RequestMapping("/api/image")
public class ImageController {

    @PostMapping("/upload")
    public String upload(@RequestPart MultipartFile srcFile) {
        String destFileName = "C:\\Spring\\myboard\\upload\\";
        String filename = UUID.randomUUID().toString() + "_" + srcFile.getOriginalFilename();
        try {
            File destFile = new File(destFileName+filename);
            destFile.getParentFile().mkdirs();
            srcFile.transferTo(destFile);
            return filename;
            
        } catch (Exception e) {
            return null;
        }
    }


    @GetMapping(value = "/download/{filename}")
    public void download(HttpServletRequest request, HttpServletResponse response, @PathVariable String filename) {
        try {
            String filepath = "C:\\Spring\\myboard\\upload\\" + filename;
            File file = new File(filepath);
            if(file.exists() == false) return;

            String mimeType = URLConnection.guessContentTypeFromName(file.getName());
            if (mimeType == null) {
                mimeType ="application/octet-stream";
            }
            response.setContentType(mimeType);
            response.setHeader("Content-Desposition", "inline; filename=\""

                    + filename + "\"");

            response.setContentLength((int) file.length());
            InputStream is = new BufferedInputStream(new FileInputStream(file));
            FileCopyUtils.copy(is, response.getOutputStream());
        }catch(Exception ex){
            System.out.println(ex.getMessage());

        }
    }


}
