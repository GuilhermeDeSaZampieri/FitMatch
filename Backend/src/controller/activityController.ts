import { Express, Router } from "express";
import authGuard from "../middlewares/authGuard";
import {
  approveActivityParticipantService,
  CheckinActivityService,
  concludeActivityService,
  createActivityService,
  deleteActivityServicer,
  getActivityAllService,
  getActivityService,
  subscribeActivityService,
  updateActivityService,
} from "../services/activityServices";
import validateRequestBody from "../middlewares/authValidation";
import activityValidation from "../validations/activityValidations";
import { getTypesActivityService } from "../services/activityTypeService";
import {
  getActivityCreateByUserService,
  getAllActivityCreateByUserService,
} from "../services/userServices";
import upload from "../multer/multer";
import activityParticipantValidation from "../validations/activityParticipantValidation";
import { uploadImage } from "../services/s3-services";

const activityController = (server: Express) => {
  const router = Router();

  router.use(authGuard);

  router.get("/types", async (req, res) => {
    try {
      const activityTypes = await getTypesActivityService();
      res.status(200).json(activityTypes);
      return;
    } catch (error: any) {
      if (
        error.message === "Esta conta foi desativada e não pode ser ultilizada"
      ) {
        res.status(403).json({
          error: "Esta conta foi desativada e não pode ser ultilizada.",
        });
      }
      res.status(500).json({ error: "Erro inesperado" });
    }
  });

  router.get("", async (req, res) => {
    try {
      const { page, pageSize, typeId, orderBy, order } = req.query as {
        page: string;
        pageSize: string;
        typeId: string;
        orderBy: string;
        order: "asc" | "desc";
      };
      const activities = await getActivityService(
        parseInt(page) || 1,
        parseInt(pageSize) || 10,
        typeId,
        orderBy,
        order
      );
      res.status(200).json(activities);
    } catch (error: any) {
      if (
        error.message === "Esta conta foi desativada e não pode ser ultilizada"
      ) {
        res.status(403).json({
          error: "Esta conta foi desativada e não pode ser ultilizada.",
        });
      }
      res.status(500).json({ error: "Erro inesperado" });
    }
  });

  router.get("/all", async (req, res) => {
    try {
      const { typeId, orderBy, order } = req.query as {
        typeId: string;
        orderBy: string;
        order: "asc" | "desc";
      };
      const activities = await getActivityAllService(typeId, orderBy, order);
      res.status(200).json(activities);
    } catch (error: any) {
      if (
        error.message === "Esta conta foi desativada e não pode ser ultilizada"
      ) {
        res.status(403).json({
          error: "Esta conta foi desativada e não pode ser ultilizada.",
        });
      }
      res.status(500).json({ error: "Erro inesperado" });
    }
  });

  router.get("/user/creator", async (req, res) => {
    try {
      const { page, pageSize } = req.query as {
        page: string;
        pageSize: string;
      };
      const activities = await getActivityCreateByUserService(
        parseInt(page),
        parseInt(pageSize),
        req.userId
      );
      res.status(200).json(activities);
    } catch (error: any) {
      if (
        error.message === "Esta conta foi desativada e não pode ser ultilizada"
      ) {
        res.status(403).json({
          error: "Esta conta foi desativada e não pode ser ultilizada.",
        });
      }
      res.status(500).json({ error: "Erro inesperado" });
    }
  });

  router.get("/user/creator/all", async (req, res) => {
    try {
      const activities = await getAllActivityCreateByUserService(req.userId);
      res.status(200).json(activities);
    } catch (error: any) {
      if (
        error.message === "Esta conta foi desativada e não pode ser ultilizada"
      ) {
        res.status(403).json({
          error: "Esta conta foi desativada e não pode ser ultilizada.",
        });
      }
      res.status(500).json({ error: "Erro inesperado" });
    }
  });

  router.get("/user/participant", async (req, res) => {});

  router.get("/user/participant/all", async (req, res) => {});

  router.get("/id:/participants", async (req, res) => {});

  router.post(
    "/new",
    validateRequestBody(activityValidation),
    async (req, res) => {
      try {
        const data = req.body;
        const userId = req.userId;

        const create = await createActivityService(data, userId);
        res.status(200).send(create);
      } catch (error: any) {
        if (
          error.message ===
          "Esta conta foi desativada e não pode ser ultilizada"
        ) {
          res.status(403).json({
            error: "Esta conta foi desativada e não pode ser ultilizada.",
          });
        }
        res.status(500).json({ error: "Erro inesperado" });
      }
    }
  );

  router.post("/:id/subscribe", async (req, res) => {
    try {
      const data = {
        userId: req.userId,

        activityId: req.params.id,
      };

      const create = await subscribeActivityService(data);
      res.status(200).json(create);
    } catch (error: any) {
      console.log(error);
      error.code
        ? res.status(500).json({ error: `error:${error.code}` })
        : res.status(403).json({ error: error.messsage });
    }
  });

  router.put("/:id/update", upload.single("image"), async (req, res) => {
    try {
      const data = req.body;
      const id = req.params.id;

      const avatar = req.file!.mimetype;
      data.image = await uploadImage(req.file!);

      data.image = avatar;
      console.log(data);
      const updateActivity = await updateActivityService(data, id, avatar);
      res.status(200).json(updateActivity);
    } catch (error: any) {
      console.log(error);
      if (
        error.message === "Esta conta foi desativada e não pode ser ultilizada"
      ) {
        res.status(403).json({ error: error.message });
      }
      if (error.message === "Atividade não encontrada") {
        res.status(404).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Erro inesperado" });
    }
  });

  router.put("/:id/conclude", async (req, res) => {
    try {
      const id = req.params.id;

      await concludeActivityService(id);
      res.status(200).json({ message: "Atividade concluida com sucesso" });
    } catch (error: any) {
      if (
        error.message === "Esta conta foi desativada e não pode ser ultilizada"
      ) {
        res.status(403).json({ error: error.message });
      }
      if (error.message === "Atividade não encontrada") {
        res.status(404).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Erro inesperado" });
    }
  });

  router.put(
    "/:id/approve",
    validateRequestBody(activityParticipantValidation),
    async (req, res) => {
      try {
        const id = req.params.id;
        const { participantId, approved } = req.body;

        await approveActivityParticipantService(id, participantId, approved);
        res
          .status(200)
          .json({ message: "Solicitação de aprovação aprovada com sucesso" });
      } catch (error: any) {
        if (error.message === "Participante não encontrado.") {
          res.status(404).json({ error: error.message });
        }
        if (
          error.message ===
          "Esta conta foi desativada e não pode ser ultilizada"
        ) {
          res.status(403).json({ error: error.message });
        }
        if (error.message === "Atividade não encontrada") {
          res.status(404).json({ error: error.message });
          return;
        }
        res.status(500).json({ error: "Erro inesperado" });
      }
    }
  );

  router.put("/:id/check-in", async (req, res) => {
    try {
      const id = req.params.id;
      const code = req.body;

      await CheckinActivityService(id, code);
      res.status(200).json({ message: "Participação confirmada com sucesso!" });
    } catch (error: any) {
      if (error.message === "Participante não encontrado.") {
        res.status(404).json({ error: error.message });
      }
      if (
        error.message === "Esta conta foi desativada e não pode ser ultilizada"
      ) {
        res.status(403).json({ error: error.message });
      }
      if (error.message === "Atividade não encontrada") {
        res.status(404).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Erro inesperado" });
    }
  });

  router.put("/:id/unsubscribe", async (req, res) => {});

  router.delete("/:id/delete", async (req, res) => {
    try {
      const id = req.params.id;

      await deleteActivityServicer(id);
      res.status(200).json({ message: "Atividade excluída com sucesso" });
    } catch (error: any) {
      if (error.message === "Atividade não encontrada") {
        res.status(404).json({ error: error.message });
        return;
      }
      if (
        error.message === "Esta conta foi desativada e não pode ser ultilizada"
      ) {
        res.status(403).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Erro inesperado" });
      return;
    }
  });

  server.use("/activities", router);
};
export default activityController;
