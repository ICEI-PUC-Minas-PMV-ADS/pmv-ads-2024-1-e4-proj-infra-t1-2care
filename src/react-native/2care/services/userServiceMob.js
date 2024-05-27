import AsyncStorage from "@react-native-async-storage/async-storage";
import { getGeolocationApi } from "./otherServiceMob";
import { sendAuthenticatedRequest } from "./authServiceMob";
import { API_URL } from "./apiServiceMob";
import { logout } from "./authServiceMob";

const SERVICE_URL = "/user";

export const registerUser = async (userForm) => {
  let geo = await getGeolocationApi(userForm["post_code"]);
  userForm["latitude"] = geo["latitude"];
  userForm["longitude"] = geo["longitude"];

  const partes = userForm["birth_date"].split("/");
  const dia = partes[0];
  const mes = partes[1];
  const ano = partes[2];

  const formattedDate = `${ano}-${mes}-${dia}`;

  try {
    const response = await fetch(`${API_URL}${SERVICE_URL}/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...userForm, birth_date: formattedDate }),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(JSON.stringify(result));
    }
    return result;
  } catch (error) {
    alert("Dados inválidos, gentileza verifique o preenchimento!");
    throw new Error(error.message);
  }
};

export const updateUser = async (userForm) => {
  let geo = await getGeolocationApi(userForm["post_code"])
  userForm["latitude"] = geo['latitude']
  userForm["longitude"] = geo['longitude']

  try {
      const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/edit/`, "PATCH", userForm)
      return response;
  } catch (error) {
      throw new Error(error.message);
  }
};

export const getUserData = async () => {
  try {
    const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}`);
    return response;
  } catch (error) {
    console.error("Erro ao obter os dados do usuário:", error);
    return false;
  }
};

export const getUserPicture = async () => {
  try {
    const userPicture = await AsyncStorage.getItem("picture");
    return userPicture ? userPicture : null;
  } catch (error) {
    console.error("Erro ao obter a imagem do usuário:", error);
    return null;
  }
};


export const getUserType = async () => {
  try {
    const userType = await AsyncStorage.getItem("user_type");
    return userType ? userType : null;
  } catch (error) {
    console.error("Erro ao obter o tipo de usuário:", error);
    return null;
  }
};


