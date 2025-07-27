const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  runExperiment,
  listExperiments,
  getExperiment,
} = require("../controllers/experimentController");

router.use(auth);

router.post("/", runExperiment);
router.get("/", listExperiments);
router.get("/:id", getExperiment);

module.exports = router;
