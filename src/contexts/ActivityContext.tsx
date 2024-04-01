import { Dispatch, ReactNode, createContext, useMemo, useReducer } from "react";
import { ActivityAction, ActivityState, activityReducer, initialState } from "../reducers/activity-reducer";
import { categories } from "../data/Category";
import { Activity } from "../types";

type ActivityProvaiderProps = {
  children: ReactNode
}

type ActivityContextProps = {
  state: ActivityState;
  dispatch: Dispatch<ActivityAction>;
  caloriesConsumed: number;
  caloriesBurn: number;
  netCalories: number;
  categoryName: (category: Activity["category"]) => string[];
  isEmptyActivities: boolean;
};

export const ActivityContext = createContext<ActivityContextProps>(null!);

export const ActivityProvider = ({children}: ActivityProvaiderProps) => {

  const [state, dispatch] = useReducer(activityReducer, initialState)

  const caloriesConsumed = useMemo(
    () =>
      state.activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [state.activities]
  );

  const caloriesBurn = useMemo(
    () =>
      state.activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [state.activities]
  );

  const netCalories = useMemo(
    () => caloriesConsumed - caloriesBurn,
    [state.activities]
  );

  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    [state.activities]
  );

  const isEmptyActivities = useMemo(
    () => state.activities.length === 0,
    [state.activities]
  );

  return (
    <ActivityContext.Provider
      value={{
        state,
        dispatch,
        caloriesConsumed,
        caloriesBurn,
        netCalories,
        categoryName,
        isEmptyActivities,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
}