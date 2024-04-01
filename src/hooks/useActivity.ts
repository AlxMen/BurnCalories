import { useContext } from "react";
import { ActivityContext } from "../contexts/ActivityContext";


export const useActivity = () => {
  const context = useContext(ActivityContext)

  if (!context) {
    throw new Error('El hook use Activity debe ser utilizado en un ActivityProvaider')
  }

  return context
}
