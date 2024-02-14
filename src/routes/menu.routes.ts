import { Router } from "express";
import { addMenuItem, deleteMenuItemById, getAllMenuItems, getMenuItemById, updateMenuItemById } from "../controllers/menu.controller";
import { catchErrors } from "../middleware/error.middleware";
import { verifyIsAdmin, verifyToken } from "../middleware/auth.middleware";
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

const router: Router = Router();

//Get all menu items
router.get("/", catchErrors(getAllMenuItems));
//Get menu item By id
router.get("/:id", catchErrors(getMenuItemById));
//Add menu items
router.post("/",verifyToken, verifyIsAdmin, cpUpload, catchErrors(addMenuItem));
//Update menu item by id
router.put("/:id",verifyToken, verifyIsAdmin, cpUpload,catchErrors(updateMenuItemById));
//Delete menu items By id
router.delete("/:id",verifyToken, verifyIsAdmin, catchErrors(deleteMenuItemById));

export default router;
