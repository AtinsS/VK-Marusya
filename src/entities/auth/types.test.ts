import { describe, it, expect } from 'vitest';
import {
  AuthInfoSchema,
  RegisterFormSchema,
  UserSchema,
} from './types';

describe('AuthInfoSchema', () => {
  it('accepts valid login data', () => {
    expect(AuthInfoSchema.safeParse({ email: 'test@example.com', password: 'pass' }).success).toBe(true);
  });

  it('rejects invalid email', () => {
    expect(AuthInfoSchema.safeParse({ email: 'bad', password: 'pass' }).success).toBe(false);
  });

  it('rejects empty password', () => {
    expect(AuthInfoSchema.safeParse({ email: 'a@b.com', password: '' }).success).toBe(false);
  });
});

describe('RegisterFormSchema', () => {
  const valid = {
    email: 'a@b.com',
    password: 'Strong1!',
    name: 'Иван',
    surname: 'Петров',
    confirmPassword: 'Strong1!',
  };

  it('accepts valid registration', () => {
    expect(RegisterFormSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects mismatched passwords', () => {
    expect(RegisterFormSchema.safeParse({ ...valid, confirmPassword: 'Other1!' }).success).toBe(false);
  });

  it('rejects short password', () => {
    expect(RegisterFormSchema.safeParse({ ...valid, password: 'A1!', confirmPassword: 'A1!' }).success).toBe(false);
  });

  it('rejects password without uppercase', () => {
    expect(RegisterFormSchema.safeParse({ ...valid, password: 'strong1!', confirmPassword: 'strong1!' }).success).toBe(false);
  });

  it('rejects password without digit', () => {
    expect(RegisterFormSchema.safeParse({ ...valid, password: 'Strong!', confirmPassword: 'Strong!' }).success).toBe(false);
  });

  it('rejects password without special char', () => {
    expect(RegisterFormSchema.safeParse({ ...valid, password: 'Strong1a', confirmPassword: 'Strong1a' }).success).toBe(false);
  });

  it('rejects short name', () => {
    expect(RegisterFormSchema.safeParse({ ...valid, name: 'A' }).success).toBe(false);
  });
});

describe('UserSchema', () => {
  it('accepts valid user', () => {
    const result = UserSchema.safeParse({
      name: 'Иван',
      surname: 'Петров',
      email: 'a@b.com',
      favorites: ['1', '2'],
    });
    expect(result.success).toBe(true);
  });
});
