import { TUser } from '@utils-types';
import userSlice, {
  checkUser,
  loginUser,
  logOutUser,
  registerUser,
  updateUser
} from '../userSlice';

jest.mock('@api', () => ({
  getUserApi: jest.fn(),
  registerUserApi: jest.fn(),
  loginUserApi: jest.fn(),
  logoutApi: jest.fn(),
  updateUserApi: jest.fn()
}));

const mockUser: TUser = {
  email: 'test@example.com',
  name: 'Test User'
};

const registerData = {
  email: 'test@example.com',
  name: 'Test User',
  password: 'password123'
};

const loginData = {
  email: 'test@example.com',
  password: 'password123'
};

const updateData = {
  name: 'Updated User'
};

const initialState = {
  user: null,
  isAuthChecked: false,
  error: null
};

describe('Тест редьюсера userSlice', () => {
  describe('обработка экшена checkUser', () => {
    test('устанавливает isAuthChecked в false при pending', () => {
      const newState = userSlice(
        { ...initialState, isAuthChecked: true },
        checkUser.pending('')
      );

      expect(newState.isAuthChecked).toBe(false);
      expect(newState.user).toBeNull();
      expect(newState.error).toBeNull();
    });

    test('устанавливает isAuthChecked в true и записывает пользователя при fulfilled', () => {
      const newState = userSlice(
        initialState,
        checkUser.fulfilled(mockUser, '')
      );

      expect(newState.isAuthChecked).toBe(true);
      expect(newState.user).toEqual(mockUser);
      expect(newState.error).toBeNull();
    });

    test('устанавливает isAuthChecked в true и записывает ошибку при rejected', () => {
      const errorMessage = 'Unknown error';
      const newState = userSlice(
        initialState,
        checkUser.rejected(new Error(errorMessage), '')
      );

      expect(newState.isAuthChecked).toBe(true);
      expect(newState.user).toBeNull();
      expect(newState.error).toBe(errorMessage);
    });
  });

  describe('обработка экшена registerUser', () => {
    test('сбрасывает error при pending', () => {
      const newState = userSlice(
        { ...initialState, error: 'Some error', isAuthChecked: true },
        registerUser.pending('', registerData)
      );

      expect(newState.error).toBeNull();
      expect(newState.user).toBeNull();
      expect(newState.isAuthChecked).toBe(true);
    });

    test('записывает пользователя при fulfilled', () => {
      const newState = userSlice(
        { ...initialState, isAuthChecked: true },
        registerUser.fulfilled(
          {
            user: mockUser,
            success: true,
            refreshToken: '',
            accessToken: ''
          },
          '',
          registerData
        )
      );

      expect(newState.user).toEqual(mockUser);
      expect(newState.error).toBeNull();
      expect(newState.isAuthChecked).toBe(true);
    });

    test('записывает ошибку при rejected', () => {
      const errorMessage = 'Unknown error';
      const newState = userSlice(
        { ...initialState, isAuthChecked: true },
        registerUser.rejected(new Error(errorMessage), '', registerData)
      );

      expect(newState.error).toBe(errorMessage);
      expect(newState.user).toBeNull();
      expect(newState.isAuthChecked).toBe(true);
    });
  });

  describe('обработка экшена loginUser', () => {
    test('сбрасывает error при pending', () => {
      const newState = userSlice(
        { ...initialState, error: 'Some error', isAuthChecked: true },
        loginUser.pending('', loginData)
      );

      expect(newState.error).toBeNull();
      expect(newState.user).toBeNull();
      expect(newState.isAuthChecked).toBe(true);
    });

    test('записывает пользователя при fulfilled', () => {
      const newState = userSlice(
        { ...initialState, isAuthChecked: true },
        loginUser.fulfilled(mockUser, '', loginData)
      );

      expect(newState.user).toEqual(mockUser);
      expect(newState.error).toBeNull();
      expect(newState.isAuthChecked).toBe(true);
    });

    test('записывает ошибку при rejected', () => {
      const errorMessage = 'Unknown error';
      const newState = userSlice(
        { ...initialState, isAuthChecked: true },
        loginUser.rejected(new Error(errorMessage), '', loginData)
      );

      expect(newState.error).toBe(errorMessage);
      expect(newState.user).toBeNull();
      expect(newState.isAuthChecked).toBe(true);
    });
  });

  describe('обработка экшена logOutUser', () => {
    test('сбрасывает error при pending', () => {
      const newState = userSlice(
        { ...initialState, error: 'Some error', isAuthChecked: true },
        logOutUser.pending('')
      );

      expect(newState.error).toBeNull();
      expect(newState.user).toBeNull();
      expect(newState.isAuthChecked).toBe(true);
    });

    test('очищает пользователя при fulfilled', () => {
      const newState = userSlice(
        { ...initialState, user: mockUser, isAuthChecked: true },
        logOutUser.fulfilled(undefined, '')
      );

      expect(newState.user).toBeNull();
      expect(newState.error).toBeNull();
      expect(newState.isAuthChecked).toBe(true);
    });

    test('записывает ошибку при rejected', () => {
      const errorMessage = 'Unknown error';
      const newState = userSlice(
        { ...initialState, user: mockUser, isAuthChecked: true },
        logOutUser.rejected(new Error(errorMessage), '')
      );

      expect(newState.error).toBe(errorMessage);
      expect(newState.user).toEqual(mockUser);
      expect(newState.isAuthChecked).toBe(true);
    });
  });

  describe('обработка экшена updateUser', () => {
    test('сбрасывает error при pending', () => {
      const newState = userSlice(
        { ...initialState, error: 'Some error', isAuthChecked: true },
        updateUser.pending('', updateData)
      );

      expect(newState.error).toBeNull();
      expect(newState.user).toBeNull();
      expect(newState.isAuthChecked).toBe(true);
    });

    test('записывает обновлённого пользователя при fulfilled', () => {
      const updatedUser = { ...mockUser, name: 'Updated User' };
      const newState = userSlice(
        { ...initialState, user: mockUser, isAuthChecked: true },
        updateUser.fulfilled(updatedUser, '', updateData)
      );

      expect(newState.user).toEqual(updatedUser);
      expect(newState.error).toBeNull();
      expect(newState.isAuthChecked).toBe(true);
    });

    test('записывает ошибку при rejected', () => {
      const errorMessage = 'Unknown error';
      const newState = userSlice(
        { ...initialState, user: mockUser, isAuthChecked: true },
        updateUser.rejected(new Error(errorMessage), '', updateData)
      );

      expect(newState.error).toBe(errorMessage);
      expect(newState.user).toEqual(mockUser);
      expect(newState.isAuthChecked).toBe(true);
    });
  });
});
