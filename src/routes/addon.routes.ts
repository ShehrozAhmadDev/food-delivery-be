import { Router } from "express";
import {  addAddOnItem, deleteAddOnItemById, getAddOnItemById, getAllAddOnItems, updateAddOnItemById} from "../controllers/addon.controller";
import { catchErrors } from "../middleware/error.middleware";
import { verifyIsAdmin, verifyToken } from "../middleware/auth.middleware";
const router: Router = Router();
import multer from "multer";

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

  const upload = multer({ storage: storage });

  const cpUpload = upload.fields([
    { name: "thumbnail", maxCount: 1 },
  ]);
//Get all addon items
router.get("/", catchErrors(getAllAddOnItems));
//Get addon item By id
router.get("/:id", catchErrors(getAddOnItemById));
//Add addon items
router.post("/",verifyToken, verifyIsAdmin, cpUpload, catchErrors(addAddOnItem));
//Update addon item by id
router.put("/:id",verifyToken, verifyIsAdmin, cpUpload, catchErrors(updateAddOnItemById));
//Delete addon items By id
router.delete("/:id",verifyToken, verifyIsAdmin, catchErrors(deleteAddOnItemById));

export default router;
