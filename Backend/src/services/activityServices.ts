import {
  createActivityRepository,
  getActivityRepository,
  getActivityAllRepository,
  subscribeActivityRepository,
  updateActivityRepository,
  concludeActivityRepository,
  approveActivityParticipantRepository,
  existingParticipant,
  CheckinActivityRepository,
  deleteActivityRepository,
} from "../repository/activityRepository";
import activityData from "../types/activityData";
import activityPartipants from "../types/activityParticipants";
import {
  createActivityAddressesService,
  updateActivityAdressService,
} from "./ActivityAddressesService";
import { getUsersByid } from "./userServices";
import { existingAddress } from "../repository/ActivityAddressesRepository";
import { xpAnLevelUpService } from "./xpAndAchievementsService";

export async function createActivityService(
  data: activityData,
  userId: string
) {
  const Code = creatorCode();
  const activitiesSaved = await createActivityRepository({
    title: data.title,
    description: data.description,
    image: data.image,
    scheduledDate: data.scheduledDate,
    private: data.private,
    confirmationCode: Code,
    createdAt: new Date(),
    activityTypes: {
      connect: { id: data.typeId },
    },
    creator: {
      connect: { id: userId },
    },
  });

  const addresses = await createActivityAddressesService({
    ...data.address,
    activityId: activitiesSaved.id,
  });
  const creator = await getUsersByid(userId);

  await xpAnLevelUpService(userId, 2);

  return {
    id: activitiesSaved.id,
    title: activitiesSaved.title,
    description: activitiesSaved.description,
    type: activitiesSaved.typeId,
    image: activitiesSaved.image,
    addresses: {
      latitude: addresses.latitude,
      longitude: addresses.longitude,
    },
    scheduledDate: activitiesSaved.scheduledDate,
    createdAt: activitiesSaved.createdAt,
    completedAt: activitiesSaved.completedAt,
    private: activitiesSaved.private,
    creator: {
      id: creator.id,
      name: creator.name,
      avatar: creator.avatar,
    },
  };
}

export async function concludeActivityService(id: string) {
  const existing = await existingAddress(id);

  if (!existing) {
    throw new Error("Atividade não encontrada");
  }

  const conclude = await concludeActivityRepository(id);
  return conclude;
}

export async function approveActivityParticipantService(
  id: string,
  userId: string,
  aprrove: boolean
) {
  const existingPart = await existingParticipant(id, userId);

  if (!existingPart) {
    throw new Error("Participante não encontrado.");
  }

  const aproved = await approveActivityParticipantRepository(
    id,
    userId,
    aprrove
  );
  return aproved;
}

export async function CheckinActivityService(id: string, code: string) {
  const aproved = await CheckinActivityRepository(id, code);
  return aproved;
}

export async function updateActivityService(data: activityData, id: string) {
  if (!data.image) {
    if (!data.image) {
      throw new Error("nenhum arquivo foi enviado");
    }
    if (data.image != "image/png" && data.image != "image/jpeg") {
      throw new Error(
        "Tipo de arquivo inválido. Apenas JPEG e PNG são permitidos."
      );
    }
  }

  const activity = {
    title: data.title,
    description: data.description,
    image: data.image,
    scheduledDate: data.scheduledDate,
    private: data.private,
    activityTypes: {
      connect: { id: data.typeId },
    },
  };
  const newAdress = {
    latitude: data.address.latitude,
    longitude: data.address.longitude,
    activityId: id,
  };

  const existing = await existingAddress(id);

  if (!existing) {
    throw new Error("Atividade não encontrada");
  }

  await updateActivityAdressService(newAdress);

  const activityFind = await updateActivityRepository(activity, id);

  return activityFind;
}

export async function subscribeActivityService(data: activityPartipants) {
  return await subscribeActivityRepository(data);
}

export async function getActivityService(
  page: number,
  pageSize: number,
  typeId: string,
  orderBy: string,
  order: "asc" | "desc"
) {
  const all = await getActivityRepository(
    page,
    pageSize,
    typeId,
    orderBy,
    order
  );

  return all;
}

export async function getActivityAllService(
  typeId: string,
  orderBy: string,
  order: "asc" | "desc"
) {
  const all = await getActivityAllRepository(typeId, orderBy, order);

  return all;
}

export async function deleteActivityServicer(id: string) {
  const existingActivity = await existingAddress(id);

  if (!existingActivity) {
    throw new Error("Atividade não encontrada");
  }

  const aproved = await deleteActivityRepository(id);
  return aproved;
}

function creatorCode() {
  let c = "";
  do {
    c += Math.random().toString(36).substring(2);
  } while (c.length < 6);
  c = c.substring(0, 6);
  return c;
}
