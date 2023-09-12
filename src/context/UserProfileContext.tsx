import React, {
    ReactElement,
    useCallback,
    useReducer,
    createContext,
} from "react";

type UserType = {
    name: string;
    username: string;
    avatarPath: string;
};

const initUser = {
    name: "",
    username: "",
    avatarPath: "",
};

const enum USER_ACTION_TYPE {
    SET_NAME,
    SET_USERNAME,
    SET_AVATAR_PATH,
}

// const enum UI_ACTION_TYPE {
//     SET_IS_EDITING,
//     SET_IS_POPUP_OPEN,
// }

type ReducerAction = {
    type: USER_ACTION_TYPE;
    payload: string;
};

const reducer = (state: UserType, action: ReducerAction): UserType => {
    switch (action.type) {
        case USER_ACTION_TYPE.SET_NAME:
            console.log("SET_NAME called")
            return { ...state, name: action.payload };
        case USER_ACTION_TYPE.SET_USERNAME:
            return { ...state, username: action.payload };
        case USER_ACTION_TYPE.SET_AVATAR_PATH:
            return { ...state, avatarPath: action.payload };
        default:
            throw new Error();
    }
};

const useUserContext = (initState: UserType) => {
    const [state, dispatch] = useReducer(reducer, initState);

    const setName = useCallback((name: string) => {
        console.log("dispatched setName")
        dispatch({ type: USER_ACTION_TYPE.SET_NAME, payload: name });
    }, []);
    const setUsername = useCallback(
        (username: string) =>
            dispatch({
                type: USER_ACTION_TYPE.SET_USERNAME,
                payload: username,
            }),
        []
    );
    const setAvatarPath = useCallback(
        (avatarPath: string) =>
            dispatch({
                type: USER_ACTION_TYPE.SET_AVATAR_PATH,
                payload: avatarPath,
            }),
        []
    );

    return { state, setName, setUsername, setAvatarPath };
};

type UseUserContextType = ReturnType<typeof useUserContext>;

const initUserContext: UseUserContextType = {
    state: initUser,
    setName: () => {},
    setUsername: () => {},
    setAvatarPath: () => {},
};

export const UserContext = createContext<UseUserContextType>(initUserContext);

type ChildrenType = {
    children?: ReactElement | ReactElement[] | undefined;
};

export const UserProvider = ({ children }: ChildrenType): ReactElement => {
    return (
        <UserContext.Provider value={useUserContext(initUser)}>
            {children}
        </UserContext.Provider>
    );
};

