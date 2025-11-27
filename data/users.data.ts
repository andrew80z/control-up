/**
 * Test data for user credentials
 * Centralizes test data management following DRY principle
 */
export interface UserCredentials {
  username: string;
  password: string;
  description: string;
}

export const TestUsers = {
  STANDARD_USER: {
    username: 'standard_user',
    password: 'secret_sauce',
    description: 'Standard user with full access'
  }
} as const;