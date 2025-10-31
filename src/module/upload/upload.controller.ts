import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname, join } from "path";

// bita fayl uchun
@Controller()
export class UploadController {
    @Post("single")
    @UseInterceptors(
        FileInterceptor("file", {
            storage: diskStorage({
                destination: join(process.cwd(), "uploads"),
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
                    const ext = extname(file.originalname)
                    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`)
                }
            })
        })
    )
    singleFileUpload(@UploadedFile() file: Express.Multer.File) {
        return {
            message:
                "Successfully uploaded",
            filePath: `http://localhost:4001/uploads${file.filename}`
        }
    }

// ko'p fayl fayl uchun
@Post("multiple")
@UseInterceptors(
    FilesInterceptor("files", 10, {
        storage: diskStorage({
            destination: join(process.cwd(), "uploads"),
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                const ext = extname(file.originalname);
                cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            },
        }),
    }),
)
multipleFileUpload(@UploadedFiles() files: Express.Multer.File[]) {
    const uploadedFiles = files.map((file) => ({
        filename: file.filename,
        filePath: `http://localhost:4001/uploads/${file.filename}`,
    }));

    return {
        message: "Successfully uploaded multiple files",
        files: uploadedFiles,
    };
}
}
