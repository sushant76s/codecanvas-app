import { getLanguages } from "../../services/JudgeApi";
import { judgeConstants } from "../constants/judgeConstants";

export const getAllLanguages = () => async(dispatch) => {
    const response = await getLanguages();
    dispatch({
        type: judgeConstants.LANGUAGES,
        payload: response.data,
    });
};