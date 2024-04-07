import { Router } from "express";
import { catchErrors } from "../middleware/error.middleware";
import { verifyIsAdmin, verifyToken } from "../middleware/auth.middleware";
import multer from "multer";
import { getAllBannerItems,addBanner, updateBannerItemById, deleteBannerItemById } from "../controllers/banner.controller";

let storage = multer.diskStorage({
    destination: function (_req, _file, callback) {
      callback(null, "uploads");
    },
    filename: function (_req, file, callback) {
      if (file.originalname.length > 6)
        callback(
          null,
          file.fieldname +
            "-" +
            Date.now() +
            file.originalname.substr(
              file.originalname.length - 6,
              file.originalname.length
            )
        );
      else callback(null, file.fieldname + "-" + Date.now() + file.originalname);
    },
  });

// Set up multer upload
const upload = multer({ storage: storage });

// Define the upload middleware for thumbnail
const cpUpload = upload.single('thumbnail');

const router: Router = Router();

//Get all menu items
router.get("/", catchErrors(getAllBannerItems));

router.post("/",verifyToken, verifyIsAdmin, cpUpload, catchErrors(addBanner));
router.put("/:id",verifyToken, verifyIsAdmin, cpUpload,catchErrors(updateBannerItemById));
//Delete menu items By id
router.delete("/:id",verifyToken, verifyIsAdmin, catchErrors(deleteBannerItemById));

export default router;
