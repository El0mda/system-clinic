export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  clinicName: string;
  clinicType: string;
  phone: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  clinicName: string;
  clinicType: string;
}

export function mockLogin(credentials: LoginCredentials): Promise<{ user: AuthUser; token: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.email && credentials.password.length >= 6) {
        resolve({
          user: {
            id: "usr_001",
            name: "Dr. Sarah Williams",
            email: credentials.email,
            role: "Admin",
            avatar: "SW",
            clinicName: "BrightSmile Dental Clinic",
            clinicType: "Dental",
          },
          token: "mock-jwt-token-" + Date.now(),
        });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 800);
  });
}

export function mockRegister(data: RegisterData): Promise<{ user: AuthUser; token: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          id: "usr_" + Math.random().toString(36).slice(2, 8),
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          role: "Admin",
          avatar: (data.firstName[0] + data.lastName[0]).toUpperCase(),
          clinicName: data.clinicName,
          clinicType: data.clinicType,
        },
        token: "mock-jwt-token-" + Date.now(),
      });
    }, 1000);
  });
}
