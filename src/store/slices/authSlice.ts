import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  RequestStatus,
  SuccessfulResult,
  User,
} from "../../entities/auth/types";
import { AuthApi } from "../../api/auth.api";
import { getErrorMessage } from "../../utils/utils";

interface AuthState {
  user: User | null;
  isAuth: boolean;
  status: RequestStatus;
  error: string | null;
}
const initialState: AuthState = {
  user: null,
  isAuth: false,
  status: "idle",
  error: null,
};

export const checkAuth = createAsyncThunk<User, void, { rejectValue: string }>(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthApi.getProfile();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Не удалось загрузить профиль"),
      );
    }
  },
);

export const login = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    await AuthApi.login(email, password);
    const profile = await AuthApi.getProfile();
    return profile.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Ошибка входа"));
  }
});

export const register = createAsyncThunk<
  SuccessfulResult,
  { email: string; password: string; name: string; surname: string },
  { rejectValue: string }
>("auth/register", async (data, { rejectWithValue }) => {
  try {
    const response = await AuthApi.register(
      data.email,
      data.password,
      data.name,
      data.surname,
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Ошибка регистрации"));
  }
});
export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await AuthApi.logout();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Ошибка выхода"));
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.status = "idle";
        state.user = null;
        state.isAuth = false;
        state.error = null;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.isAuth = false;
        state.error = action.payload ?? action.error.message ?? "Ошибка входа";
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
        state.isAuth = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload ?? action.error.message ?? "Ошибка регистрации";
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "idle";
        state.user = null;
        state.isAuth = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Ошибка выхода";
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;

export const selectIsAuth = (state: { auth: AuthState }) => state.auth.isAuth;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectStatus = (state: { auth: AuthState }) => state.auth.status;
export const selectError = (state: { auth: AuthState }) => state.auth.error;
export const selectAuthLoading = (state: { auth: AuthState }) =>
  state.auth.status === "loading";
