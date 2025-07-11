export interface SignInRequest {
  email: string;
  profileId: number;
}

export interface SignInResponse {
  access_token: string;
}
