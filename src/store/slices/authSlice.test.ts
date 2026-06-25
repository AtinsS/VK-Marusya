import { describe, it, expect, vi, beforeEach } from 'vitest';
import authReducer, {
  clearError,
  selectIsAuth,
  selectUser,
  selectStatus,
  selectError,
  selectAuthLoading,
  login,
  logout,
  initialState,
} from './authSlice';

vi.mock('../../api/auth.api', () => ({
  AuthApi: {
    login: vi.fn(),
    logout: vi.fn(),
    register: vi.fn(),
    getProfile: vi.fn(),
  },
}));

import { AuthApi } from '../../api/auth.api';

const mockUser = {
  name: 'Иван',
  surname: 'Петров',
  email: 'test@example.com',
  favorites: [],
};

describe('authSlice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('clearError sets error to null', () => {
    const state = authReducer(
      { ...initialState, error: 'some error' },
      clearError(),
    );
    expect(state.error).toBeNull();
  });

  describe('login thunk', () => {
    it('sets loading then succeeded on success', async () => {
      vi.mocked(AuthApi.login).mockResolvedValue({ data: { result: true } });
      vi.mocked(AuthApi.getProfile).mockResolvedValue({ data: mockUser });

      const dispatch = vi.fn();
      const getState = vi.fn();
      await login({ email: 'a@b.com', password: 'pass' })(dispatch, getState, undefined);

      expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: login.pending.type }));
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: login.fulfilled.type, payload: mockUser }),
      );
    });

    it('sets error on failure', async () => {
      vi.mocked(AuthApi.login).mockRejectedValue(new Error('Network error'));

      const dispatch = vi.fn();
      const getState = vi.fn();
      await login({ email: 'a@b.com', password: 'pass' })(dispatch, getState, undefined);

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: login.rejected.type }),
      );
    });
  });

  describe('logout thunk', () => {
    it('clears user on success', async () => {
      vi.mocked(AuthApi.logout).mockResolvedValue({ data: { result: true } });

      const dispatch = vi.fn();
      const getState = vi.fn();
      await logout()(dispatch, getState, undefined);

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: logout.fulfilled.type }),
      );
    });
  });

  describe('selectors', () => {
    const authState = {
      auth: {
        user: mockUser,
        isAuth: true,
        status: 'succeeded' as const,
        error: 'test error',
      },
    };

    it('selectIsAuth', () => expect(selectIsAuth(authState)).toBe(true));
    it('selectUser', () => expect(selectUser(authState)).toEqual(mockUser));
    it('selectStatus', () => expect(selectStatus(authState)).toBe('succeeded'));
    it('selectError', () => expect(selectError(authState)).toBe('test error'));
    it('selectAuthLoading', () => {
      expect(selectAuthLoading({ auth: { ...authState.auth, status: 'loading' } })).toBe(true);
      expect(selectAuthLoading(authState)).toBe(false);
    });
  });
});
